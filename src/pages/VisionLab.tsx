import { useCallback, useEffect, useRef, useState } from "react";
import {
  Camera,
  Loader2,
  AlertTriangle,
  Eraser,
  Undo2,
  Trash2,
  Download,
  VideoOff,
  Hand,
  Sparkles,
} from "lucide-react";
import type { HandLandmarker } from "@mediapipe/tasks-vision";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import FadeIn from "@/components/FadeIn";
import Seo from "@/components/Seo";
import { getHandLandmarker } from "@/lib/vision/handLandmarker";
import {
  fingersUp,
  classifyGesture,
  HAND_CONNECTIONS,
  LM,
  type Gesture,
  type Handedness,
} from "@/lib/vision/gestures";
import { OneEuroFilter2D } from "@/lib/vision/oneEuro";

// ── Drawing model ────────────────────────────────────────────────────────────
// Stroke points are stored in normalized [0,1] stage coordinates (already
// mirrored to match the flipped video) so the artwork survives canvas resizes —
// they're scaled to pixels only at paint time.
interface Pt {
  x: number;
  y: number;
}
interface Stroke {
  color: string;
  size: number;
  erase: boolean;
  points: Pt[];
}

type PaletteItem = { id: string; kind: "color"; color: string } | { id: string; kind: "eraser" };

const PALETTE: PaletteItem[] = [
  { id: "white", kind: "color", color: "#f8fafc" },
  { id: "violet", kind: "color", color: "#a78bfa" },
  { id: "cyan", kind: "color", color: "#22d3ee" },
  { id: "pink", kind: "color", color: "#f472b6" },
  { id: "amber", kind: "color", color: "#fbbf24" },
  { id: "emerald", kind: "color", color: "#34d399" },
  { id: "eraser", kind: "eraser" },
];

const DEFAULT_COLOR = "#a78bfa";
// Frames the air-cursor must dwell on a palette band before it's selected.
const DWELL_FRAMES = 14;
const ERASE_COLOR = "rgba(0,0,0,1)";

// ── Canvas paint helpers (pure; operate in pixel space) ───────────────────────
function applyStrokeStyle(ctx: CanvasRenderingContext2D, s: Stroke) {
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = s.size;
  ctx.globalCompositeOperation = s.erase ? "destination-out" : "source-over";
  ctx.strokeStyle = s.erase ? ERASE_COLOR : s.color;
  ctx.fillStyle = s.erase ? ERASE_COLOR : s.color;
}

