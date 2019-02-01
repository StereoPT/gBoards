import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { BoardService } from '../board.service';
import { Board } from '../board';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {
  board: Board;

  constructor(private route: ActivatedRoute, private boardService: BoardService, private location: Location) {

  }

  ngOnInit(): void {
    this.getBoard();
  }

  getBoard(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.boardService.getBoard(id).subscribe(board => this.board = board);
  }
}
