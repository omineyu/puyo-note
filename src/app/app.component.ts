import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { Title } from '@angular/platform-browser';

import { BROWSERS, DeviceDetectorService } from 'ngx-device-detector';

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

  constructor(
    private title: Title,
    private deviceService: DeviceDetectorService
  ) {}

  ngOnInit() {
    this.checkBrowser();
    this.title.setTitle(settings.APP_NAME);
  }

  private checkBrowser() {
    const deviceInfo = this.deviceService.getDeviceInfo();
    if (deviceInfo.browser !== BROWSERS.CHROME) {
      alert('注: Google Chrome以外のブラウザーは動作対象外です。');
    }
  }

  reloadTab(event: MatTabChangeEvent): void {
    const status = this.STATUSES[event.index].value;
    this.puyoDiagramListComponents
      .filter(component => component.status === status)
      .forEach(component => component.getPuyoDiagrams());
  }

}
