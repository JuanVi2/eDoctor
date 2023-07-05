import { Component, OnInit } from '@angular/core';
import { GlucosaService } from 'src/app/services/glucosa/glucosa.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-glucosa',
  templateUrl: './glucosa.page.html',
  styleUrls: ['./glucosa.page.scss'],
})
export class GlucosaPage implements OnInit {

  glucosas: any = [];
  glucosaInput: String = "";
  constructor( private glucosaService: GlucosaService, public alertController: AlertController) { }

  ngOnInit() {
    this.obtenerGlucosa();
  }

  obtenerGlucosa(){
    this.glucosaService.obtenerGlucosa().subscribe((value: any) => {
      this.glucosas = value;
    });
  }

  async alertaGlucosa(){
    if(this.glucosaInput == ""){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error!',
        message: 'Debes introducir el nivel de glucosa',
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
        message: 'Nivel de glucosa añadido correctamente',
        buttons: [
           {
            text: 'Ok',
            id: 'confirm-button'
          }
        ]
      });
  
      await alert.present();
    }
    
    this.glucosaInput = "";
  }

}
