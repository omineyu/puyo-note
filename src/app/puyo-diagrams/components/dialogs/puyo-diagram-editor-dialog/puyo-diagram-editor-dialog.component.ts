import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Tuple } from 'src/app/utils/types';
import { Puyo } from '../../../models/puyo';
import { PuyoDiagram } from '../../../models/puyo-diagram';

/**
 * ぷよ図エディターダイアログのコンポーネント。
 */
@Component({
  selector: 'app-puyo-diagram-editor-dialog',
  templateUrl: './puyo-diagram-editor-dialog.component.html',
  styleUrls: ['./puyo-diagram-editor-dialog.component.scss']
})
export class PuyoDiagramEditorDialogComponent {

  /**
   * パレットのぷよ一覧。
   */
  readonly PALETTE_PUYOS: ReadonlyArray<Puyo> = [
    Puyo.Empty,
    Puyo.Ojama,
    Puyo.Colored1,
    Puyo.Colored2,
    Puyo.Colored3,
    Puyo.Colored4,
  ];

  /**
   * ぷよ名(半角英数)を取得する。
   */
  readonly nameOf = Puyo.nameOf;

  /**
   * パレットで選択されたぷよ。
   */
  selectedPuyo = Puyo.Colored1;

  /**
   * PuyoDiagramEditorDialogComponentを作成する。
   *
   * @param puyoDiagram ぷよ図
   */
  constructor(@Inject(MAT_DIALOG_DATA) public puyoDiagram: PuyoDiagram) {
    this.puyoDiagram = puyoDiagram.copy();
  }

  /**
   * パレットのぷよを選択する。
   *
   * @param puyo ぷよ
   */
  selectPuyo(puyo: Puyo): void {
    this.selectedPuyo = puyo;
  }

  /**
   * フィールドに、パレットで選択されたぷよを描画する。
   *
   * @param position 位置
   */
  drawPuyo(position: Tuple<number>): void {

    // ぷよ図の再生中は編集不可
    if (this.puyoDiagram.isPlaying()) { return; }

    this.puyoDiagram.field.setPuyo(position, this.selectedPuyo);
  }

  /**
   * プレイヤーボタンをクリックしたときの処理。
   *
   * ぷよ図の再生と停止を切り替える。
   */
  clickPlayerButton(): void {
    if (this.puyoDiagram.isPlaying()) {
       this.puyoDiagram.stop();
     } else {
       this.puyoDiagram.play();
     }
  }

  /**
   * プレイヤーボタンのマテリアルアイコン名を取得する。
   *
   * - ぷよ図が再生中ならば、停止を表すマテリアルアイコン名を返す。
   * - ぷよ図が停止中ならば、再生を表すマテリアルアイコン名を返す。
   *
   * @returns マテリアルアイコン名
   */
  playerButtonIcon(): string {
    return this.puyoDiagram.isPlaying() ? 'stop' : 'play_arrow';
  }

}
