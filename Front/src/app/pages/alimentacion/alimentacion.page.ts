import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import { AlimentacionService } from 'src/app/services/alimentacion/alimentacion.service';
import * as moment from 'moment';

@Component({
  selector: 'app-alimentacion',
  templateUrl: './alimentacion.page.html',
  styleUrls: ['./alimentacion.page.scss'],
})
export class AlimentacionPage implements OnInit {

  raciones: any = "";
  cantidad: any = "";
  desde: any = "";
  hasta: any = "";
  alimentos: any = [];
  constructor(private alimentacionService: AlimentacionService ,public alertController: AlertController) { }

  ngOnInit() {
    this.raciones = 1;
    this.obtenerHistorial();
  }


  public toMs(fechas) {
    let partes = fechas.split("-");
    return new Date(partes[2], partes[1] - 1, partes[0]).getTime();
  }

  obtenerHistorial(){
    this.alimentacionService.obtenerAlimentos().subscribe((value: any) => {
      this.alimentos = value;
    })
  }

  async obtenerHistorialFiltrado(){
    if(this.desde !== "" && this.hasta !== ""){
      
      this.alimentacionService.obtenerAlimentos().subscribe((value: any) => {
        this.alimentos = value.filter(a => moment(a.fecha).format('L') >= moment(this.desde).format('L') && moment(a.fecha).format('L') <= moment(this.hasta).format('L'));
      })
    } else {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error!',
        message: 'Debes introducir las fechas para realizar la búsqueda',
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

  async anyadir(){
    if(this.cantidad == ""){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error!',
        message: 'Debes poner una cantidad',
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
        header: 'Alerta!',
        message: 'Alimento añadido correctamente',
        buttons: [
           {
            text: 'Ok',
            id: 'confirm-button'
          }
        ]
      });
      await alert.present();
    }
    

    
    this.raciones = "1";
    this.cantidad = "";
  }
}
