import {Component, OnInit} from '@angular/core';
import {CitasService} from 'src/app/services/citas/citas.service';
import {TareasService} from "../../services/tareas/tareas.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  bloodData = [
    {
      title: 'PROMEDIO',
      value: '141',
      unit: 'mg/dL',
    },
    {
      title: 'MEJORA',
      value: '62',
      unit: '%',
    }
  ];

  foodData = [
    {
      title: 'CARB. DESAYUNO',
      value: '5',
      unit: 'R/HC',
    },
    {
      title: 'CARB. COMIDA',
      value: '6',
      unit: 'R/HC',
    },
    {
      title: 'CARB. CENA',
      value: '4',
      unit: 'R/HC',
    }
  ];

  citasPendientes: [];
  tareas: [];

  constructor(private citasService: CitasService) { }

  ngOnInit() {
    this.obtenerCitas();
  }

  obtenerCitas() {
    this.citasService.obtenerCitas().subscribe((value: any) => {
      this.citasPendientes = value;
    });
  }
}


