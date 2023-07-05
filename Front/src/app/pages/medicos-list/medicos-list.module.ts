import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicosListPageRoutingModule } from './medicos-list-routing.module';

import { MedicosListPage } from './medicos-list.page';
import { MedicosListItemComponent } from 'src/app/components/medicos-list-item/medicos-list-item.component';
import {GlobalComponentsModule} from '../../modules/global-components/global-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicosListPageRoutingModule,
    GlobalComponentsModule,
  ],
  declarations: [MedicosListPage, MedicosListItemComponent]
})
export class MedicosListPageModule {}
