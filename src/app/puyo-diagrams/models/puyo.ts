/**
 * ぷよの種類を表すenum。
 */
export enum Puyo {
  Wall     = -1,
  Empty    =  0,
  Colored1 =  1,
  Colored2 =  2,
  Colored3 =  3,
  Colored4 =  4,
  Ojama    = 10,
}

export namespace Puyo {

  /**
   * ぷよの名前(半角英数)を取得する。
   *
   * @param puyo ぷよ
   * @returns ぷよの名前
   */
  export function nameOf(puyo: Puyo): string {
    switch (puyo) {
      case Puyo.Empty: return 'empty';
      case Puyo.Ojama: return 'ojama';
      default: return String(puyo);
    }
  }

  /**
   * ぷよが色ぷよか判定する。
   *
   * @param puyo ぷよ
   * @returns 色ぷよならばtrue
   */
  export function isColoredType(puyo: Puyo): boolean {
    return [
      Puyo.Colored1,
      Puyo.Colored2,
      Puyo.Colored3,
      Puyo.Colored4,
    ].includes(puyo);
  }

  /**
   * ぷよが落下可能な種類か判定する。
   *
   * @param puyo ぷよ
   * @returns 落下可能な種類ならばtrue
   */
  export function isDroppableType(puyo: Puyo): boolean {
    return [
      Puyo.Colored1,
      Puyo.Colored2,
      Puyo.Colored3,
      Puyo.Colored4,
      Puyo.Ojama,
    ].includes(puyo);
  }

}
