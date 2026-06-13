/**
 * Hand-gesture logic for Air Canvas.
 *
 * Operates on the 21 hand landmarks produced by MediaPipe's HandLandmarker, but
 * deliberately imports nothing from the model package so it stays pure and
 * unit-testable. Coordinates are normalized to [0, 1] in image space with the
 * origin at the top-left (matching MediaPipe's NormalizedLandmark), so y grows
 * downward.
 */

export interface Landmark {
  x: number;
  y: number;
  z?: number;
}

/** MediaPipe hand-landmark indices (see the 21-point hand topology). */
export const LM = {
  WRIST: 0,
  THUMB_CMC: 1,
  THUMB_MCP: 2,
  THUMB_IP: 3,
  THUMB_TIP: 4,
  INDEX_MCP: 5,
  INDEX_PIP: 6,
  INDEX_DIP: 7,
  INDEX_TIP: 8,
  MIDDLE_MCP: 9,
  MIDDLE_PIP: 10,
  MIDDLE_DIP: 11,
  MIDDLE_TIP: 12,
  RING_MCP: 13,
  RING_PIP: 14,
  RING_DIP: 15,
  RING_TIP: 16,
  PINKY_MCP: 17,
  PINKY_PIP: 18,
  PINKY_DIP: 19,
  PINKY_TIP: 20,
} as const;

/** Pairs of landmark indices to render as the hand skeleton. */
export const HAND_CONNECTIONS: ReadonlyArray<readonly [number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4], // thumb
  [0, 5], [5, 6], [6, 7], [7, 8], // index
  [5, 9], [9, 10], [10, 11], [11, 12], // middle
  [9, 13], [13, 14], [14, 15], [15, 16], // ring
  [13, 17], [17, 18], [18, 19], [19, 20], // pinky
  [0, 17], // palm base
];

export interface FingerState {
  thumb: boolean;
  index: boolean;
  middle: boolean;
  ring: boolean;
  pinky: boolean;
}

export type Handedness = "Left" | "Right";

/**
 * Decide which fingers are extended.
 *
 * For the four fingers we compare the fingertip with the PIP joint along y:
 * since y grows downward, an extended (upward-pointing) finger has its tip
 * *above* — i.e. at a smaller y than — its PIP joint. The thumb extends
 * sideways instead, so we compare the tip with the IP joint along x, flipping
 * the comparison by handedness. (The thumb only nudges the gesture; the drawing
 * gestures below ignore it, so its exact correctness is not critical.)
 */
export function fingersUp(landmarks: Landmark[], handedness: Handedness = "Right"): FingerState {
  const extended = (tip: number, pip: number) => landmarks[tip].y < landmarks[pip].y;

  const thumb =
    handedness === "Right"
      ? landmarks[LM.THUMB_TIP].x < landmarks[LM.THUMB_IP].x
      : landmarks[LM.THUMB_TIP].x > landmarks[LM.THUMB_IP].x;

  return {
    thumb,
    index: extended(LM.INDEX_TIP, LM.INDEX_PIP),
    middle: extended(LM.MIDDLE_TIP, LM.MIDDLE_PIP),
    ring: extended(LM.RING_TIP, LM.RING_PIP),
    pinky: extended(LM.PINKY_TIP, LM.PINKY_PIP),
  };
}

export type Gesture = "draw" | "move" | "idle";

/**
 * Map a finger state to a drawing gesture:
 * - index only                       → draw  (pen down)
 * - index + middle                   → move  (reposition / hover a palette band)
 * - anything else (fist, open palm…) → idle  (pen up)
 *
 * The thumb is intentionally ignored: it tends to drift in and out while
 * pointing, so keying off it would make drawing flicker.
 */
export function classifyGesture(f: FingerState): Gesture {
  if (f.index && !f.middle && !f.ring && !f.pinky) return "draw";
  if (f.index && f.middle && !f.ring && !f.pinky) return "move";
  return "idle";
}
