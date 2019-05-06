import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { Puyo } from 'src/app/models/puyo-diagram/puyo';
import { PuyoDiagram } from 'src/app/models/puyo-diagram/puyo-diagram';
import { PuyoField } from 'src/app/models/puyo-diagram/puyo-field';
import { Tuple } from 'src/app/utils/types';

@Component({
  selector: 'app-puyo-diagram',
  templateUrl: './puyo-diagram.component.html',
  styleUrls: ['./puyo-diagram.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PuyoDiagramComponent {

  readonly Puyo = Puyo;
  readonly PuyoField = PuyoField;

  @Input() puyoDiagram!: PuyoDiagram;
  @Input() showCursor = false;
  @Output() clicked = new EventEmitter<Tuple<number>>();

  constructor() {}

  click(position: Tuple<number>) {
    this.clicked.emit(position);
  }

}
