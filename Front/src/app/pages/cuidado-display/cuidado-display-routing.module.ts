import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuidadoDisplayPage } from './cuidado-display.page';

const routes: Routes = [
  {
    path: '',
    component: CuidadoDisplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuidadoDisplayPageRoutingModule {}
