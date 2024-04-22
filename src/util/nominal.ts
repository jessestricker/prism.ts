/**
 * Base class for nominal types.
 *
 * @example
 *
 * ```
 * class Foo extends Nominal<typeof Foo.SYMBOL> {
 *   private declare static readonly SYMBOL: unique symbol;
 * }
 * ```
 */
export abstract class Nominal<_Symbol extends symbol> {
  private declare readonly _symbol: _Symbol;
}
