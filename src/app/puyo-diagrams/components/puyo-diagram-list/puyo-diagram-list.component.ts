import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';

import { keyValuesOfEnum } from 'src/app/utils/enum';
import { PuyoDiagram } from '../../models/puyo-diagram';
import { PuyoDiagramStatus } from '../../models/puyo-diagram-status';
import { PuyoDiagramService } from '../../services/puyo-diagram.service';
import { PuyoDiagramDeleteDialogComponent } from '../dialogs/puyo-diagram-delete-dialog/puyo-diagram-delete-dialog.component';
import { PuyoDiagramEditorDialogComponent } from '../dialogs/puyo-diagram-editor-dialog/puyo-diagram-editor-dialog.component';

@Component({
  selector: 'app-puyo-diagram-list',
  templateUrl: './puyo-diagram-list.component.html',
  styleUrls: ['./puyo-diagram-list.component.scss']
})
export class PuyoDiagramListComponent implements OnInit {

  readonly STATUSES = keyValuesOfEnum(PuyoDiagramStatus);
  readonly PAGE_SIZE_OPTIONS: ReadonlyArray<number> = [4, 8, 12];

  @Input() status!: PuyoDiagramStatus;

  puyoDiagrams?: PuyoDiagram[];

  numPuyoDiagrams = 0;
  numPuyoDiagramsPerPage = 8;
  pageIndex = 0;

  constructor(
    private puyoDiagramService: PuyoDiagramService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getPuyoDiagrams();
  }

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

  addPuyoDiagram(puyoDiagram: PuyoDiagram): void {
    const addPuyoDiagram = this.puyoDiagramService.addPuyoDiagram(puyoDiagram);
    this.callAndReload(addPuyoDiagram);
  }

  updatePuyoDiagram(puyoDiagram: PuyoDiagram): void {
    const updatePuyoDiagram = this.puyoDiagramService.updatePuyoDiagram(puyoDiagram);
    this.callAndReload(updatePuyoDiagram);
  }

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

  openCreateDialog(): void {
    this.stopPuyoDiagrams();
    const emptyDiagram = new PuyoDiagram(undefined, '', this.status);
    const dialogConfig = {data: emptyDiagram, autoFocus: false, disableClose: true};
    const dialogRef = this.dialog.open(PuyoDiagramEditorDialogComponent, dialogConfig);
    const afterClosed = (diagram?: PuyoDiagram) => { if (diagram) { diagram.stop(); this.addPuyoDiagram(diagram); } };
    dialogRef.afterClosed().subscribe(afterClosed);
  }

  openUpdateDialog(puyoDiagram: PuyoDiagram): void {
    this.stopPuyoDiagrams();
    const dialogConfig = {data: puyoDiagram, autoFocus: false, disableClose: true};
    const dialogRef = this.dialog.open(PuyoDiagramEditorDialogComponent, dialogConfig);
    const afterClosed = (diagram?: PuyoDiagram) => { if (diagram) { diagram.stop(); this.updatePuyoDiagram(diagram); } };
    dialogRef.afterClosed().subscribe(afterClosed);
  }

  openDeleteDialog(puyoDiagram: PuyoDiagram): void {
    this.stopPuyoDiagrams();
    const dialogConfig = {data: puyoDiagram};
    const dialogRef = this.dialog.open(PuyoDiagramDeleteDialogComponent, dialogConfig);
    const afterClosed = (diagram?: PuyoDiagram) => { if (diagram) { this.deletePuyoDiagram(diagram); } };
    dialogRef.afterClosed().subscribe(afterClosed);
  }

  clickPlayerButton(puyoDiagram: PuyoDiagram): void {
    if (puyoDiagram.isPlaying()) {
      puyoDiagram.stop();
    } else {
      this.stopPuyoDiagrams();
      puyoDiagram.play();
    }
  }

  playerButtonIcon(puyoDiagram: PuyoDiagram): string {
    return puyoDiagram.isPlaying() ? 'stop' : 'play_arrow';
  }

  private stopPuyoDiagrams(): void {
    if (this.puyoDiagrams === undefined) { return; }
    for (const diagram of this.puyoDiagrams) {
      diagram.stop();
    }
  }

  changePage(pageEvent: PageEvent): void {
    this.numPuyoDiagramsPerPage = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.getPuyoDiagrams();
  }

  private handleError(error: Error): void {
    this.snackBar.open(String(error), '閉じる');
  }

}
