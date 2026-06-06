import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

/**
 * A quiet, lonely starfield.
 * Just a dark void, a sprinkle of faint slowly-twinkling stars, and the
 * occasional shooting star drifting across. No clouds, no noise — peaceful.
 * Honors prefers-reduced-motion, pauses on tab hide, and caps DPR for perf.
 */

const TAU = Math.PI * 2;

type Star = {
  x: number; // normalized 0..1
  y: number;
  r: number;
  baseA: number;
  tw: number; // twinkle speed (rad/ms)
  ph: number; // phase
  depth: number; // parallax factor
};

type Shooting = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
  max: number;
};

type Palette = {
  top: string;
  bottom: string;
  glow: string; // a single, almost-imperceptible distant glow
  star: string; // "r,g,b"
  starAlpha: number;
  shoot: string; // "r,g,b"
};

const DARK: Palette = {
  top: "#04060c",
  bottom: "#010104",
  glow: "60,80,140",
  star: "255,255,255",
  starAlpha: 1,
  shoot: "255,255,255",
};

const LIGHT: Palette = {
  top: "#eef1f7",
  bottom: "#e6eaf2",
  glow: "120,140,190",
  star: "70,90,120",
  starAlpha: 0.6,
  shoot: "90,110,140",
};

function generateStars(w: number, h: number): Star[] {
  // Sparse on purpose — lots of empty space for that lonely feel.
  const isMobile = w < 768;
  const count = Math.min(Math.round((w * h) / 10000), isMobile ? 55 : 130);
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const big = Math.random() < 0.05;
    stars.push({
      x: Math.random(),
      y: Math.random(),
      r: big ? 1.1 + Math.random() * 0.7 : 0.4 + Math.random() * 0.7,
      baseA: 0.22 + Math.random() * 0.5, // faint
      tw: 0.0004 + Math.random() * 0.0014, // slow twinkle
      ph: Math.random() * TAU,
      depth: 0.2 + Math.random() * 0.8,
    });
  }
  return stars;
}

const NebulaBackground = () => {
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dark = resolvedTheme !== "light";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pal = dark ? DARK : LIGHT;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let bgGrad: CanvasGradient | null = null;
    let stars: Star[] = [];
    const shooting: Shooting[] = [];
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let nextShoot = 0;
    let raf = 0;
    let last = performance.now();
    let resizeTimer = 0;

    const setup = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, pal.top);
      bgGrad.addColorStop(1, pal.bottom);
      stars = generateStars(w, h);
    };

    const spawnShoot = (t: number) => {
      // Calm cadence: settle first, then the occasional streak.
      nextShoot = t + 2800 + Math.random() * 4500;
      const fromLeft = Math.random() < 0.5;
      const speed = 0.34 + Math.random() * 0.26;
      const ang = fromLeft ? 0.4 : Math.PI - 0.4;
      shooting.push({
        x: fromLeft ? w * (0.04 + Math.random() * 0.32) : w * (0.64 + Math.random() * 0.32),
        y: h * (0.04 + Math.random() * 0.4),
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed,
        len: 140 + Math.random() * 130,
        life: 0,
        max: 1100 + Math.random() * 700,
      });
    };

    const drawFrame = (t: number, loop = true) => {
      const dt = Math.min(t - last, 50);
      last = t;

      // Dark void.
      ctx.fillStyle = bgGrad!;
      ctx.fillRect(0, 0, w, h);

      // One faint, distant glow for depth — almost subliminal.
      const gx = w * 0.72;
      const gy = h * 0.7;
      const gr = Math.max(w, h) * 0.6;
      const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
      glow.addColorStop(0, `rgba(${pal.glow},0.05)`);
      glow.addColorStop(1, `rgba(${pal.glow},0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(gx - gr, gy - gr, gr * 2, gr * 2);

      // Ease parallax toward the cursor target.
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      // Stars.
      for (const s of stars) {
        const a = s.baseA * (0.5 + 0.5 * Math.sin(t * s.tw + s.ph)) * pal.starAlpha;
        if (a <= 0.01) continue;
        const px = s.x * w + mouse.x * s.depth * 12;
        const py = s.y * h + mouse.y * s.depth * 12;
        if (s.r > 1.1) {
          const g = ctx.createRadialGradient(px, py, 0, px, py, s.r * 4);
          g.addColorStop(0, `rgba(${pal.star},${a})`);
          g.addColorStop(1, `rgba(${pal.star},0)`);
          ctx.fillStyle = g;
          ctx.fillRect(px - s.r * 4, py - s.r * 4, s.r * 8, s.r * 8);
        }
        ctx.globalAlpha = a;
        ctx.fillStyle = `rgb(${pal.star})`;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Shooting stars.
      if (!reduced) {
        if (t > nextShoot) spawnShoot(t);
        for (let i = shooting.length - 1; i >= 0; i--) {
          const sh = shooting[i];
          sh.life += dt;
          sh.x += sh.vx * dt;
          sh.y += sh.vy * dt;
          const k = sh.life / sh.max;
          const fade = k < 0.15 ? k / 0.15 : k > 0.7 ? (1 - k) / 0.3 : 1;
          const speed = Math.hypot(sh.vx, sh.vy);
          const ux = sh.vx / speed;
          const uy = sh.vy / speed;
          const tailX = sh.x - ux * sh.len;
          const tailY = sh.y - uy * sh.len;

          const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
          grad.addColorStop(0, `rgba(${pal.shoot},${0.85 * fade})`);
          grad.addColorStop(1, `rgba(${pal.shoot},0)`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(sh.x, sh.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          // Soft head.
          const head = ctx.createRadialGradient(sh.x, sh.y, 0, sh.x, sh.y, 3.5);
          head.addColorStop(0, `rgba(${pal.shoot},${0.9 * fade})`);
          head.addColorStop(1, `rgba(${pal.shoot},0)`);
          ctx.fillStyle = head;
          ctx.fillRect(sh.x - 4, sh.y - 4, 8, 8);

          if (sh.life > sh.max || sh.x < -80 || sh.x > w + 80 || sh.y > h + 80) {
            shooting.splice(i, 1);
          }
        }
      }

      if (loop) raf = requestAnimationFrame(drawFrame);
    };

    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / w - 0.5) * 2;
      mouse.ty = (e.clientY / h - 0.5) * 2;
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setup, 150);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        last = performance.now();
        raf = requestAnimationFrame(drawFrame);
      }
    };

    setup();
    last = performance.now();
    nextShoot = last + 1500; // let the void breathe before the first streak
    if (reduced) {
      drawFrame(last, false);
    } else {
      raf = requestAnimationFrame(drawFrame);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [dark]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
      {/* Gentle vignette to deepen the edges. */}
      <div
        className="absolute inset-0"
        style={{
          background: dark
            ? "radial-gradient(130% 130% at 50% 40%, transparent 50%, rgba(0,0,0,0.6) 100%)"
            : "radial-gradient(130% 130% at 50% 40%, transparent 60%, rgba(255,255,255,0.4) 100%)",
        }}
      />
    </div>
  );
};

export default NebulaBackground;
