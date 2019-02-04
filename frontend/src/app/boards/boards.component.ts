import { Component, OnInit } from '@angular/core';

import { Board } from '../board';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
  boards: Board[];

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.getBoards();
  }

  getBoards(): void {
    this.boardService.getBoards().subscribe(boards => this.boards = boards);
  }

  addBoard(name: string) {
    name = name.trim();
    if(!name) { return; }
    this.boardService.addBoard({ id: this.boards.length + 1, name: name } as Board).subscribe(board => {
      this.boards.push(board);
    });
  }

  deleteBoard(board: Board) {
    if(!board) { return; }
    this.boardService.deleteBoard(board).subscribe(board => {
      this.boards.splice(board.id, 1);
    });
  }
}
