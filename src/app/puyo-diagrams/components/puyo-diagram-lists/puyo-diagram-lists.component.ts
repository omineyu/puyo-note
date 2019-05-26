import { Component, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';

import { keyValuesOfEnum } from 'src/app/utils/enum';
import { PuyoDiagramStatus } from '../../models/puyo-diagram-status';
import { PuyoDiagramListComponent } from '../puyo-diagram-list/puyo-diagram-list.component';

@Component({
  selector: 'app-puyo-diagram-lists',
  templateUrl: './puyo-diagram-lists.component.html',
  styleUrls: ['./puyo-diagram-lists.component.scss']
})
export class PuyoDiagramListsComponent {

  readonly STATUSES = keyValuesOfEnum(PuyoDiagramStatus);

  status = PuyoDiagramStatus.ToDo;

  @ViewChild(PuyoDiagramListComponent) private puyoDiagramListComponent!: PuyoDiagramListComponent;

  changeTab(event: MatTabChangeEvent): void {
    const status = this.STATUSES[event.index].value;
    this.puyoDiagramListComponent.status = status;
    this.puyoDiagramListComponent.pageIndex = 0;
    this.puyoDiagramListComponent.getPuyoDiagrams();
  }

}
