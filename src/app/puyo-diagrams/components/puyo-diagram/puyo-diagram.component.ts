import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Tuple } from 'src/app/utils/types';
import { Puyo } from '../../models/puyo';
import { PuyoDiagram } from '../../models/puyo-diagram';
import { PuyoField } from '../../models/puyo-field';

@Component({
  selector: 'app-puyo-diagram',
  templateUrl: './puyo-diagram.component.html',
  styleUrls: ['./puyo-diagram.component.scss'],
})
export class PuyoDiagramComponent {

  readonly ROW_INDICES = PuyoField.ROW_INDICES;
  readonly COL_INDICES = PuyoField.COL_INDICES;

  @Input() puyoDiagram!: PuyoDiagram;
  @Input() showCursor = false;
  @Output() clicked = new EventEmitter<Tuple<number>>();

  puyoNameAt(position: Tuple<number>): string {
    const puyo = this.puyoDiagram.field.getPuyo(position);
    return Puyo.nameOf(puyo);
  }

  calcConnectionStatus(position: Tuple<number>): string {
    const flags = this.puyoDiagram.field.calcConnectionStatus(position);
    return flags.map(Number).join('');
  }

  click(position: Tuple<number>): void {
    this.clicked.emit(position);
  }

}
