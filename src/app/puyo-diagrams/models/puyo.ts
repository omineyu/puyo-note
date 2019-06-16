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
   * ぷよ名(半角英数)を取得する。
   *
   * @param puyo ぷよ
   * @returns ぷよ名
   */
  export function nameOf(puyo: Puyo): string {
    switch (puyo) {
      case Puyo.Wall    : return 'wall';
      case Puyo.Empty   : return 'empty';
      case Puyo.Colored1: return 'colored1';
      case Puyo.Colored2: return 'colored2';
      case Puyo.Colored3: return 'colored3';
      case Puyo.Colored4: return 'colored4';
      case Puyo.Ojama   : return 'ojama';
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
