import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Board } from '../board';
import { List } from '../list';
import { BoardService } from '../board.service';
import { ListService } from '../list.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board: Board;
  lists: List[];

  constructor(private route: ActivatedRoute, private boardService: BoardService, private listService: ListService, private location: Location) { }

  ngOnInit() {
    this.getBoard();
    this.getLists();
  }

  getBoard(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.boardService.getBoard(id).subscribe(board => this.board = board);
  }

  getLists(): void {
    const boardID = this.route.snapshot.paramMap.get('id');
    this.listService.getLists(boardID).subscribe(lists => this.lists = lists);
  }

  goBack(): void {
    this.location.back();
  }

  displayBoard(): void {
    console.log(this.board);
  }

  displayList(): void {
    console.log(this.lists);
  }
}
