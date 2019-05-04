import { adjacentPointsOf } from 'src/app/utils/point';
import { range } from 'src/app/utils/range';
import { Tuple } from 'src/app/utils/types';

import { Puyo } from 'src/app/models/puyo-diagram/puyo';

/**
 * ぷよぷよのフィールド。
 *
 * 周囲1マスは壁とする(番兵)。
 */
export class PuyoField {

  private constructor(
    private readonly data: Puyo[][]
  ) {}

  /**
   * フィールドの行数(周囲1マスの壁を除く)。
   */
  static readonly NUM_ROWS = 13;

  /**
   * フィールドの列数(周囲1マスの壁を除く)。
   */
  static readonly NUM_COLS = 6;

  /**
   * フィールドの行番号の配列(周囲1マスの壁を除く)。
   */
  static readonly ROW_INDICES: ReadonlyArray<number> = range(1, PuyoField.NUM_ROWS + 1);

  /**
   * フィールドの列番号の配列(周囲1マスの壁を除く)。
   */
  static readonly COL_INDICES: ReadonlyArray<number> = range(1, PuyoField.NUM_COLS + 1);

  /**
   * フィールド上の各位置を要素とする配列(周囲1マスの壁を除く)。
   *
   * - 形式
   *   - [
   *       [ 1, 1], [ 1, 2], ..., [ 1, 6],
   *       [ 2, 1], [ 2, 2], ..., [ 2, 6],
   *       ...,
   *       [13, 1], [13, 2], ..., [13, 6]
   *     ]
   */
  static readonly POSITIONS: ReadonlyArray<Tuple<number>> =
    PuyoField.ROW_INDICES.map(i =>
      PuyoField.COL_INDICES.map(j =>
        [i, j] as Tuple<number>
      )
    ).reduce((prev, curr) => prev.concat(curr));

  /**
   * PuyoFieldを作成する。
   *
   * - 作成時に、フィールドのデータに周囲1マスの壁を加える(番兵)。
   *
   * @param data フィールドのデータ
   * @returns PuyoField
   */
  static of(data: Puyo[][]): PuyoField {
    const walledData = PuyoField.addWalls(data);
    return new PuyoField(walledData);
  }

  /**
   * 空のPuyoFieldを作成する。
   *
   * @returns 空のPuyoField
   */
  static empty(): PuyoField {

    const emptyData: Puyo[][] =
      PuyoField.ROW_INDICES.map(() =>
        PuyoField.COL_INDICES.map(() =>
          Puyo.Empty
        )
      );

    return PuyoField.of(emptyData);
  }

  /**
   * フィールドのデータに周囲1マスの壁を加える。
   *
   * @param data フィールドのデータ
   * @returns フィールドのデータ(周囲1マスの壁を含む)
   */
  private static addWalls(data: Puyo[][]): Puyo[][] {

    const rowIndices = range(0, PuyoField.NUM_ROWS + 2);
    const colIndices = range(0, PuyoField.NUM_COLS + 2);

    const isEdge = (i: number, j: number) => (
      i === 0 || i === PuyoField.NUM_ROWS + 1 ||
      j === 0 || j === PuyoField.NUM_COLS + 1
    );

    return rowIndices.map(i =>
        colIndices.map(j =>
          isEdge(i, j) ? Puyo.Wall : data[i - 1][j - 1]
        )
      );
  }

  /**
   * PuyoFieldをコピーする。
   *
   * @returns PuyoFieldのコピー
   */
  copy(): PuyoField {
    const copiedData = JSON.parse(JSON.stringify(this.data));
    return new PuyoField(copiedData);
  }

  /**
   * PuyoFieldを2次元配列に変換する。
   *
   * - 周囲1マスの壁を除く。
   *
   * @returns PuyoFieldを表す2次元配列
   */
  toArray(): Puyo[][] {
    return PuyoField.ROW_INDICES.map(i =>
      PuyoField.COL_INDICES.map(j =>
        this.data[i][j]
      )
    );
  }

