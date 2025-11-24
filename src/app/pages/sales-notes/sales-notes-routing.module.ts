import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesNotesPage } from './sales-notes.page';

const routes: Routes = [
  {
    path: '',
    component: SalesNotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesNotesPageRoutingModule {}
