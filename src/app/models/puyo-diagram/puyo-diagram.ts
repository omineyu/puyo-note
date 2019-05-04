import { Puyo } from 'src/app/models/puyo-diagram/puyo';
import { PuyoChain } from 'src/app/models/puyo-diagram/puyo-chain';
import { PuyoDiagramStatus } from 'src/app/models/puyo-diagram/puyo-diagram-status';
import { PuyoField } from 'src/app/models/puyo-diagram/puyo-field';
import { settings } from 'src/app/settings';

/**
 * ぷよ図。
 *
 * - ぷよ図とは、ぷよぷよの連鎖を表す図である。
 * - ぷよ図を再生することで、連鎖をシミュレートできる。
 */
export class PuyoDiagram {

  /**
   * ぷよぷよの連鎖。
   *
   * - ぷよ図が停止中の場合はundefined。
   */
  private puyoChain?: PuyoChain;

  constructor(
    public readonly id: number | undefined,
    public readonly name: string,
    public status: PuyoDiagramStatus,
    public field: PuyoField = PuyoField.empty()
  ) {}

  /**
   * PuyoDiagramRecordをPuyoDiagramに変換する。
   *
   * @param record PuyoDiagramRecord
   * @returns PuyoDiagram
   */
  static fromRecord(record: PuyoDiagramRecord): PuyoDiagram {
    const puyoField = PuyoField.of(record.field);
    return new PuyoDiagram(record.id, record.name, record.status, puyoField);
  }

  /**
   * PuyoDiagramをPuyoDiagramRecordに変換する。
   *
   * @returns PuyoDiagramRecord
   */
  toRecord(): PuyoDiagramRecord {
    const record = { id: this.id, name: this.name, status: this.status, field: this.field.toArray() };
    if (record.id === undefined) {
      // undefinedならばキーも削除
      delete record.id;
    }
    return record;
  }

  /**
   * ぷよ図をコピーする。
   *
   * @returns ぷよ図のコピー
   */
  copy(): PuyoDiagram {
    return new PuyoDiagram(this.id, this.name, this.status, this.field.copy());
  }

  /**
   * ぷよ図が再生中か判定する。
   *
   * @returns 再生中の場合はtrue
   */
  isPlaying(): boolean {
    return this.puyoChain !== undefined;
  }

  /**
   * ぷよ図を再生する。
   */
  play(): void {
    if (this.isPlaying()) { return; }
    this.puyoChain = new PuyoChain(this.field);
    this.playLoop();
  }

  /**
   * ぷよ図を再生するためのループ。
   *
   * ぷよ図が変化しなくなるまで、連鎖を1ステップずつ進める。
   */
  private playLoop(): void {

    const puyoChain = this.puyoChain;
    if (puyoChain === undefined) { return; }

    const changed = puyoChain.step();
    if (!changed) {
      this.stop();
      return;
    }

    this.field = puyoChain.getField();

    setTimeout(() => this.playLoop(), settings.CHAIN_ANIMATION_INTERVAL_MS);
  }

  /**
   * ぷよ図の再生を停止する。
   *
   * - フィールドは連鎖前の状態に戻す。
   */
  stop(): void {

    const puyoChain = this.puyoChain;
    if (puyoChain === undefined) { return; }

    puyoChain.reset();
    this.field = puyoChain.getField();
    this.puyoChain = undefined;
  }

}

/**
 * ぷよ図レコード。
 *
 * PuyoDiagramをIndexedDBに保存する際の形式として使う。
 */
export interface PuyoDiagramRecord {
  readonly id?: number;
  readonly name: string;
  readonly status: PuyoDiagramStatus;
  readonly field: Puyo[][];
}
