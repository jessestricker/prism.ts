import { Oklab } from "./oklab";
import { SrgbLinear } from "./srgb";
import { Matrix3 } from "./util/linalg";
import { Nominal } from "./util/nominal";

abstract class BaseCieXyz<_Symbol extends symbol> extends Nominal<_Symbol> {
  constructor(
    readonly x: number,
    readonly y: number,
    readonly z: number,
  ) {
    super();
  }
}

export class CieXyzD50 extends BaseCieXyz<typeof CieXyzD50.SYMBOL> {
  private declare static readonly SYMBOL: unique symbol;

  toCieXyzD65(): CieXyzD65 {
    return new CieXyzD65(
      ...Matrix3.multiply(D50_TO_D65, [this.x, this.y, this.z]),
    );
  }
}

export class CieXyzD65 extends BaseCieXyz<typeof CieXyzD65.SYMBOL> {
  private declare static readonly SYMBOL: unique symbol;

  toCieXyzD50(): CieXyzD50 {
    return new CieXyzD50(
      ...Matrix3.multiply(D65_TO_D50, [this.x, this.y, this.z]),
    );
  }

  toSrgbLinear(): SrgbLinear {
    return SrgbLinear.fromCieXyzD65(this);
  }

  toOklab(): Oklab {
    return Oklab.fromCieXyzD65(this);
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
