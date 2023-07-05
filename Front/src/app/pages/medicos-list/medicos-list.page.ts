import { Component, OnInit } from '@angular/core';
import {MedicosService} from '../../services/medicos/medicos.service';

@Component({
  selector: 'app-medicos-list',
  templateUrl: './medicos-list.page.html',
  styleUrls: ['./medicos-list.page.scss'],
})
export class MedicosListPage implements OnInit {

  medicos: any = [];
  filtro = '';

  constructor(private medicosService: MedicosService) { }

  ngOnInit() {
    this.obtenerMedicos();
  }

  obtenerMedicos() {
    this.medicosService.obtenerMedicos().subscribe((value: any) => {
      this.medicos = value.filter((x) => x.nombre.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1);
    });
  }
}
