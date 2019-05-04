import { Component, QueryList, ViewChildren } from '@angular/core';

import { PuyoDiagramListComponent } from 'src/app/components/puyo-diagram-list/puyo-diagram-list.component';
import { PuyoDiagramStatus } from 'src/app/models/puyo-diagram/puyo-diagram-status';
import { settings } from 'src/app/settings';
import { keyValuesOfEnum } from 'src/app/utils/enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  readonly settings = settings;

  readonly STATUSES = keyValuesOfEnum(PuyoDiagramStatus);

  @ViewChildren(PuyoDiagramListComponent) private puyoDiagramListComponents!: QueryList<PuyoDiagramListComponent>;

  // TODO 全部をリロードするのはムダ
  reloadAll(): void {
    this.puyoDiagramListComponents.forEach(component => component.getPuyoDiagrams());
  }

}
