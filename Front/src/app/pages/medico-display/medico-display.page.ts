import {Component, OnInit} from '@angular/core';
import {Medico} from '../../model/medico';
import {ActivatedRoute} from '@angular/router';
import {MedicosService} from '../../services/medicos/medicos.service';

@Component({
  selector: 'app-medico-display',
  templateUrl: './medico-display.page.html',
  styleUrls: ['./medico-display.page.scss'],
})
export class MedicoDisplayPage implements OnInit {

  idMedico: number;
  medico: Medico = new Medico();

  constructor(private activedRoute: ActivatedRoute,
              private medicoService: MedicosService) {
  }

  ngOnInit() {
    this.idMedico = Number(this.activedRoute.snapshot.paramMap.get('idMedico'));

    this.medicoService.obtenerMedicos().subscribe((medicos: Medico[]) => {
      this.medico = medicos.find((searchedMed: Medico) => searchedMed.id === this.idMedico);
    });
  }

}
