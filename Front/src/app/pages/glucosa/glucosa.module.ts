import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GlucosaPageRoutingModule } from './glucosa-routing.module';

import { GlucosaPage } from './glucosa.page';
import { GlucosaListComponent } from 'src/app/components/glucosa-list/glucosa-list.component';
import { GlobalComponentsModule } from 'src/app/modules/global-components/global-components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GlucosaPageRoutingModule,
    GlobalComponentsModule
  ],
  declarations: [GlucosaPage, GlucosaListComponent]
})
export class GlucosaPageModule {}
