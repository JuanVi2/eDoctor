import {Component, Input, OnInit} from '@angular/core';
@Component({
  selector: 'app-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.scss'],
})
export class GenericCardComponent implements OnInit {

  @Input() cardTitle = 'Default card title';
  @Input() titleColor = '#000000';
  @Input() dataToShow = [];

  constructor() { }

  ngOnInit() {}

}
