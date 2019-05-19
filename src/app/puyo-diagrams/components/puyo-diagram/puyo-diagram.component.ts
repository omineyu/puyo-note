import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { Tuple } from 'src/app/utils/types';
import { Puyo } from '../../models/puyo';
import { PuyoDiagram } from '../../models/puyo-diagram';
import { PuyoField } from '../../models/puyo-field';

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
