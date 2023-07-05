import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MensajesListPageRoutingModule } from './mensajes-list-routing.module';

import { MensajesListPage } from './mensajes-list.page';
import {GlobalComponentsModule} from '../../modules/global-components/global-components.module';
import {MensajeCardComponent} from '../../components/mensaje-card/mensaje-card.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MensajesListPageRoutingModule,
        GlobalComponentsModule
    ],
  declarations: [MensajesListPage, MensajeCardComponent]
})
export class MensajesListPageModule {}
