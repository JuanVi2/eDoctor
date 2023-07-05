import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuidadosListPageRoutingModule } from './cuidados-list-routing.module';

import { CuidadosListPage } from './cuidados-list.page';
import {GlobalComponentsModule} from "../../modules/global-components/global-components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuidadosListPageRoutingModule,
    GlobalComponentsModule
  ],
  declarations: [CuidadosListPage]
})
export class CuidadosListPageModule {}
