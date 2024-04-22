import { SrgbLinear } from "./srgb";
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
}

export class CieXyzD65 extends BaseCieXyz<typeof CieXyzD65.SYMBOL> {
  private declare static readonly SYMBOL: unique symbol;

  toSrgbLinear(): SrgbLinear {
    return SrgbLinear.fromCieXyzD65(this);
  }
}
