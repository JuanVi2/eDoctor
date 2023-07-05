import { Component, OnInit } from '@angular/core';
import {CuidadosService} from '../../services/cuidados/cuidados.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cuidados-list',
  templateUrl: './cuidados-list.page.html',
  styleUrls: ['./cuidados-list.page.scss'],
})
export class CuidadosListPage implements OnInit {

  cuidados: any = [];

  constructor(private cuidadosService: CuidadosService, private router: Router) { }

  ngOnInit() {
    this.obtenerCuidados();
  }

  obtenerCuidados() {
    this.cuidadosService.obtenerCuidados().subscribe((value: any) => {
      this.cuidados = value;
      console.log(this.cuidados);
    });
  }

  irPaginaCuidado(id: any) {
    this.router.navigate(['cuidados/' + id]);
  }

}
