import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private http: HttpClient) { }

  public obtenerTareas(): Observable<any> {
    return this.http.get('./assets/data/tareas.json');
  }

}