function paintDot(ctx: CanvasRenderingContext2D, p: Pt, s: Stroke, w: number, h: number) {
  ctx.save();
  applyStrokeStyle(ctx, s);
  ctx.beginPath();
  ctx.arc(p.x * w, p.y * h, s.size / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function paintSegment(ctx: CanvasRenderingContext2D, a: Pt, b: Pt, s: Stroke, w: number, h: number) {
  ctx.save();
  applyStrokeStyle(ctx, s);
  ctx.beginPath();
  ctx.moveTo(a.x * w, a.y * h);
  ctx.lineTo(b.x * w, b.y * h);
  ctx.stroke();
  ctx.restore();
}

function paintStroke(ctx: CanvasRenderingContext2D, s: Stroke, w: number, h: number) {
  if (s.points.length === 1) {
    paintDot(ctx, s.points[0], s, w, h);
    return;
  }
  for (let i = 1; i < s.points.length; i++) {
    paintSegment(ctx, s.points[i - 1], s.points[i], s, w, h);
  }
}

function drawSkeleton(ctx: CanvasRenderingContext2D, lm: { x: number; y: number }[], w: number, h: number) {
  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  ctx.strokeStyle = "rgba(248,250,252,0.55)";
  ctx.lineWidth = 2;
  for (const [a, b] of HAND_CONNECTIONS) {
    ctx.beginPath();
    ctx.moveTo((1 - lm[a].x) * w, lm[a].y * h);
    ctx.lineTo((1 - lm[b].x) * w, lm[b].y * h);
    ctx.stroke();
  }
  ctx.fillStyle = "#a78bfa";
  for (const p of lm) {
    ctx.beginPath();
    ctx.arc((1 - p.x) * w, p.y * h, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawCursor(
  ctx: CanvasRenderingContext2D,
  cursor: Pt,
  gesture: Gesture,
  tool: "pen" | "eraser",
  color: string,
  size: number,
  w: number,
  h: number,
) {
  const x = cursor.x * w;
  const y = cursor.y * h;
  const r = Math.max(6, size / 2 + 3);
  ctx.save();
  ctx.lineWidth = 2;
  if (tool === "eraser") {
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.setLineDash([4, 3]);
  } else {
    ctx.strokeStyle = color;
  }
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
  if (gesture === "draw") {
    ctx.setLineDash([]);
    ctx.fillStyle = tool === "eraser" ? "rgba(255,255,255,0.9)" : color;
    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawDwellRing(
  ctx: CanvasRenderingContext2D,
  rect: { x0: number; y0: number; x1: number; y1: number },
  progress: number,
  w: number,
  h: number,
) {
  const cx = ((rect.x0 + rect.x1) / 2) * w;
  const cy = ((rect.y0 + rect.y1) / 2) * h;
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.95)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, 18, -Math.PI / 2, -Math.PI / 2 + Math.min(1, progress) * Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function describeError(e: unknown): string {
  const name = e instanceof DOMException ? e.name : "";
  if (name === "NotAllowedError" || name === "SecurityError")
    return "Camera access was blocked. Allow the camera for this site in your browser, then click “Enable camera” again.";
  if (name === "NotFoundError" || name === "DevicesNotFoundError")
    return "No camera was found on this device.";
  if (name === "NotReadableError")
    return "Your camera is already in use by another app. Close it and try again.";
  return e instanceof Error && e.message
    ? `Couldn't start the demo: ${e.message}`
    : "Couldn't start the demo. Please try again.";
}

type Status = "idle" | "loading" | "running" | "error";

const VisionLab = () => {
  // DOM refs
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const paintRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const swatchEls = useRef<Record<string, HTMLButtonElement | null>>({});

  // Imperative state read inside the render loop (refs avoid stale closures)
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number>(0);
  const filterRef = useRef<OneEuroFilter2D | null>(null);
  const lastVideoTimeRef = useRef<number>(-1);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const strokesRef = useRef<Stroke[]>([]);
  const currentStrokeRef = useRef<Stroke | null>(null);
  const paletteRectsRef = useRef<{ id: string; x0: number; y0: number; x1: number; y1: number }[]>([]);
  const hoverRef = useRef<{ id: string | null; frames: number }>({ id: null, frames: 0 });
  const fpsRef = useRef({ frames: 0, last: 0 });
  const handDetectedRef = useRef(false);
  const lastGestureRef = useRef<Gesture>("idle");
  const shownHoverRef = useRef<string | null>(null);

  // Settings mirrored into refs so the render loop reads the latest values
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [brushSize, setBrushSize] = useState(6);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const colorRef = useRef(color);
  const toolRef = useRef(tool);
  const brushRef = useRef(brushSize);
  const skeletonRef = useRef(showSkeleton);
  useEffect(() => {
    colorRef.current = color;
  }, [color]);
  useEffect(() => {
    toolRef.current = tool;
  }, [tool]);
  useEffect(() => {
    brushRef.current = brushSize;
  }, [brushSize]);
  useEffect(() => {
    skeletonRef.current = showSkeleton;
  }, [showSkeleton]);

  // HUD / UI state
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [gesture, setGesture] = useState<Gesture>("idle");
  const [fps, setFps] = useState(0);
  const [handDetected, setHandDetected] = useState(false);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);

  const getFilter = useCallback(() => (filterRef.current ??= new OneEuroFilter2D()), []);

  const setHover = useCallback((id: string | null) => {
    if (shownHoverRef.current !== id) {
      shownHoverRef.current = id;
      setHoverId(id);
    }
  }, []);

  const redrawPaint = useCallback(() => {
    const ctx = paintRef.current?.getContext("2d");
    if (!ctx) return;
    const { w, h } = sizeRef.current;
    ctx.clearRect(0, 0, w, h);
    for (const s of strokesRef.current) paintStroke(ctx, s, w, h);
  }, []);

  const computePaletteRects = useCallback(() => {
    const c = containerRef.current;
    if (!c) return;
    const cr = c.getBoundingClientRect();
    if (cr.width === 0 || cr.height === 0) {
      paletteRectsRef.current = [];
      return;
    }
    paletteRectsRef.current = PALETTE.flatMap((item) => {
      const el = swatchEls.current[item.id];
      if (!el) return [];
      const r = el.getBoundingClientRect();
      return [{
        id: item.id,
        x0: (r.left - cr.left) / cr.width,
        y0: (r.top - cr.top) / cr.height,
        x1: (r.right - cr.left) / cr.width,
        y1: (r.bottom - cr.top) / cr.height,
      }];
    });
  }, []);

  const sizeCanvases = useCallback(() => {
    const c = containerRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    if (w === 0 || h === 0) return;
    sizeRef.current = { w, h };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    for (const canvas of [paintRef.current, overlayRef.current]) {
      if (!canvas) continue;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    computePaletteRects();
    redrawPaint();
  }, [computePaletteRects, redrawPaint]);

  const applySelection = useCallback((id: string) => {
    const item = PALETTE.find((p) => p.id === id);
    if (!item) return;
    if (item.kind === "eraser") {
      setTool("eraser");
    } else {
      setTool("pen");
      setColor(item.color);
    }
  }, []);

  const renderLoop = useCallback(() => {
    frameRef.current = requestAnimationFrame(renderLoop);
    const video = videoRef.current;
    const detector = landmarkerRef.current;
    if (!video || !detector || video.readyState < 2 || video.videoWidth === 0) return;

    const now = performance.now();

    // FPS, refreshed ~3x/sec.
    const fc = fpsRef.current;
    fc.frames++;
    if (now - fc.last >= 333) {
      setFps(Math.round((fc.frames * 1000) / (now - fc.last)));
      fc.frames = 0;
      fc.last = now;
    }

    // Skip frames the camera hasn't refreshed yet.
    if (video.currentTime === lastVideoTimeRef.current) return;
    lastVideoTimeRef.current = video.currentTime;

    const { w, h } = sizeRef.current;
    const octx = overlayRef.current?.getContext("2d") ?? null;
    if (octx) octx.clearRect(0, 0, w, h);
    const pctx = paintRef.current?.getContext("2d") ?? null;

    const result = detector.detectForVideo(video, now);
    const hands = result.landmarks;

    if (!hands || hands.length === 0) {
      currentStrokeRef.current = null;
      hoverRef.current = { id: null, frames: 0 };
      if (handDetectedRef.current) {
        handDetectedRef.current = false;
        setHandDetected(false);
      }
      if (lastGestureRef.current !== "idle") {
        lastGestureRef.current = "idle";
        setGesture("idle");
      }
      setHover(null);
      return;
    }

    if (!handDetectedRef.current) {
      handDetectedRef.current = true;
      setHandDetected(true);
    }

    const lm = hands[0];
    const handName = result.handedness?.[0]?.[0]?.categoryName;
    const handed: Handedness = handName === "Left" ? "Left" : "Right";
    const g = classifyGesture(fingersUp(lm, handed));
    if (g !== lastGestureRef.current) {
      lastGestureRef.current = g;
      setGesture(g);
    }

    // Mirror x to match the flipped video, then smooth to kill jitter.
    const sm = getFilter().filter(1 - lm[LM.INDEX_TIP].x, lm[LM.INDEX_TIP].y, now);
    const cursor: Pt = { x: Math.min(1, Math.max(0, sm.x)), y: Math.min(1, Math.max(0, sm.y)) };

    if (g === "draw") {
      hoverRef.current = { id: null, frames: 0 };
      setHover(null);
      const stroke = currentStrokeRef.current;
      if (!stroke) {
        const fresh: Stroke = {
          color: colorRef.current,
          size: brushRef.current,
          erase: toolRef.current === "eraser",
          points: [cursor],
        };
        currentStrokeRef.current = fresh;
        strokesRef.current.push(fresh);
        if (pctx) paintDot(pctx, cursor, fresh, w, h);
        setCanUndo(true);
        setHasDrawing(true);
      } else {
        const prev = stroke.points[stroke.points.length - 1];
        stroke.points.push(cursor);
        if (pctx) paintSegment(pctx, prev, cursor, stroke, w, h);
      }
    } else {
      currentStrokeRef.current = null;
      if (g === "move") {
        const hit = paletteRectsRef.current.find(
          (r) => cursor.x >= r.x0 && cursor.x <= r.x1 && cursor.y >= r.y0 && cursor.y <= r.y1,
        );
        const hov = hoverRef.current;
        if (hit) {
          if (hit.id === hov.id) hov.frames++;
          else {
            hov.id = hit.id;
            hov.frames = 1;
          }
          setHover(hit.id);
          if (hov.frames === DWELL_FRAMES) applySelection(hit.id);
          if (octx) drawDwellRing(octx, hit, hov.frames / DWELL_FRAMES, w, h);
        } else {
          hoverRef.current = { id: null, frames: 0 };
          setHover(null);
        }
      } else {
        hoverRef.current = { id: null, frames: 0 };
        setHover(null);
      }
    }

    if (octx) {
      if (skeletonRef.current) drawSkeleton(octx, lm, w, h);
      drawCursor(octx, cursor, g, toolRef.current, colorRef.current, brushRef.current, w, h);
    }
  }, [applySelection, getFilter, setHover]);

  const start = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    setErrorMsg("");
    setStatus("loading");
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setStatus("error");
        setErrorMsg("This browser doesn't support webcam access (getUserMedia).");
        return;
      }
      // Load the model and open the camera in parallel.
      const [landmarker, stream] = await Promise.all([
        getHandLandmarker(),
        navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        }),
      ]);
      landmarkerRef.current = landmarker;
      streamRef.current = stream;
      video.srcObject = stream;
      await video.play();
      getFilter().reset();
      lastVideoTimeRef.current = -1;
      fpsRef.current = { frames: 0, last: performance.now() };
      setStatus("running");
      sizeCanvases();
      frameRef.current = requestAnimationFrame(renderLoop);
    } catch (e) {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      setStatus("error");
      setErrorMsg(describeError(e));
    }
  }, [getFilter, renderLoop, sizeCanvases]);

  const stopCamera = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    handDetectedRef.current = false;
    lastGestureRef.current = "idle";
    setHandDetected(false);
    setGesture("idle");
    setHover(null);
    setStatus("idle");
  }, [setHover]);

  const undo = useCallback(() => {
    strokesRef.current.pop();
    currentStrokeRef.current = null;
    redrawPaint();
    const any = strokesRef.current.length > 0;
    setCanUndo(any);
    setHasDrawing(any);
  }, [redrawPaint]);

  const clearAll = useCallback(() => {
    strokesRef.current = [];
    currentStrokeRef.current = null;
    redrawPaint();
    setCanUndo(false);
    setHasDrawing(false);
  }, [redrawPaint]);

  const download = useCallback(() => {
    const paint = paintRef.current;
    if (!paint) return;
    const out = document.createElement("canvas");
    out.width = paint.width;
    out.height = paint.height;
    const octx = out.getContext("2d");
    if (!octx) return;
    octx.fillStyle = "#0a0a12";
    octx.fillRect(0, 0, out.width, out.height);
    octx.drawImage(paint, 0, 0);
    const a = document.createElement("a");
    a.href = out.toDataURL("image/png");
    a.download = "air-canvas.png";
    a.click();
  }, []);

  // Size canvases on mount and whenever the stage resizes.
  useEffect(() => {
    sizeCanvases();
    const ro = new ResizeObserver(() => sizeCanvases());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", sizeCanvases);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sizeCanvases);
    };
  }, [sizeCanvases]);

  // Release the camera + animation frame on unmount.
  useEffect(
    () => () => {
      cancelAnimationFrame(frameRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    },
    [],
  );

  const running = status === "running";

  return (
    <div className="py-16 md:py-24">
      <Seo
        title="Air Canvas — Live Hand-Tracking Demo"
        description="Draw in the air with your finger. A real-time computer-vision demo that runs entirely in your browser — no backend, no install."
        path="/projects/air-canvas"
      />
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <Badge variant="secondary" className="mb-3">
            <Sparkles size={13} className="mr-1" /> Computer Vision · runs in your browser
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Air Canvas</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Real-time hand tracking, fully client-side. A MediaPipe model streams 21 hand keypoints
            from your webcam; the gesture logic, jitter smoothing, and drawing pipeline are built on
            top. <span className="text-foreground">Point your index finger to draw.</span> Your camera
            never leaves your device.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          {/* Stage */}
          <div
            ref={containerRef}
            className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-black"
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full -scale-x-100 object-cover"
              playsInline
              muted
            />
            <canvas ref={paintRef} className="pointer-events-none absolute inset-0 h-full w-full" />
            <canvas ref={overlayRef} className="pointer-events-none absolute inset-0 h-full w-full" />

            {/* Palette — clickable and air-hover selectable */}
            {running && (
              <div className="absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-2 backdrop-blur-md">
                {PALETTE.map((item) => {
                  const active =
                    item.kind === "eraser" ? tool === "eraser" : tool === "pen" && color === item.color;
                  const hovered = hoverId === item.id;
                  return (
                    <button
                      key={item.id}
                      ref={(el) => {
                        swatchEls.current[item.id] = el;
                      }}
                      onClick={() => applySelection(item.id)}
                      aria-label={item.kind === "eraser" ? "Eraser" : `Color ${item.id}`}
                      className={`grid h-7 w-7 place-items-center rounded-full ring-2 ring-offset-2 ring-offset-black/40 transition-all ${
                        active ? "ring-white" : hovered ? "ring-white/70" : "ring-transparent"
                      } ${hovered ? "scale-110" : ""}`}
                      style={item.kind === "color" ? { backgroundColor: item.color } : undefined}
                    >
                      {item.kind === "eraser" && <Eraser size={15} className="text-white" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* HUD */}
            {running && (
              <>
                <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                  {gesture === "draw" ? "✏️ Drawing" : gesture === "move" ? "✋ Move / select" : "✊ Pen up"}
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
                  {fps} FPS
                </span>
                {!handDetected && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1.5 text-xs text-white/90 backdrop-blur-md">
                    <Hand size={13} className="mr-1 inline" /> Show your hand to the camera
                  </div>
                )}
              </>
            )}

            {/* Idle / loading / error overlays */}
            {status !== "running" && (
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-b from-black/40 to-black/70 p-6 text-center">
                {status === "idle" && (
                  <div className="max-w-sm">
                    <Camera className="mx-auto mb-3 text-primary" size={32} />
                    <h2 className="mb-1 text-lg font-semibold text-white">Enable your camera to start</h2>
                    <p className="mb-4 text-sm text-white/70">
                      Everything runs locally in your browser. The video and the hand model never
                      leave your device.
                    </p>
                    <Button onClick={start}>
                      <Camera size={16} className="mr-1.5" /> Enable camera
                    </Button>
                  </div>
                )}
                {status === "loading" && (
                  <div className="text-white/90">
                    <Loader2 className="mx-auto mb-3 animate-spin text-primary" size={30} />
                    <p className="text-sm">Loading the hand-tracking model…</p>
                    <p className="mt-1 text-xs text-white/60">First load fetches ~10 MB; it's cached after.</p>
                  </div>
                )}
                {status === "error" && (
                  <div className="max-w-sm">
                    <AlertTriangle className="mx-auto mb-3 text-amber-400" size={30} />
                    <p className="mb-4 text-sm text-white/85">{errorMsg}</p>
                    <Button variant="outline" onClick={start}>
                      Try again
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </FadeIn>

        {/* Controls */}
        <FadeIn delay={0.15}>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex min-w-[180px] flex-1 items-center gap-3">
              <span className="text-sm text-muted-foreground">Brush</span>
              <Slider
                value={[brushSize]}
                min={2}
                max={28}
                step={1}
                onValueChange={(v) => setBrushSize(v[0])}
                className="max-w-[220px]"
                aria-label="Brush size"
              />
              <span className="w-6 text-sm tabular-nums text-muted-foreground">{brushSize}</span>
            </div>

            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Switch checked={showSkeleton} onCheckedChange={setShowSkeleton} aria-label="Toggle hand skeleton" />
              Show hand skeleton
            </label>

            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setTool(tool === "eraser" ? "pen" : "eraser")}>
                <Eraser size={15} className={`mr-1 ${tool === "eraser" ? "text-primary" : ""}`} /> Eraser
              </Button>
              <Button variant="outline" size="sm" onClick={undo} disabled={!canUndo}>
                <Undo2 size={15} className="mr-1" /> Undo
              </Button>
              <Button variant="outline" size="sm" onClick={clearAll} disabled={!hasDrawing}>
                <Trash2 size={15} className="mr-1" /> Clear
              </Button>
              <Button variant="outline" size="sm" onClick={download} disabled={!hasDrawing}>
                <Download size={15} className="mr-1" /> Save PNG
              </Button>
              {running && (
                <Button variant="ghost" size="sm" onClick={stopCamera}>
                  <VideoOff size={15} className="mr-1" /> Stop
                </Button>
              )}
            </div>
          </div>
        </FadeIn>

        {/* How to use */}
        <FadeIn delay={0.2}>
          <div className="mt-8 grid gap-3 rounded-lg border border-border bg-muted/30 p-5 text-sm text-muted-foreground sm:grid-cols-2">
            <p><span className="font-medium text-foreground">☝️ One finger (index)</span> — draw</p>
            <p><span className="font-medium text-foreground">✌️ Two fingers (index + middle)</span> — move the cursor without drawing</p>
            <p><span className="font-medium text-foreground">🎯 Hover a color</span> — pause on a palette band in move-mode to select it</p>
            <p><span className="font-medium text-foreground">✊ Fist / 🖐️ open palm</span> — lift the pen</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default VisionLab;
