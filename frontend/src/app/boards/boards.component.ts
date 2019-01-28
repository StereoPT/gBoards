import { Component, OnInit } from '@angular/core';

import { Board } from '../board';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

  selectedBoard: Board;
  boards: Board[];

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.getBoards();
  }

  onSelect(board: Board): void {
    this.selectedBoard = board;
  }

  getBoards(): void {
    this.boardService.getBoards().subscribe(boards => this.boards = boards);
  }
}
