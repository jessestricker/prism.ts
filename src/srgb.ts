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

  toSrgbLinear(): SrgbLinear {
    function toLinear(value: number): number {
      return value <= 0.04045
        ? value / 12.92
        : ((value + 0.055) / 1.055) ** 2.4;
    }

    return new SrgbLinear(toLinear(this.r), toLinear(this.g), toLinear(this.b));
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

  toSrgb(): Srgb {
    function toNonLinear(value: number): number {
      return value <= 0.0031308
        ? 12.92 * value
        : 1.055 * value ** (1.0 / 2.4) - 0.055;
    }

    return new Srgb(
      toNonLinear(this.r),
      toNonLinear(this.g),
      toNonLinear(this.b),
    );
  }
}
