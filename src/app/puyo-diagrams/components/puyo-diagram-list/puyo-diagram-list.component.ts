import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';

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

  @Input() status!: PuyoDiagramStatus;

  puyoDiagrams?: PuyoDiagram[];

  constructor(
    private puyoDiagramService: PuyoDiagramService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getPuyoDiagrams();
  }

  getPuyoDiagrams(): void {
    this.puyoDiagramService.getPuyoDiagrams(this.status).then(
      puyoDiagrams => this.puyoDiagrams = puyoDiagrams,
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

  private stopPuyoDiagrams(): void {
    if (this.puyoDiagrams === undefined) { return; }
    for (const diagram of this.puyoDiagrams) {
      diagram.stop();
    }
  }

  private handleError(error: Error): void {
    this.snackBar.open(String(error), '閉じる');
  }

}