  /**
   * フィールド上のぷよを取得する。
   *
   * @param position ぷよの位置
   * @returns ぷよ
   */
  getPuyo(position: Tuple<number>): Puyo {
    if (!PuyoField.containsPosition(position)) {
      throw new RangeError(`Position [${position}] is out of PuyoField`);
    }
    const [i, j] = position;
    return this.data[i][j];
  }

  /**
   * フィールド上にぷよを設定する。
   *
   * @param position ぷよの位置
   * @param puyo ぷよ
   */
  setPuyo(position: Tuple<number>, puyo: Puyo): void {
    if (!PuyoField.containsPosition(position)) {
      throw new RangeError(`Position [${position}] is out of PuyoField`);
    }
    const [i, j] = position;
    this.data[i][j] = puyo;
  }

  /**
   * 対象の位置がフィールド内であるか判定する。
   *
   * - 周囲1マスの壁もフィールド内とする。
   *
   * @param position 位置
   * @returns フィールド内である場合はtrue
   */
  private static containsPosition(position: Tuple<number>): boolean {
    const [i, j] = position;
    return (
      i >= 0 && i <= PuyoField.NUM_ROWS + 1 &&
      j >= 0 && j <= PuyoField.NUM_COLS + 1
    );
  }

  /**
   * フィールド上の2箇所のぷよを入れ替える。
   *
   * @param position1 1個目のぷよの位置
   * @param position2 2個目のぷよの位置
   */
  swap(position1: Tuple<number>, position2: Tuple<number>) {
    const temp = this.getPuyo(position1);
    this.setPuyo(position1, this.getPuyo(position2));
    this.setPuyo(position2, temp);
  }

  /**
   * 対象のぷよの連結状態を表す文字列を作成する。
   *
   * - 形式: '<右><左><下><上>'
   *   - 例: '1010' (右と下のみ同色のぷよがある場合)
   *
   * - 色ぷよでないぷよは他のぷよと連結しない。
   * - 最上段のぷよは他のぷよと連結しない。
   *
   * @param position ぷよの位置
   * @returns ぷよの連結状態を表す文字列
   */
  connectionStatusAt(position: Tuple<number>): string {

    const puyo = this.getPuyo(position);

    const isConnected = (adjacentPosition: Tuple<number>) => {

      // 色ぷよでないぷよは他のぷよと連結しない
      if (!Puyo.isColoredType(puyo)) {
        return false;
      }

      // 最上段のぷよは他のぷよと連結しない
      if (position[0] === 1 || adjacentPosition[0] === 1) {
        return false;
      }

      const adjacentPuyo = this.getPuyo(adjacentPosition);
      return adjacentPuyo === puyo;
    };

    return adjacentPointsOf(position)
      .map(isConnected)
      .map(Number)
      .join('');
  }

  /**
   * 対象のぷよの連結数を計算する。
   *
   * ぷよの連結数とは、ぷよとそのぷよに連結している同色のぷよの数である。
   *
   * - 例
   *   - 単独の色ぷよの連結数は1である。
   *   - 横に3つ並んだ同色のぷよの連結数は、いずれも3である。
   *
   * - 色ぷよでないぷよの連結数は0とする。
   * - 最上段のぷよの連結数は0とする。
   *
   * @param position ぷよの位置
   * @param _countedPositions カウント済みの全位置(内部でのみ使用。値による比較のため、位置は文字列として保持)
   * @returns ぷよの連結数
   */
  calcConnectionNumber(position: Tuple<number>, _countedPositions: Set<string> = new Set()): number {

    // 色ぷよでないぷよの連結数は0
    if (!Puyo.isColoredType(this.getPuyo(position))) {
      return 0;
    }

    // 最上段のぷよの連結数は0
    if (position[0] === 1) {
      return 0;
    }

    // カウントの重複を回避
    if (_countedPositions.has(position.toString())) {
      return 0;
    }
    _countedPositions.add(position.toString());

    // 対象の上下左右のぷよに対し、再帰的に連結数をカウント
    let connectionNumber = 1;
    for (const adjacentPosition of adjacentPointsOf(position)) {
      if (this.getPuyo(adjacentPosition) === this.getPuyo(position)) {
        connectionNumber += this.calcConnectionNumber(adjacentPosition, _countedPositions);
      }
    }
    return connectionNumber;
  }

}
