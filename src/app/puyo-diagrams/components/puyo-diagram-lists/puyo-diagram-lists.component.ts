import { Component, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { keyValuesOfEnum } from 'src/app/utils/enum';
import { PuyoDiagramStatus } from '../../models/puyo-diagram-status';
import { PuyoDiagramListComponent } from '../puyo-diagram-list/puyo-diagram-list.component';

/**
 * ぷよ図一覧を、ステータスごとにタブで切り替えて表示するコンポーネント。
 *
 * パフォーマンスのため、単一のぷよ図一覧のコンポーネントを使い回す。
 */
@Component({
  selector: 'app-puyo-diagram-lists',
  templateUrl: './puyo-diagram-lists.component.html',
  styleUrls: ['./puyo-diagram-lists.component.scss']
})
export class PuyoDiagramListsComponent {

  /**
   * ぷよ図ステータス一覧(Key-Value形式)。
   */
  readonly STATUSES = keyValuesOfEnum(PuyoDiagramStatus);

  /**
   * 選択中のぷよ図ステータス。
   */
  status = PuyoDiagramStatus.ToDo;

  /**
   * ぷよ図一覧のコンポーネント。
   */
  @ViewChild(PuyoDiagramListComponent, { static: true }) private puyoDiagramListComponent!: PuyoDiagramListComponent;

  /**
   * タブを切り替える。
   *
   * @param event タブ切り替えイベント
   */
  changeTab(event: MatTabChangeEvent): void {
    const status = this.STATUSES[event.index].value;
    this.puyoDiagramListComponent.status = status;
    this.puyoDiagramListComponent.pageIndex = 0;
    this.puyoDiagramListComponent.getPuyoDiagrams();
  }

}
