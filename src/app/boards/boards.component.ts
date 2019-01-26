import { Component, OnInit } from '@angular/core';
import { Board } from '../board';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

  board: Board = {
    id: 1,
    name: "ToDo"
  };

  constructor() { }

  ngOnInit() {
  }
}
