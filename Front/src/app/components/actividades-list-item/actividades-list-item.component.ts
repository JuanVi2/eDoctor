import {Component, Input, OnInit} from '@angular/core';
import {Actividad} from '../../model/cuidado';

@Component({
  selector: 'app-actividades-list-item',
  templateUrl: './actividades-list-item.component.html',
  styleUrls: ['./actividades-list-item.component.scss'],
})
export class ActividadesListItemComponent implements OnInit {

  @Input() actividad: Actividad;
  constructor() { }

  ngOnInit() {}

}
