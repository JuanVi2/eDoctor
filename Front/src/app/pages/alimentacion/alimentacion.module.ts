import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlimentacionPageRoutingModule } from './alimentacion-routing.module';

import { AlimentacionPage } from './alimentacion.page';
import { GlobalComponentsModule } from 'src/app/modules/global-components/global-components.module';
import { AlimentacionListComponent } from 'src/app/components/alimentacion-list/alimentacion-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlimentacionPageRoutingModule,
    GlobalComponentsModule
  ],
  declarations: [AlimentacionPage, AlimentacionListComponent]
})
export class AlimentacionPageModule {}
