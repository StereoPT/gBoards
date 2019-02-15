import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { List } from '../list';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() list: List;

  addingCard: boolean = false;
  editingList: boolean = false;
  editingCard: boolean = false;
  cardLastName: string;

  @Output() deleteListEvent = new EventEmitter<List>();
  @Output() updateListEvent = new EventEmitter<List>();

  constructor(private listService: ListService) { }

  ngOnInit() { }

  addCard(name: string) {
    name = name.trim();
    if(!name) { return; }
    this.listService.addCard(this.list._id, name).subscribe(card => {
      this.list.cards.push(card);
    });
  }

  deleteList(list: List) {
    if(!list) { return; }
    this.deleteListEvent.emit(list);
  }

  updateList(list: List) {
    if(!list) { return; }
    this.updateListEvent.emit(list);
  }

  deleteCard(card: string) {
    if(!card) { return; }
    this.listService.deleteCard(this.list._id, card).subscribe(card => {
      let cardIndex = this.list.cards.indexOf(card.cardName);
      if(cardIndex != -1) {
        this.list.cards.splice(cardIndex, 1);
      }
    });
  }

  updateCard(card: string) {
    if(!card) { return; }
    this.listService.updateCard(this.list._id, this.cardLastName, card).subscribe(card => { });
  }

  editList() {
    this.editingList = !this.editingList;
  }

  editCard() {
    this.editingCard = !this.editingCard;
  }
}
