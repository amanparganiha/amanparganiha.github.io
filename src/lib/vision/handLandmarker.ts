import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

/**
 * Lazy loader for a single shared MediaPipe HandLandmarker.
 *
 * The WASM runtime is pinned to the installed package version so the loader and
 * the runtime can never drift — keep this in sync with `@mediapipe/tasks-vision`
 * in package.json. The model is fetched from Google's public model bucket. Both
 * downloads happen on first call only and are cached by the browser afterward.
 */
const MEDIAPIPE_VERSION = "0.10.35";
const WASM_BASE = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}/wasm`;
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

let landmarkerPromise: Promise<HandLandmarker> | null = null;

/**
 * Get the shared HandLandmarker (VIDEO mode, one hand, GPU delegate), creating
 * it on first use. The init promise is cached so navigating back to the demo
 * reuses the already-loaded model. If creation fails the cache is cleared so a
 * later attempt can retry.
 */
export function getHandLandmarker(): Promise<HandLandmarker> {
  if (!landmarkerPromise) {
    landmarkerPromise = (async () => {
      const vision = await FilesetResolver.forVisionTasks(WASM_BASE);
      return HandLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
        runningMode: "VIDEO",
        numHands: 1,
      });
    })().catch((err) => {
      landmarkerPromise = null;
      throw err;
    });
  }
  return landmarkerPromise;
}
