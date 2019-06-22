import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

import { keyValuesOfEnum } from 'src/app/utils/enum';
import { PuyoDiagram } from '../../models/puyo-diagram';
import { PuyoDiagramStatus } from '../../models/puyo-diagram-status';
import { PuyoDiagramService } from '../../services/puyo-diagram.service';
import { PuyoDiagramDeleteDialogComponent } from '../dialogs/puyo-diagram-delete-dialog/puyo-diagram-delete-dialog.component';
import { PuyoDiagramEditorDialogComponent } from '../dialogs/puyo-diagram-editor-dialog/puyo-diagram-editor-dialog.component';

/**
 * ぷよ図一覧のコンポーネント。
 *
 * 対象のステータスのぷよ図一覧を表示する。
 */
@Component({
  selector: 'app-puyo-diagram-list',
  templateUrl: './puyo-diagram-list.component.html',
  styleUrls: ['./puyo-diagram-list.component.scss']
})
export class PuyoDiagramListComponent implements OnInit {

  /**
   * ぷよ図ステータス一覧(Key-Value形式)。
   */
  readonly STATUSES = keyValuesOfEnum(PuyoDiagramStatus);

  /**
   * ページサイズオプション。
   */
  readonly PAGE_SIZE_OPTIONS: ReadonlyArray<number> = [4, 8, 12];

  /**
   * ぷよ図ステータス。
   */
  @Input() status!: PuyoDiagramStatus;

  /**
   * ぷよ図一覧。
   *
   * 現在のページに表示する分のみを保持する。
   */
  puyoDiagrams?: PuyoDiagram[];

  /**
   * ぷよ図の数(全ページ分)。
   */
  numPuyoDiagrams = 0;

  /**
   * 1ページあたりのぷよ図の数。
   */

  numPuyoDiagramsPerPage = 8;

  /**
   * ページインデックス。
   */
  pageIndex = 0;

  /**
   * PuyoDiagramListComponentを作成する。
   *
   * @param puyoDiagramService ぷよ図サービス
   * @param dialog ダイアログ
   * @param snackBar スナックバー
   */
  constructor(
    private puyoDiagramService: PuyoDiagramService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getPuyoDiagrams();
  }

  /**
   * 現在のページに対応するぷよ図一覧を取得する。
   *
   * - 全ページ分のぷよ図の数もあわせて取得する。
   */
  getPuyoDiagrams(): void {

    const getPuyoDiagrams = this.puyoDiagramService.getPuyoDiagrams(
      this.status, this.pageIndex * this.numPuyoDiagramsPerPage, this.numPuyoDiagramsPerPage
    );

    const getNumPuyoDiagrams = this.puyoDiagramService.getNumPuyoDiagrams(this.status);

    Promise.all(
      [getPuyoDiagrams, getNumPuyoDiagrams]
    ).then(
      ([puyoDiagrams, numPuyoDiagrams]) => {
        this.puyoDiagrams = puyoDiagrams;
        this.numPuyoDiagrams = numPuyoDiagrams;
      }
    ).catch(
      error => this.handleError(error)
    );
  }

  /**
   * ぷよ図を追加する。
   *
   * @param puyoDiagram ぷよ図
   */
  addPuyoDiagram(puyoDiagram: PuyoDiagram): void {
    const addPuyoDiagram = this.puyoDiagramService.addPuyoDiagram(puyoDiagram);
    this.callAndReload(addPuyoDiagram);
  }

  /**
   * ぷよ図を更新する。
   *
   * @param puyoDiagram ぷよ図
   */
  updatePuyoDiagram(puyoDiagram: PuyoDiagram): void {
    const updatePuyoDiagram = this.puyoDiagramService.updatePuyoDiagram(puyoDiagram);
    this.callAndReload(updatePuyoDiagram);
  }

