import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuidadosListPage } from './cuidados-list.page';

const routes: Routes = [
  {
    path: '',
    component: CuidadosListPage
  },
  {
    path: ':idCuidado',
    loadChildren: () => import('../cuidado-display/cuidado-display.module').then(m => m.CuidadoDisplayPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuidadosListPageRoutingModule {}
