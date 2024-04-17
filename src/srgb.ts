import { Nominal } from "./util/nominal";

/**
 * A value in the canonical (non-linear) sRGB color space.
 */
export class Srgb extends Nominal<typeof Srgb.SYMBOL> {
  private declare static readonly SYMBOL: unique symbol;

  constructor(
    readonly r: number,
    readonly g: number,
    readonly b: number,
  ) {
    super();
  }
}

/**
 * A value in the linear sRGB color space.
 */
export class SrgbLinear extends Nominal<typeof SrgbLinear.SYMBOL> {
  private declare static readonly SYMBOL: unique symbol;

  constructor(
    readonly r: number,
    readonly g: number,
    readonly b: number,
  ) {
    super();
  }
}
