import {Component, Input, OnInit} from '@angular/core';
import {Mensaje} from '../../model/mensaje';

@Component({
  selector: 'app-mensaje-details',
  templateUrl: './mensaje-details.component.html',
  styleUrls: ['./mensaje-details.component.scss'],
})
export class MensajeDetailsComponent implements OnInit {

  @Input() mensaje: Mensaje;
  constructor() { }

  ngOnInit() {}

}
