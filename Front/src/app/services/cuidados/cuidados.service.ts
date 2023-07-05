import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cuidado} from '../../model/cuidado';

@Injectable({
  providedIn: 'root'
})
export class CuidadosService {

  constructor(private http: HttpClient) { }

  public obtenerCuidados(): Observable<any> {
    return this.http.get('./assets/data/cuidados.json');
  }

  public obtenerCuidadosPorId(id: number): any {
     this.http.get('./assets/data/cuidados.json').subscribe((cuidados: Cuidado[]) => {
       return cuidados.find((searchedCuidado: Cuidado) => searchedCuidado.id == id);
     }, () => null);
  }
}
