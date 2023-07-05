import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicoDisplayPageRoutingModule } from './medico-display-routing.module';

import { MedicoDisplayPage } from './medico-display.page';
import {GlobalComponentsModule} from '../../modules/global-components/global-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicoDisplayPageRoutingModule,
    GlobalComponentsModule,
  ],
  declarations: [MedicoDisplayPage]
})
export class MedicoDisplayPageModule {}
