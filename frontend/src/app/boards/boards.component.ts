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
  editingBoard: Board;

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
    this.boardService.addBoard({ name: name } as Board).subscribe(board => {
      this.boards.push(board);
    });
  }

  deleteBoard(board: Board) {
    if(!board) { return; }
    this.boardService.deleteBoard(board).subscribe(deletedBoard => {
      let boardIndex = this.boards.indexOf(board);
      if(boardIndex != -1) {
        this.boards.splice(boardIndex, 1);
      }
    });
  }

  updateBoard(board: Board) {
    if(!board) { return; }
    this.boardService.updateBoard(board).subscribe(board => { });
  }

  editBoard(board: Board) {
    if(!this.editingBoard)              { this.editingBoard = board; }
    else if(this.editingBoard == board) { this.editingBoard = null;  }
    else                                { this.editingBoard = board; }
  }
}
