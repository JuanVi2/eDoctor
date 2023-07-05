import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicoDisplayPage } from './medico-display.page';

const routes: Routes = [
  {
    path: '',
    component: MedicoDisplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicoDisplayPageRoutingModule {}
