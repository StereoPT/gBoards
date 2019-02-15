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
  addingCard: boolean = false;

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
    this.listService.getLists(boardID).subscribe(lists => {
      this.lists = lists;
    });
  }

  addList(name: string) {
    const boardID = this.route.snapshot.paramMap.get('id');
    name = name.trim();
    if(!name) { return; }
    console.log(boardID + " | " + name);
    this.listService.addList({ boardID: boardID, name: name, cards: [] } as List).subscribe(list => {
      this.lists.push(list);
    });
  }

  deleteListHandler(list: List) {
    this.listService.deleteList(list).subscribe(deletedList => {
      let listIndex = this.lists.indexOf(list);
      if(listIndex != -1) {
        this.lists.splice(listIndex, 1);
      }
    });
  }

  updateListHandler(list: List) {
    this.listService.updateList(list).subscribe(list => { });
  }

  goBack(): void {
    this.location.back();
  }
}
