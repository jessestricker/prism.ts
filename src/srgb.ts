import { CieXyzD65 } from "./ciexyz";
import { Matrix3, matMulVec } from "./util/linalg";
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

  static fromCieXyzD65(xyz: CieXyzD65): SrgbLinear {
    return new SrgbLinear(
      ...matMulVec(XYZ_TO_LINEAR_SRGB, [xyz.x, xyz.y, xyz.z]),
    );
  }

  toCieXyzD65(): CieXyzD65 {
    return new CieXyzD65(
      ...matMulVec(LINEAR_SRGB_TO_XYZ, [this.r, this.g, this.b]),
    );
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

// prettier-ignore
const XYZ_TO_LINEAR_SRGB: Matrix3 = [
  [   12831 /   3959,    -329 /    214, -1974 /   3959 ],
  [ -851781 / 878810, 1648619 / 878810, 36519 / 878810 ],
  [     705 /  12673,   -2585 /  12673,   705 /    667 ],
];

// prettier-ignore
const LINEAR_SRGB_TO_XYZ: Matrix3 = [
  [ 506752 / 1228815,  87881 / 245763,   12673 /   70218 ],
  [  87098 /  409605, 175762 / 245763,   12673 /  175545 ],
  [   7918 /  409605,  87881 / 737289, 1001167 / 1053270 ],
];
