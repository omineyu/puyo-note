import { adjacentPointsOf } from 'src/app/utils/point';
import { Tuple } from 'src/app/utils/types';

import { Puyo } from 'src/app/models/puyo-diagram/puyo';
import { PuyoField } from 'src/app/models/puyo-diagram/puyo-field';

/**
 * ぷよぷよの連鎖。
 *
 * 現在のフィールドから1ステップ後のフィールドを計算し、連鎖を進めていく。
 */
export class PuyoChain {

  /**
   * 連鎖開始時のフィールド。
   */
  private readonly firstField: PuyoField;

  constructor(
    private field: PuyoField
  ) {
    this.field = field.copy();
    this.firstField = field.copy();
  }

  /**
   * 現在のフィールドを取得する。
   *
   * @returns フィールド
   */
  getField(): PuyoField {
    return this.field.copy();
  }

  /**
   * 連鎖を1ステップ進める。
   *
   * 1. フィールド上のぷよを落下させる。
   * 2. ぷよが落下しなかった場合、オワニモを唱える。
   *
   * @returns フィールドが変化した場合はtrue
   */
  step(): boolean {
    return this.dropPuyos() || this.uyenimo();
  }

  /**
   * フィールドを連鎖開始時の状態に戻す。
   */
  reset(): void {
    this.field = this.firstField;
  }

  /**
   * 浮いている全ぷよを落下させる。
   *
   * @returns ぷよが落下した場合はtrue
   */
  private dropPuyos(): boolean {

    let dropped = false;

    // 下のぷよから順に落下させる
    for (const position of PuyoField.positions().reverse()) {
      const puyo = this.field.getPuyo(position);
      if (Puyo.isDroppable(puyo)) {
        dropped = this.dropPuyo(position) || dropped;
      }
    }

    return dropped;
  }

  /**
   * 対象のぷよを落下させる。
   *
   * @param position ぷよの位置
   * @returns ぷよが1マス以上落下した場合はtrue
   */
  private dropPuyo(position: Tuple<number>): boolean {

    const nextPositionOf: (pos: Tuple<number>) => Tuple<number> = pos => {
      const lowerPos: Tuple<number> = [pos[0] + 1, pos[1]];
      const lowerPuyo = this.field.getPuyo(lowerPos);
      return (lowerPuyo === Puyo.Empty) ? nextPositionOf(lowerPos) : pos;
    };

    const nextPosition = nextPositionOf(position);
    this.field.swap(position, nextPosition);
    return position !== nextPosition;
  }

  /**
   * オワニモを唱える。
   *
   * 4個以上連結している色ぷよ、およびこれらに隣接しているおじゃまぷよを消す。
   * ただし最上段のおじゃまぷよは対象外とする。
   *
   * @returns ぷよが1個でも消えた場合はtrue
   */
  private uyenimo(): boolean {

    const targetPositions = PuyoField.positions().filter(position => {
      const CONNECTION_NUMBER_THRESHOLD = 4;
      const connectionNumber = this.field.calcConnectionNumber(position);
      return connectionNumber >= CONNECTION_NUMBER_THRESHOLD;
    });

    for (const position of targetPositions) {
      this.erasePuyo(position);
    }

    return targetPositions.length > 0;
  }

  /**
   * 対象のぷよと、ぷよに隣接しているおじゃまぷよ(最上段を除く)を消す。
   *
   * @param position ぷよの位置
   */
  private erasePuyo(position: Tuple<number>): void {

    // 対象のぷよを消す
    this.field.setPuyo(position, Puyo.Empty);

    // 対象のぷよに隣接しているおじゃまぷよを消す
    for (const adjacentPosition of adjacentPointsOf(position)) {

      // 最上段を除く
      if (adjacentPosition[0] === 1) { continue; }

      if (this.field.getPuyo(adjacentPosition) === Puyo.Ojama) {
        this.field.setPuyo(adjacentPosition, Puyo.Empty);
      }
    }
  }

}
