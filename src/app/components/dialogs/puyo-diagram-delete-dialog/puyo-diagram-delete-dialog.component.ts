import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { PuyoDiagram } from 'src/app/models/puyo-diagram/puyo-diagram';

@Component({
  selector: 'app-puyo-diagram-delete-dialog',
  templateUrl: './puyo-diagram-delete-dialog.component.html',
  styleUrls: ['./puyo-diagram-delete-dialog.component.scss']
})
export class PuyoDiagramDeleteDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public puyoDiagram: PuyoDiagram
  ) {}

}
