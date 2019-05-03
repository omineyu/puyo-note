import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PuyoDiagramListComponent } from 'src/app/components/puyo-diagram-list/puyo-diagram-list.component';

const routes: Routes = [
  { path: '', component: PuyoDiagramListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
