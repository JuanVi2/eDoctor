import {Component, OnInit} from '@angular/core';
import {TareasService} from '../../services/tareas/tareas.service';
import {ModalController} from '@ionic/angular';
import {TaskDetailsComponent} from '../task-details/task-details.component';
import {Tarea} from '../../model/tarea';
import {NewTaskFormComponent} from "../new-task-form/new-task-form.component";

@Component({
  selector: 'app-tarea-card',
  templateUrl: './tarea-card.component.html',
  styleUrls: ['./tarea-card.component.scss'],
})
export class TareaCardComponent implements OnInit {

  tareas: Tarea[];

  constructor(private tareasService: TareasService, private modalController: ModalController) {
  }

  ngOnInit() {
    this.obtenerTareas();
  }

  obtenerTareas() {
    this.tareasService.obtenerTareas().subscribe((value: Tarea[]) => {
      this.tareas = value;
    });
  }

  async showDetailsModal(task: Tarea) {
    const modal = await this.modalController.create({
      component: TaskDetailsComponent,
      componentProps: {tarea: task},
      initialBreakpoint: 0.6,
      breakpoints: [0, 0.6]
    });
    return await modal.present();
  }

  async showNewTaskForm() {
    const modal = await this.modalController.create({
      component: NewTaskFormComponent,
      canDismiss: true,
    });
    return await modal.present();
  }

  changeTaskStatus(taskId: number, status: string) {
    const objectIndex = this.tareas.findIndex((task => task.id === taskId));
    this.tareas[objectIndex].status = status;
  }

}
