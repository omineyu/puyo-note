import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { BROWSERS, DeviceDetectorService } from 'ngx-device-detector';

import { settings } from './settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  readonly APP_NAME = settings.APP_NAME;
  readonly APP_VERSION = settings.APP_VERSION;

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

}
