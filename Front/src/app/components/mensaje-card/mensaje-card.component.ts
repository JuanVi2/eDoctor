import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Mensaje} from '../../model/mensaje';
import {MensajeDetailsComponent} from '../mensaje-details/mensaje-details.component';
import {ModalController} from '@ionic/angular';
import {NewMensajeFormComponent} from '../new-mensaje-form/new-mensaje-form.component';

@Component({
  selector: 'app-mensaje-card',
  templateUrl: './mensaje-card.component.html',
  styleUrls: ['./mensaje-card.component.scss'],
})
export class MensajeCardComponent implements OnInit, OnChanges {

  @Input() mensajes: Array<Mensaje>;
  @Input() titulo: string;
  @Input() tipo: number;
  visible = true;
  @Output() borrarEvento: EventEmitter<Mensaje> = new EventEmitter<Mensaje>();

  constructor(private modalController: ModalController) { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.mensajes.isFirstChange()){
      this.mensajes = changes.mensajes.currentValue;
    }
  }

  ngOnInit() {}

  async showDetailsModal(mensaje: Mensaje) {
    const modal = await this.modalController.create({
      component: MensajeDetailsComponent,
      componentProps: {mensaje},
      initialBreakpoint: 0.6,
      breakpoints: [0, 0.6]
    });
    return await modal.present();
  }

  esconderMensajes(){
    this.visible = !this.visible;
  }

  borrarMensaje(mensaje: Mensaje) {
    this.mensajes = this.mensajes.filter((msg: Mensaje) => msg.id !== mensaje.id);
    this.borrarEvento.emit(mensaje);
  }

  async showNewMensajeForm() {
    const modal = await this.modalController.create({
      component: NewMensajeFormComponent,
      canDismiss: true,
    });
    return await modal.present();
  }
}
