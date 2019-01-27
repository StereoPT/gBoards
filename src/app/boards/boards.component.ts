import { Component, OnInit } from '@angular/core';

import { Board } from '../board';
import { BOARDS } from '../mock-boards';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

  boards = BOARDS;
  selectedBoard: Board;

  constructor() { }

  ngOnInit() {
  }

  onSelect(board: Board): void {
    this.selectedBoard = board;
  }
}
