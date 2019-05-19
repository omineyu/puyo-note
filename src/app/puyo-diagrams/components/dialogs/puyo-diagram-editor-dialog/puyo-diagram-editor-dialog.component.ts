import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Tuple } from 'src/app/utils/types';
import { Puyo } from '../../../models/puyo';
import { PuyoDiagram } from '../../../models/puyo-diagram';
import { PuyoField } from '../../../models/puyo-field';

@Component({
  selector: 'app-puyo-diagram-editor-dialog',
  templateUrl: './puyo-diagram-editor-dialog.component.html',
  styleUrls: ['./puyo-diagram-editor-dialog.component.scss']
})
export class PuyoDiagramEditorDialogComponent {

  readonly Puyo = Puyo;
  readonly PuyoField = PuyoField;

  readonly PALETTE_PUYOS: ReadonlyArray<Puyo> = [
    Puyo.Empty,
    Puyo.Ojama,
    Puyo.Colored1,
    Puyo.Colored2,
    Puyo.Colored3,
    Puyo.Colored4,
  ];

  selectedPuyo = Puyo.Colored1;

  constructor(@Inject(MAT_DIALOG_DATA) public puyoDiagram: PuyoDiagram) {
    this.puyoDiagram = puyoDiagram.copy();
  }

  drawPuyo(position: Tuple<number>): void {

    // ぷよ図の再生中は編集不可
    if (this.puyoDiagram.isPlaying()) { return; }

    this.puyoDiagram.field.setPuyo(position, this.selectedPuyo);
  }

}
