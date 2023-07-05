import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuidadoDisplayPageRoutingModule } from './cuidado-display-routing.module';

import { CuidadoDisplayPage } from './cuidado-display.page';
import {GlobalComponentsModule} from "../../modules/global-components/global-components.module";
import {ActividadesListItemComponent} from "../../components/actividades-list-item/actividades-list-item.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuidadoDisplayPageRoutingModule,
    GlobalComponentsModule
  ],
    declarations: [CuidadoDisplayPage, ActividadesListItemComponent]
})
export class CuidadoDisplayPageModule {}
