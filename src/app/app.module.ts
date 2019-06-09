import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DeviceDetectorModule } from 'ngx-device-detector';

import { AppRoutingModule } from './app-routing.module';
import { PuyoDiagramsModule } from './puyo-diagrams/puyo-diagrams.module';
import { PuyoNoteManualModule } from './puyo-note-manual/puyo-note-manual.module';

import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    DeviceDetectorModule.forRoot(),
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    PuyoDiagramsModule,
    PuyoNoteManualModule,
  ],
})
export class AppModule {}
