import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Board } from '../board';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board: Board;

  constructor(private route: ActivatedRoute, private boardService: BoardService, private location: Location) { }

  ngOnInit() {
    this.getBoard();
  }

  getBoard(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.boardService.getBoard(id).subscribe(board => this.board = board);
  }

  goBack(): void {
    this.location.back();
  }
}
