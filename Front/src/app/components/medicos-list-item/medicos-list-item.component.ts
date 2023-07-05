import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-medicos-list-item',
  templateUrl: './medicos-list-item.component.html',
  styleUrls: ['./medicos-list-item.component.scss'],
})
export class MedicosListItemComponent implements OnInit {

  @Input() medico: any;
  constructor(private router: Router, public alertController: AlertController) { }

  ngOnInit() {}

  cambiarMedico(){
    if(this.medico.esMiMedico) {
      this.alertaBorrarMedico();
    }
    else {
      this.medico.esMiMedico = !this.medico.esMiMedico;
    }
  }

  async alertaBorrarMedico() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta!',
      message: '¿Seguro que deseas eliminar a este medico de tu lista de medicos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button'
        }, {
          text: 'SÍ',
          id: 'confirm-button',
          handler: () => {
            this.medico.esMiMedico = !this.medico.esMiMedico;
          }
        }
      ]
    });

    await alert.present();
  }

  navigateToVerMedico(id: any) {
    this.router.navigate(['medicos/' + id]);
  }

}
