import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CuidadosService} from '../../services/cuidados/cuidados.service';
import {Actividad, Anotacion, Cuidado} from '../../model/cuidado';
import {ActividadesListItemComponent} from '../../components/actividades-list-item/actividades-list-item.component';
import {AlertController, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-cuidado-display',
  templateUrl: './cuidado-display.page.html',
  styleUrls: ['./cuidado-display.page.scss'],
})
export class CuidadoDisplayPage implements OnInit {

  idCuidado: any;
  cuidado: Cuidado = new Cuidado();
  cuidadoInput: string;

  constructor(private activedRoute: ActivatedRoute,
              private cuidadosService: CuidadosService,
              private modalController: ModalController,
              private alertController: AlertController) { }

  ngOnInit() {
    this.idCuidado = this.activedRoute.snapshot.paramMap.get('idCuidado');
    //this.cuidado = this.cuidadosService.obtenerCuidadosPorId(this.idCuidado);
    this.cuidadosService.obtenerCuidados().subscribe((cuidados: Cuidado[]) => {
      this.cuidado =  cuidados.find((searchedCuidado: Cuidado) => searchedCuidado.id == this.idCuidado);
      console.log(this.cuidado);
    });
  }

  async showDetailsModal(actividad: Actividad) {
    const modal = await this.modalController.create({
      component: ActividadesListItemComponent,
      componentProps: {actividad},
      initialBreakpoint: 0.6,
      breakpoints: [0, 0.6]
    });
    return await modal.present();
  }

  async alertaAnotacion() {
    if(!this.cuidadoInput){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error!',
        message: 'Debes introducir un texto para la anotación',
        buttons: [
          {
            text: 'Ok',
            id: 'confirm-button'
          }
        ]
      });

      await alert.present();
    } else {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Perfecto!',
        message: 'Anotación añadida correctamente',
        buttons: [
          {
            text: 'Ok',
            id: 'confirm-button'
          }
        ]
      });
      await alert.present();
    }
  }
}