  /**
   * ぷよ図を削除する。
   *
   * @param puyoDiagram ぷよ図
   */
  deletePuyoDiagram(puyoDiagram: PuyoDiagram): void {
    const deletePuyoDiagram = this.puyoDiagramService.deletePuyoDiagram(puyoDiagram);
    this.callAndReload(deletePuyoDiagram);
  }

  private callAndReload(puyoDiagramApi: Promise<any>): void {
    this.puyoDiagrams = undefined;
    puyoDiagramApi.then(
      _ => this.getPuyoDiagrams()
    ).catch(
      error => this.handleError(error)
    );
  }

  /**
   * ぷよ図作成用のぷよ図エディターダイアログを開く。
   */
  openCreateDialog(): void {
    this.stopPuyoDiagrams();
    const emptyDiagram = new PuyoDiagram(undefined, '', this.status);
    const dialogConfig = {data: emptyDiagram, autoFocus: false, disableClose: true};
    const dialogRef = this.dialog.open(PuyoDiagramEditorDialogComponent, dialogConfig);
    const afterClosed = (diagram?: PuyoDiagram) => { if (diagram) { diagram.stop(); this.addPuyoDiagram(diagram); } };
    dialogRef.afterClosed().subscribe(afterClosed);
  }

  /**
   * ぷよ図更新用のぷよ図エディターダイアログを開く。
   *
   * @param puyoDiagram ぷよ図
   */
  openUpdateDialog(puyoDiagram: PuyoDiagram): void {
    this.stopPuyoDiagrams();
    const dialogConfig = {data: puyoDiagram, autoFocus: false, disableClose: true};
    const dialogRef = this.dialog.open(PuyoDiagramEditorDialogComponent, dialogConfig);
    const afterClosed = (diagram?: PuyoDiagram) => { if (diagram) { diagram.stop(); this.updatePuyoDiagram(diagram); } };
    dialogRef.afterClosed().subscribe(afterClosed);
  }

  /**
   * ぷよ図削除ダイアログを開く。
   *
   * @param puyoDiagram ぷよ図
   */
  openDeleteDialog(puyoDiagram: PuyoDiagram): void {
    this.stopPuyoDiagrams();
    const dialogConfig = {data: puyoDiagram};
    const dialogRef = this.dialog.open(PuyoDiagramDeleteDialogComponent, dialogConfig);
    const afterClosed = (diagram?: PuyoDiagram) => { if (diagram) { this.deletePuyoDiagram(diagram); } };
    dialogRef.afterClosed().subscribe(afterClosed);
  }

  /**
   * プレイヤーボタンをクリックしたときの処理。
   *
   * ぷよ図の再生と停止を切り替える。
   * ぷよ図再生時は他のぷよ図を停止する。
   *
   * @param puyoDiagram ぷよ図
   */
  clickPlayerButton(puyoDiagram: PuyoDiagram): void {
    if (puyoDiagram.isPlaying()) {
      puyoDiagram.stop();
    } else {
      this.stopPuyoDiagrams();
      puyoDiagram.play();
    }
  }

  /**
   * プレイヤーボタンのマテリアルアイコン名を取得する。
   *
   * - ぷよ図が再生中ならば、停止を表すマテリアルアイコン名を返す。
   * - ぷよ図が停止中ならば、再生を表すマテリアルアイコン名を返す。
   *
   * @param puyoDiagram ぷよ図
   * @returns マテリアルアイコン名
   */
  playerButtonIcon(puyoDiagram: PuyoDiagram): string {
    return puyoDiagram.isPlaying() ? 'stop' : 'play_arrow';
  }

  private stopPuyoDiagrams(): void {
    if (this.puyoDiagrams === undefined) { return; }
    for (const diagram of this.puyoDiagrams) {
      diagram.stop();
    }
  }

  /**
   * ページを切り替える。
   *
   * @param pageEvent ページイベント
   */
  changePage(pageEvent: PageEvent): void {
    this.numPuyoDiagramsPerPage = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.getPuyoDiagrams();
  }

  private handleError(error: Error): void {
    this.snackBar.open(String(error), '閉じる');
  }

}
