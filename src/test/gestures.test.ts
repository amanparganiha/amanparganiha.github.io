import { describe, it, expect } from "vitest";
import {
  fingersUp,
  classifyGesture,
  LM,
  type Landmark,
  type FingerState,
} from "@/lib/vision/gestures";
import { OneEuroFilter2D } from "@/lib/vision/oneEuro";

/**
 * Build a synthetic 21-point hand. Each of the four fingers is placed either
 * "up" (tip above the PIP joint → smaller y) or "down" (tip below it). The thumb
 * is placed lateral to its IP joint when `thumb` is true (assuming a right hand).
 */
function makeHand(
  opts: Partial<Record<"thumb" | "index" | "middle" | "ring" | "pinky", boolean>>,
): Landmark[] {
  const lm: Landmark[] = Array.from({ length: 21 }, () => ({ x: 0.5, y: 0.5, z: 0 }));
  lm[LM.WRIST] = { x: 0.5, y: 0.95 };

  const placeFinger = (mcp: number, pip: number, dip: number, tip: number, up: boolean, x: number) => {
    lm[mcp] = { x, y: 0.7 };
    lm[pip] = { x, y: 0.6 };
    lm[dip] = { x, y: up ? 0.48 : 0.66 };
    lm[tip] = { x, y: up ? 0.38 : 0.72 };
  };

  placeFinger(LM.INDEX_MCP, LM.INDEX_PIP, LM.INDEX_DIP, LM.INDEX_TIP, !!opts.index, 0.45);
  placeFinger(LM.MIDDLE_MCP, LM.MIDDLE_PIP, LM.MIDDLE_DIP, LM.MIDDLE_TIP, !!opts.middle, 0.5);
  placeFinger(LM.RING_MCP, LM.RING_PIP, LM.RING_DIP, LM.RING_TIP, !!opts.ring, 0.55);
  placeFinger(LM.PINKY_MCP, LM.PINKY_PIP, LM.PINKY_DIP, LM.PINKY_TIP, !!opts.pinky, 0.6);

  // Thumb: extended (right hand) when the tip is to the left of the IP joint.
  lm[LM.THUMB_IP] = { x: 0.4, y: 0.6 };
  lm[LM.THUMB_TIP] = { x: opts.thumb ? 0.33 : 0.43, y: 0.58 };
  return lm;
}

describe("fingersUp", () => {
  it("detects a closed fist (nothing extended)", () => {
    expect(fingersUp(makeHand({}), "Right")).toEqual<FingerState>({
      thumb: false,
      index: false,
      middle: false,
      ring: false,
      pinky: false,
    });
  });

  it("detects an index-only point", () => {
    const f = fingersUp(makeHand({ index: true }), "Right");
    expect(f.index).toBe(true);
    expect(f.middle).toBe(false);
    expect(f.ring).toBe(false);
    expect(f.pinky).toBe(false);
  });

  it("detects index + middle", () => {
    const f = fingersUp(makeHand({ index: true, middle: true }), "Right");
    expect(f.index).toBe(true);
    expect(f.middle).toBe(true);
    expect(f.ring).toBe(false);
  });

  it("detects an open palm", () => {
    expect(
      fingersUp(makeHand({ thumb: true, index: true, middle: true, ring: true, pinky: true }), "Right"),
    ).toEqual<FingerState>({ thumb: true, index: true, middle: true, ring: true, pinky: true });
  });

  it("flips the thumb test by handedness", () => {
    const hand = makeHand({});
    hand[LM.THUMB_TIP] = { x: 0.5, y: 0.58 }; // tip to the right of the IP joint (0.40)
    expect(fingersUp(hand, "Left").thumb).toBe(true);
    expect(fingersUp(hand, "Right").thumb).toBe(false);
  });
});

describe("classifyGesture", () => {
  it("maps index-only to draw", () => {
    expect(classifyGesture(fingersUp(makeHand({ index: true }), "Right"))).toBe("draw");
  });

  it("maps index + middle to move", () => {
    expect(classifyGesture(fingersUp(makeHand({ index: true, middle: true }), "Right"))).toBe("move");
  });

  it("maps a fist to idle", () => {
    expect(classifyGesture(fingersUp(makeHand({}), "Right"))).toBe("idle");
  });

  it("maps an open palm to idle", () => {
    expect(
      classifyGesture(fingersUp(makeHand({ index: true, middle: true, ring: true, pinky: true }), "Right")),
    ).toBe("idle");
  });

  it("ignores the thumb when deciding to draw", () => {
    expect(classifyGesture(fingersUp(makeHand({ index: true, thumb: true }), "Right"))).toBe("draw");
  });
});

describe("OneEuroFilter2D", () => {
  it("passes a constant signal through unchanged", () => {
    const f = new OneEuroFilter2D();
    let out = { x: 0, y: 0 };
    for (let i = 0; i < 30; i++) out = f.filter(0.5, 0.25, i * 16.7);
    expect(out.x).toBeCloseTo(0.5, 5);
    expect(out.y).toBeCloseTo(0.25, 5);
  });

  it("reduces jitter (output variance < input variance)", () => {
    const f = new OneEuroFilter2D({ minCutoff: 1, beta: 0.007 });
    let seed = 42;
    const rand = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 0xffffffff;
    };
    const inputs: number[] = [];
    const outputs: number[] = [];
    for (let i = 0; i < 120; i++) {
      const noisy = 0.5 + (rand() - 0.5) * 0.1;
      inputs.push(noisy);
      outputs.push(f.filter(noisy, 0.5, i * 16.7).x);
    }
    const variance = (arr: number[]) => {
      const s = arr.slice(20); // drop warmup
      const m = s.reduce((a, b) => a + b, 0) / s.length;
      return s.reduce((a, b) => a + (b - m) ** 2, 0) / s.length;
    };
    expect(variance(outputs)).toBeLessThan(variance(inputs));
  });

  it("returns the first sample as-is after reset", () => {
    const f = new OneEuroFilter2D();
    f.filter(0.9, 0.9, 0);
    f.filter(0.9, 0.9, 16.7);
    f.reset();
    const out = f.filter(0.1, 0.1, 33.4);
    expect(out.x).toBeCloseTo(0.1, 5);
    expect(out.y).toBeCloseTo(0.1, 5);
  });
});
