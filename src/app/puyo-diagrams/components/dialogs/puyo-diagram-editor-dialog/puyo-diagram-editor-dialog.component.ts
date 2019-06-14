import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Tuple } from 'src/app/utils/types';
import { Puyo } from '../../../models/puyo';
import { PuyoDiagram } from '../../../models/puyo-diagram';

@Component({
  selector: 'app-puyo-diagram-editor-dialog',
  templateUrl: './puyo-diagram-editor-dialog.component.html',
  styleUrls: ['./puyo-diagram-editor-dialog.component.scss']
})
export class PuyoDiagramEditorDialogComponent {

  readonly PALETTE_PUYOS: ReadonlyArray<Puyo> = [
    Puyo.Empty,
    Puyo.Ojama,
    Puyo.Colored1,
    Puyo.Colored2,
    Puyo.Colored3,
    Puyo.Colored4,
  ];

  readonly nameOf = Puyo.nameOf;

  selectedPuyo = Puyo.Colored1;

  constructor(@Inject(MAT_DIALOG_DATA) public puyoDiagram: PuyoDiagram) {
    this.puyoDiagram = puyoDiagram.copy();
  }

  selectPuyo(puyo: Puyo) {
    this.selectedPuyo = puyo;
  }

  drawPuyo(position: Tuple<number>): void {

    // ぷよ図の再生中は編集不可
    if (this.puyoDiagram.isPlaying()) { return; }

    this.puyoDiagram.field.setPuyo(position, this.selectedPuyo);
  }

  clickPlayerButton(): void {
    if (this.puyoDiagram.isPlaying()) {
       this.puyoDiagram.stop();
     } else {
       this.puyoDiagram.play();
     }
  }

  playerButtonIcon(): string {
    return this.puyoDiagram.isPlaying() ? 'stop' : 'play_arrow';
  }

}
