import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

import { DeviceDetectorModule } from 'ngx-device-detector';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { PuyoDiagramEditorDialogComponent } from 'src/app/components/puyo-diagram-editor-dialog/puyo-diagram-editor-dialog.component';
import { PuyoDiagramDeleteDialogComponent } from 'src/app/components/puyo-diagram-list/puyo-diagram-delete-dialog/puyo-diagram-delete-dialog.component';
import { PuyoDiagramListComponent } from 'src/app/components/puyo-diagram-list/puyo-diagram-list.component';
import { PuyoDiagramComponent } from 'src/app/components/puyo-diagram/puyo-diagram.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    DeviceDetectorModule.forRoot(),
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
  ],
  declarations: [
    AppComponent,
    PuyoDiagramComponent,
    PuyoDiagramDeleteDialogComponent,
    PuyoDiagramEditorDialogComponent,
    PuyoDiagramListComponent,
  ],
  entryComponents: [
    PuyoDiagramEditorDialogComponent,
    PuyoDiagramDeleteDialogComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
