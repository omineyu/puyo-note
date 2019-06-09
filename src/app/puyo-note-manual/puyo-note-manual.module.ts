import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from '../app-routing.module';

import { PuyoNoteManualComponent } from './puyo-note-manual/puyo-note-manual.component';

@NgModule({
  declarations: [
    PuyoNoteManualComponent,
  ],
  exports: [
    PuyoNoteManualComponent,
  ],
  imports: [
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class PuyoNoteManualModule { }
