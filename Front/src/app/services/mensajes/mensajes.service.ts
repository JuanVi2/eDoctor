import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(private http: HttpClient) { }

  public obtenerMensajes(): Observable<any> {
    return this.http.get('./assets/data/mensajes.json');
  }
}
