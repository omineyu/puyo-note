import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { BROWSERS, DeviceDetectorService } from 'ngx-device-detector';

import { settings } from './settings';

/**
 * アプリケーションのルートコンポーネント。
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * アプリケーション名。
   */
  readonly APP_NAME = settings.APP_NAME;

  /**
   * アプリケーションバージョン。
   */
  readonly APP_VERSION = settings.APP_VERSION;

  /**
   * アプリケーションURL。
   */
  readonly APP_URL = settings.APP_URL;

  /**
   * AppComponentを作成する。
   *
   * @param title Title
   * @param deviceService DeviceDetectorService
   */
  constructor(
    private title: Title,
    private deviceService: DeviceDetectorService
  ) {}

  ngOnInit() {

    // 動作環境を検証
    this.validateEnvironment();

    // ページタイトルを設定
    this.title.setTitle(settings.APP_NAME);
  }

  /**
   * 動作環境を検証する。
   *
   * 動作環境が以下の条件を満たすことを検証し、満たさない場合はアラートを出す。
   *
   * - モバイル端末でないこと。
   * - ブラウザがGoogle Chromeであること。
   */
  private validateEnvironment(): void {
    if (this.deviceService.isMobile() || this.deviceService.isTablet()) {
      alert('注: モバイル端末は動作対象外です。');
    }
    if (this.deviceService.browser !== BROWSERS.CHROME) {
      alert('注: Google Chrome以外のブラウザは動作対象外です。');
    }
  }

  /**
   * アプリケーションがデプロイされたドメインが正しいものであるか検証する。
   *
   * - 本アプリケーションはIndexedDBを使用しているため、
   *   ドメインが変わるとデータの保存先が変わってしまう。
   *   このためドメインが正しいことを検証する必要がある。
   */
  isValidDomain(): boolean {
    const validDomains = [
      settings.APP_DOMAIN,
      'localhost' // 開発用としてlocalhostも許可
    ];
    return validDomains.includes(document.domain);
  }

}
