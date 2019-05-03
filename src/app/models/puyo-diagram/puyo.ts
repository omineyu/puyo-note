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

  export function nameOf(puyo: Puyo): string {
    switch (puyo) {
      case Puyo.Empty: return 'empty';
      case Puyo.Ojama: return 'ojama';
      default: return String(puyo);
    }
  }

  export function isColoredType(puyo: Puyo): boolean {
    return [
      Puyo.Colored1,
      Puyo.Colored2,
      Puyo.Colored3,
      Puyo.Colored4,
    ].includes(puyo);
  }

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
