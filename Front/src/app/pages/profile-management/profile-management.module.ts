import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileManagementPageRoutingModule } from './profile-management-routing.module';

import { ProfileManagementPage } from './profile-management.page';
import {GlobalComponentsModule} from "../../modules/global-components/global-components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileManagementPageRoutingModule,
    GlobalComponentsModule
  ],
  declarations: [ProfileManagementPage]
})
export class ProfileManagementPageModule {}
