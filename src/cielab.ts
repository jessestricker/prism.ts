import { CieXyzD50, D50 } from "./ciexyz.js";

/**
 * A value in the CIE 1976 L\*a\*b\* color space.
 * @public
 */
export class CieLab {
  private declare readonly nominalTypeId: symbol;

  constructor(
    /** The lightness component _L_, in the range [0, 1]. */
    readonly l: number,
    /** The green/red component _a_, practically in the range [-1.6, +1.6]. */
    readonly a: number,
    /** The blue/yellow component _b_, practically in the range [-1.6, +1.6]. */
    readonly b: number,
  ) {}

  static fromCieXyzD50(xyz: CieXyzD50): CieLab {
    function f(value: number): number {
      return value > (6 / 29) ** 3
        ? Math.cbrt(value)
        : (841 / 108) * value + 4 / 29;
    }
    const l = 116 * f(xyz.y / Yn) + 16;
    const a = 500 * (f(xyz.x / Xn) - f(xyz.y / Yn));
    const b = 200 * (f(xyz.y / Yn) - f(xyz.z / Zn));
    return new CieLab(l / 100, a / 100, b / 100);
  }

  toCieXyzD50(): CieXyzD50 {
    const fYYn = (this.l * 100 + 16) / 116;
    const fXXn = (this.a * 100) / 500 + fYYn;
    const fZZn = fYYn - (this.b * 100) / 200;

    function fInv(value: number): number {
      return value > 6 / 29 ? value ** 3 : (value - 4 / 29) / (841 / 108);
    }

    const x = fInv(fXXn) * Xn;
    const y = fInv(fYYn) * Yn;
    const z = fInv(fZZn) * Zn;
    return new CieXyzD50(x, y, z);
  }
}

const [Xn, Yn, Zn] = D50;
