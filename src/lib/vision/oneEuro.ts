/**
 * One-Euro filter — an adaptive low-pass filter for smoothing a noisy signal
 * (here, the drawing fingertip) without the lag a fixed low-pass would add.
 * At low speed it filters hard to kill jitter; at high speed it loosens up so
 * fast strokes stay responsive.
 *
 * Reference: Casiez, Roussel & Vogel, "1€ Filter: A Simple Speed-based Low-pass
 * Filter for Noisy Input in Interactive Systems" (CHI 2012).
 */

export interface OneEuroOptions {
  /** Minimum cutoff frequency (Hz). Lower → more smoothing when nearly still. */
  minCutoff?: number;
  /** Speed coefficient. Higher → less lag during fast motion. */
  beta?: number;
  /** Cutoff for the derivative term (Hz). */
  dCutoff?: number;
}

/** Exponential smoothing of a single scalar, remembering its last output. */
class LowPass {
  private initialized = false;
  private value = 0;

  filter(x: number, alpha: number): number {
    this.value = this.initialized ? alpha * x + (1 - alpha) * this.value : x;
    this.initialized = true;
    return this.value;
  }

  get hasValue(): boolean {
    return this.initialized;
  }

  get last(): number {
    return this.value;
  }

  reset(): void {
    this.initialized = false;
    this.value = 0;
  }
}

/** Smoothing factor for a given cutoff frequency and time step. */
function smoothingAlpha(cutoff: number, dt: number): number {
  const tau = 1 / (2 * Math.PI * cutoff);
  return 1 / (1 + tau / dt);
}

class OneEuroScalar {
  private xFilter = new LowPass();
  private dxFilter = new LowPass();
  private lastTime: number | null = null;

  constructor(
    private readonly minCutoff: number,
    private readonly beta: number,
    private readonly dCutoff: number,
  ) {}

  filter(x: number, timestampMs: number): number {
    // Time step in seconds; fall back to 60fps if the clock didn't advance.
    let dt = this.lastTime == null ? 1 / 60 : (timestampMs - this.lastTime) / 1000;
    if (!(dt > 0)) dt = 1 / 60;
    this.lastTime = timestampMs;

    // Derivative of the signal, smoothed, then used to scale the cutoff.
    const dx = this.xFilter.hasValue ? (x - this.xFilter.last) / dt : 0;
    const edx = this.dxFilter.filter(dx, smoothingAlpha(this.dCutoff, dt));
    const cutoff = this.minCutoff + this.beta * Math.abs(edx);
    return this.xFilter.filter(x, smoothingAlpha(cutoff, dt));
  }

  reset(): void {
    this.xFilter.reset();
    this.dxFilter.reset();
    this.lastTime = null;
  }
}

/** Applies an independent One-Euro filter to each axis of a 2D point. */
export class OneEuroFilter2D {
  private readonly fx: OneEuroScalar;
  private readonly fy: OneEuroScalar;

  constructor({ minCutoff = 1.2, beta = 0.015, dCutoff = 1 }: OneEuroOptions = {}) {
    this.fx = new OneEuroScalar(minCutoff, beta, dCutoff);
    this.fy = new OneEuroScalar(minCutoff, beta, dCutoff);
  }

  filter(x: number, y: number, timestampMs: number): { x: number; y: number } {
    return {
      x: this.fx.filter(x, timestampMs),
      y: this.fy.filter(y, timestampMs),
    };
  }

  reset(): void {
    this.fx.reset();
    this.fy.reset();
  }
}
