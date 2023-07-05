import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {MedicosService} from '../../services/medicos/medicos.service';
import {Medico} from '../../model/medico';
import {Paciente} from "../../model/paciente";
import {PacientesService} from "../../services/pacientes/pacientes.service";

@Component({
  selector: 'app-new-mensaje-form',
  templateUrl: './new-mensaje-form.component.html',
  styleUrls: ['./new-mensaje-form.component.scss'],
})
export class NewMensajeFormComponent implements OnInit {

  medicos: Medico[];
  pacientes: Paciente[];

  newMensaje: any;

  constructor(private modalController: ModalController,
              private medicosService: MedicosService,
              private pacientesService: PacientesService) { }

  ngOnInit() {
    this.obtenerMedicos();
    this.obtenerPacientes();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  obtenerMedicos() {
    this.medicosService.obtenerMedicos().subscribe((value: Medico[]) => {
      this.medicos = value.filter((medico: Medico) => medico.esMiMedico);
      console.log(value);
    });
  }

  obtenerPacientes() {
    this.pacientesService.obtenerPacientes().subscribe((value: Paciente[]) => {
      this.pacientes = value;
      console.log(value);
    });
  }

}
