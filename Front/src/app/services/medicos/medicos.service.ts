import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(private http: HttpClient) { }

  public obtenerMedicos(): Observable<any> {
    return this.http.get('./assets/data/medicos.json');
  }
}
