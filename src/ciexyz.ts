import { CieLab } from "./cielab.js";
import { Oklab } from "./oklab.js";
import { SrgbLinear } from "./srgb.js";
import { Matrix3, Vector3 } from "./util/linalg.js";

/** @internal */
export const D50: Vector3 = [
  0.3457 / 0.3585,
  1.0,
  (1.0 - 0.3457 - 0.3585) / 0.3585,
];

/**
 * A value in the CIE 1931 standard colorimetric system,
 * normalized to the CIE standard illuminant D50.
 * @public
 */
export class CieXyzD50 {
  private declare readonly nominalTypeId: symbol;

  constructor(
    /** The component _X_. */
    readonly x: number,
    /** The luminance component _Y_. */
    readonly y: number,
    /** The component _Z_. */
    readonly z: number,
  ) {}

  toCieXyzD65(): CieXyzD65 {
    return new CieXyzD65(...Matrix3.multiply(D50_TO_D65, this.toVector3()));
  }

  toCieLab(): CieLab {
    return CieLab.fromCieXyzD50(this);
  }

  /** @internal */
  toVector3(): Vector3 {
    return [this.x, this.y, this.z];
  }
}

/**
 * A value in the CIE 1931 standard colorimetric system,
 * normalized to the CIE standard illuminant D65.
 * @public
 */
export class CieXyzD65 {
  private declare readonly nominalTypeId: symbol;

  constructor(
    /** The component _X_. */
    readonly x: number,
    /** The luminance component _Y_. */
    readonly y: number,
    /** The component _Z_. */
    readonly z: number,
  ) {}

  toCieXyzD50(): CieXyzD50 {
    return new CieXyzD50(...Matrix3.multiply(D65_TO_D50, this.toVector3()));
  }

  toSrgbLinear(): SrgbLinear {
    return SrgbLinear.fromCieXyzD65(this);
  }

  toOklab(): Oklab {
    return Oklab.fromCieXyzD65(this);
  }

  /** @internal */
  toVector3(): Vector3 {
    return [this.x, this.y, this.z];
  }
}

// prettier-ignore
const D65_TO_D50: Matrix3 = [
  [ 1.0479297925449969  ,  0.022946870601609652, -0.05019226628920524 ],
  [ 0.02962780877005599 ,  0.9904344267538799  , -0.017073799063418826],
  [-0.009243040646204504,  0.015055191490298152,  0.7518742814281371  ],
];

// prettier-ignore
const D50_TO_D65: Matrix3 = [
  [ 0.955473421488075   , -0.02309845494876471 ,  0.06325924320057072 ],
  [-0.0283697093338637  ,  1.0099953980813041  ,  0.021041441191917323],
  [ 0.012314014864481998, -0.020507649298898964,  1.330365926242124   ],
];
