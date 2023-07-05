import {Component, Input, OnInit} from '@angular/core';
import {Tarea} from '../../model/tarea';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {

  @Input() tarea: Tarea;

  constructor() { }

  ngOnInit() {}

}
