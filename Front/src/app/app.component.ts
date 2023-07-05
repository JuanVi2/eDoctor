import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/', icon: 'archive' },
    { title: 'Mi glucosa', url: '/glucosa', icon: 'bandage' },
    { title: 'Mi alimentación', url: '/alimentacion', icon: 'restaurant' },
    { title: 'Medicos', url: '/medicos', icon: 'heart' },
    { title: 'Mi plan de cuidados', url: '/cuidados', icon: 'create' },
    { title: 'Mensajes', url: '/mensajes', icon: 'mail' },
    // { title: 'Ajustes', url: '/folder/Ajustes', icon: 'settings' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}

}
