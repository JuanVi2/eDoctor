import { Component, Input, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-glucosa-list',
  templateUrl: './glucosa-list.component.html',
  styleUrls: ['./glucosa-list.component.scss'],
})
export class GlucosaListComponent implements OnInit {

  @Input() glucosa: any;
  clase: any;
  constructor(private router: Router) {  }

  ngOnInit() {
    if(this.glucosa.imagen == "medio.png"){
      this.clase = 3;
    } else if(this.glucosa.imagen == "feliz.png"){
      this.clase = 1;
    } else{
      this.clase = 2;
    }
  }

}
