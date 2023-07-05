import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'medicos',
    loadChildren: () => import('./pages/medicos-list/medicos-list.module').then(m => m.MedicosListPageModule)
  },
  {
    path: 'glucosa',
    loadChildren: () => import('./pages/glucosa/glucosa.module').then( m => m.GlucosaPageModule)
  },
  {
    path: 'alimentacion',
    loadChildren: () => import('./pages/alimentacion/alimentacion.module').then( m => m.AlimentacionPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile-management/profile-management.module').then( m => m.ProfileManagementPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cuidados',
    loadChildren: () => import('./pages/cuidados-list/cuidados-list.module').then( m => m.CuidadosListPageModule)
  },
  {
    path: 'mensajes',
    loadChildren: () => import('./pages/mensajes-list/mensajes-list.module').then( m => m.MensajesListPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
