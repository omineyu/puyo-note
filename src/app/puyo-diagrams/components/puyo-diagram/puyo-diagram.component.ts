import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Tuple } from 'src/app/utils/types';
import { Puyo } from '../../models/puyo';
import { PuyoDiagram } from '../../models/puyo-diagram';
import { PuyoField } from '../../models/puyo-field';

/**
 * ぷよ図のコンポーネント。
 */
@Component({
  selector: 'app-puyo-diagram',
  templateUrl: './puyo-diagram.component.html',
  styleUrls: ['./puyo-diagram.component.scss'],
})
export class PuyoDiagramComponent {

  /**
   * フィールドの行番号の配列(周囲1マスの壁を除く)。
   */
  readonly ROW_INDICES = PuyoField.ROW_INDICES;

  /**
   * フィールドの列番号の配列(周囲1マスの壁を除く)。
   */
  readonly COL_INDICES = PuyoField.COL_INDICES;

  /**
   * ぷよ図。
   */
  @Input() puyoDiagram!: PuyoDiagram;

  /**
   * フィールド上にカーソルを表示する場合はtrue。
   */
  @Input() showCursor = false;

  /**
   * フィールドがクリックされたときのイベント。
   *
   * - クリックされた位置を保持する。
   */
  @Output() clicked = new EventEmitter<Tuple<number>>();

  /**
   * 対象のぷよのぷよ名(半角英数)を取得する。
   *
   * @param position ぷよの位置
   */
  puyoNameAt(position: Tuple<number>): string {
    const puyo = this.puyoDiagram.field.getPuyo(position);
    return Puyo.nameOf(puyo);
  }

  /**
   * 対象のぷよの連結状態を計算する。
   *
   * - 形式: '<右><左><下><上>'
   *   - 例: '1010' (右と下のみ同色のぷよがある場合)
   *
   * @param position ぷよの位置
   * @returns ぷよの連結状態
   */
  calcConnectionStatus(position: Tuple<number>): string {
    const flags = this.puyoDiagram.field.calcConnectionStatus(position);
    return flags.map(Number).join('');
  }

  /**
   * フィールドがクリックされたときのイベントを発行する。
   *
   * @param position クリックされた位置
   */
  click(position: Tuple<number>): void {
    this.clicked.emit(position);
  }

}
