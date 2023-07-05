import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from 'src/app/components/base-layout/base-layout.component';
import {IonicModule} from '@ionic/angular';
import { GenericCardComponent } from 'src/app/components/generic-card/generic-card.component';
import {CitaCardComponent} from '../../components/cita-card/cita-card.component';
import { TareaCardComponent } from 'src/app/components/tarea-card/tarea-card.component';
import {TaskDetailsComponent} from "../../components/task-details/task-details.component";



@NgModule({
  declarations: [BaseLayoutComponent, GenericCardComponent, CitaCardComponent, TareaCardComponent, TaskDetailsComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    BaseLayoutComponent,
    GenericCardComponent,
    CitaCardComponent,
    TareaCardComponent,
  ]
})
export class GlobalComponentsModule { }
