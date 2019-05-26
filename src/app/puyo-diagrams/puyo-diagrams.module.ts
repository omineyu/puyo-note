import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

import { PuyoDiagramDeleteDialogComponent } from './components/dialogs/puyo-diagram-delete-dialog/puyo-diagram-delete-dialog.component';
import { PuyoDiagramEditorDialogComponent } from './components/dialogs/puyo-diagram-editor-dialog/puyo-diagram-editor-dialog.component';
import { PuyoDiagramListComponent } from './components/puyo-diagram-list/puyo-diagram-list.component';
import { PuyoDiagramListsComponent } from './components/puyo-diagram-lists/puyo-diagram-lists.component';
import { PuyoDiagramComponent } from './components/puyo-diagram/puyo-diagram.component';

@NgModule({
  declarations: [
    PuyoDiagramComponent,
    PuyoDiagramDeleteDialogComponent,
    PuyoDiagramEditorDialogComponent,
    PuyoDiagramListComponent,
    PuyoDiagramListsComponent,
  ],
  entryComponents: [
    PuyoDiagramEditorDialogComponent,
    PuyoDiagramDeleteDialogComponent,
  ],
  exports: [
    PuyoDiagramListsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
  ]
})
export class PuyoDiagramsModule {}
