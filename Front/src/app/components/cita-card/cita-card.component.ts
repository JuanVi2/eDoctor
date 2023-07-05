import {Component, Input, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-cita-card',
  templateUrl: './cita-card.component.html',
  styleUrls: ['./cita-card.component.scss'],
})
export class CitaCardComponent implements OnInit {

  @Input() cardTitle = 'Default card title';
  @Input() titleColor = '#000000';
  @Input() cardInfo = 'Default card info';

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {}

  async createAlert() {
    const alert = await this.alertCtrl.create({
      message: 'Se te notificará el día anterior a tu cita',
      buttons: ['De acuerdo']
    });
    await alert.present();
  }

}
