import { Component, OnInit } from '@angular/core';
import {MensajesService} from '../../services/mensajes/mensajes.service';
import {Mensaje} from '../../model/mensaje';
import {NewMensajeFormComponent} from '../../components/new-mensaje-form/new-mensaje-form.component';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-mensajes-list',
  templateUrl: './mensajes-list.page.html',
  styleUrls: ['./mensajes-list.page.scss'],
})
export class MensajesListPage implements OnInit {
  mensajesEnviados: Array<Mensaje>;
  mensajesRecibidos: Array<Mensaje>;
  mensajesBorrados: Array<Mensaje>;

  constructor(private mensajesService: MensajesService, private modalController: ModalController) { }

  ngOnInit() {
    this.obtenerMensajes();
  }

  obtenerMensajes() {
    this.mensajesService.obtenerMensajes().subscribe((value: Array<Mensaje>) => {
      this.mensajesEnviados = value.filter((searchedMsg: Mensaje) => searchedMsg.tipo === 0);
      this.mensajesRecibidos = value.filter((searchedMsg: Mensaje) => searchedMsg.tipo === 1);
      this.mensajesBorrados = value.filter((searchedMsg: Mensaje) => searchedMsg.tipo === 2);
      console.log(this.mensajesEnviados);
      console.log(value);
    });
  }
  async showNewMensajeForm() {
    const modal = await this.modalController.create({
      component: NewMensajeFormComponent,
      canDismiss: true,
    });
    return await modal.present();
  }

  borrarMensaje(mensaje: Mensaje) {
    this.mensajesBorrados.push(mensaje);
  }
}
