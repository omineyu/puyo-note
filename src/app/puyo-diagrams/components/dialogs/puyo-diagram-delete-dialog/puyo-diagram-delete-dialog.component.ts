import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { PuyoDiagram } from '../../../models/puyo-diagram';

/**
 * ぷよ図削除ダイアログのコンポーネント。
 */
@Component({
  selector: 'app-puyo-diagram-delete-dialog',
  templateUrl: './puyo-diagram-delete-dialog.component.html',
  styleUrls: ['./puyo-diagram-delete-dialog.component.scss']
})
export class PuyoDiagramDeleteDialogComponent {

  /**
   * PuyoDiagramDeleteDialogComponentを作成する。
   *
   * @param puyoDiagram ぷよ図
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public puyoDiagram: PuyoDiagram
  ) {}

}
