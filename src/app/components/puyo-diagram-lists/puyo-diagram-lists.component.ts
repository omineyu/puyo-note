import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';

import { PuyoDiagramListComponent } from 'src/app/components/puyo-diagram-list/puyo-diagram-list.component';
import { PuyoDiagramStatus } from 'src/app/models/puyo-diagram/puyo-diagram-status';
import { keyValuesOfEnum } from 'src/app/utils/enum';

@Component({
  selector: 'app-puyo-diagram-lists',
  templateUrl: './puyo-diagram-lists.component.html',
  styleUrls: ['./puyo-diagram-lists.component.scss']
})
export class PuyoDiagramListsComponent {

  readonly STATUSES = keyValuesOfEnum(PuyoDiagramStatus);

  @ViewChildren(PuyoDiagramListComponent) private puyoDiagramListComponents!: QueryList<PuyoDiagramListComponent>;

  constructor() {}

  reloadTabContent(event: MatTabChangeEvent): void {
    const status = this.STATUSES[event.index].value;
    this.puyoDiagramListComponents
      .filter(component => component.status === status)
      .forEach(component => component.getPuyoDiagrams());
  }

}
