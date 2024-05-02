import { CieXyzD65 } from "./ciexyz";
import { Matrix3, ToVector3, Vector3 } from "./util/linalg";
import { Nominal } from "./util/nominal";

/**
 * A value in the canonical (non-linear) sRGB color space.
 */
export class Srgb extends Nominal<typeof Srgb.SYMBOL> implements ToVector3 {
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

    return new SrgbLinear(...Vector3.map(this.toVector3(), toLinear));
  }

  toVector3(): Vector3 {
    return [this.r, this.g, this.b];
  }
}

/**
 * A value in the linear sRGB color space.
 */
export class SrgbLinear
  extends Nominal<typeof SrgbLinear.SYMBOL>
  implements ToVector3
{
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
      ...Matrix3.multiply(XYZ_TO_LINEAR_SRGB, xyz.toVector3()),
    );
  }

  toCieXyzD65(): CieXyzD65 {
    return new CieXyzD65(
      ...Matrix3.multiply(LINEAR_SRGB_TO_XYZ, this.toVector3()),
    );
  }

  toSrgb(): Srgb {
    function toNonLinear(value: number): number {
      return value <= 0.0031308
        ? 12.92 * value
        : 1.055 * value ** (1.0 / 2.4) - 0.055;
    }

    return new Srgb(...Vector3.map(this.toVector3(), toNonLinear));
  }

  toVector3(): Vector3 {
    return [this.r, this.g, this.b];
  }
}

// prettier-ignore
const XYZ_TO_LINEAR_SRGB: Matrix3 = [
  [ 3.2409699419045213 , -1.5373831775700935 , -0.4986107602930033 ],
  [-0.9692436362808798 ,  1.8759675015077206 ,  0.04155505740717561],
  [ 0.05563007969699361, -0.20397695888897657,  1.0569715142428786 ],
];

// prettier-ignore
const LINEAR_SRGB_TO_XYZ: Matrix3 = [
  [ 0.4123907992659595 ,  0.35758433938387796,  0.1804807884018343 ],
  [ 0.21263900587151036,  0.7151686787677559 ,  0.07219231536073371],
  [ 0.01933081871559185,  0.11919477979462599,  0.9505321522496606 ],
];
