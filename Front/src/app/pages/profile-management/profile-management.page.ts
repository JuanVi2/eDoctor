import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../model/usuario';
import {UserService} from '../../services/user/user.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.page.html',
  styleUrls: ['./profile-management.page.scss'],
})
export class ProfileManagementPage implements OnInit {

  currentUser: Usuario = new Usuario();

  constructor(private userService: UserService, private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this.userService.getCurrentUser().subscribe((value: Usuario) => {
      this.currentUser = value;
    });
  }

  showHidePass() {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const input = (<HTMLInputElement>document.getElementById('password-input'));
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }

  switchVisibilidad(visibilidad: string) {
    this.currentUser.privacy = visibilidad;
  }

  async saveChangesAlert() {
    const alert = await this.alertCtrl.create({
      message: 'Los cambios se han guardado correctamente',
      buttons: ['De acuerdo']
    });
    await alert.present();
    await alert.onDidDismiss();
    window.location.href='/';
  }
}
