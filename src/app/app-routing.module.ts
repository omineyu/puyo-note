import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PuyoDiagramListsComponent } from './puyo-diagrams/components/puyo-diagram-lists/puyo-diagram-lists.component';
import { PuyoNoteManualComponent } from './puyo-note-manual/puyo-note-manual/puyo-note-manual.component';

const routes: Routes = [
  { path: '', component: PuyoDiagramListsComponent },
  { path: 'manual', component: PuyoNoteManualComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
