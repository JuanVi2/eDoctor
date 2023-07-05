import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alimentacion-list',
  templateUrl: './alimentacion-list.component.html',
  styleUrls: ['./alimentacion-list.component.scss'],
})
export class AlimentacionListComponent implements OnInit {

  @Input() alimento: any;
  nuevaFecha: any;
  constructor() { }

  ngOnInit() {
    this.nuevaFecha = this.alimento.fecha;
    let partes = this.nuevaFecha.split("-");
    this.nuevaFecha = partes[1] + "/" + partes[0] + "/" + partes[2];
  }

}
