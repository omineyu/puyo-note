import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PuyoDiagramListComponent } from 'src/app/components/puyo-diagram-list/puyo-diagram-list.component';
import { PuyoDiagramStatus } from 'src/app/models/puyo-diagram/puyo-diagram-status';
import { settings } from 'src/app/settings';
import { keyValuesOfEnum } from 'src/app/utils/enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  readonly settings = settings;

  readonly STATUSES = keyValuesOfEnum(PuyoDiagramStatus);

  @ViewChildren(PuyoDiagramListComponent) private puyoDiagramListComponents!: QueryList<PuyoDiagramListComponent>;

  constructor(private title: Title) {}

  ngOnInit() {
    this.title.setTitle(settings.APP_NAME);
  }

  // TODO 全部をリロードするのはムダ
  reloadAll(): void {
    this.puyoDiagramListComponents.forEach(component => component.getPuyoDiagrams());
  }

}
