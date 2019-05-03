import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Puyo } from 'src/app/models/puyo-diagram/puyo';
import { PuyoDiagram } from 'src/app/models/puyo-diagram/puyo-diagram';
import { PuyoField } from 'src/app/models/puyo-diagram/puyo-field';

@Component({
  selector: 'app-puyo-diagram-editor-dialog',
  templateUrl: './puyo-diagram-editor-dialog.component.html',
  styleUrls: ['./puyo-diagram-editor-dialog.component.scss']
})
export class PuyoDiagramEditorDialogComponent implements OnInit {

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

  selectedPuyo?: Puyo;

  constructor(@Inject(MAT_DIALOG_DATA) public puyoDiagram: PuyoDiagram) {}

  ngOnInit() {
    this.puyoDiagram = this.puyoDiagram.copy();
    this.selectedPuyo = Puyo.Colored1;
  }

}
