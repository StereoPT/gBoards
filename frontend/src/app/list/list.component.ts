import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { List } from '../list';
import { Card } from '../card';
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
  editingCard: number;
  cardLastName: string;

  @Output() deleteListEvent = new EventEmitter<List>();
  @Output() updateListEvent = new EventEmitter<List>();

  constructor(private listService: ListService) { }

  ngOnInit() { }

  deleteList(list: List) {
    if(!list) { return; }
    this.deleteListEvent.emit(list);
  }

  updateList(list: List) {
    if(!list) { return; }
    this.updateListEvent.emit(list);
  }

  addCard(cardText: string) {
    cardText = cardText.trim();
    if(!cardText) { return; }
    this.listService.addCard(this.list._id, { text: cardText } as Card).subscribe(card => {
      this.list.cards.push(card.text);
    });
  }

  deleteCard(cardText: string) {
    if(!cardText) { return; }
    this.listService.deleteCard(this.list._id, { text: cardText } as Card).subscribe(card => {
      console.log(card);
      let cardIndex = this.list.cards.indexOf(card.text);
      if(cardIndex != -1) {
        this.list.cards.splice(cardIndex, 1);
      }
    });
  }

  updateCard(cardText: string) {
    if(!cardText) { return; }
    this.listService.updateCard(this.list._id, this.cardLastName, { text: cardText } as Card).subscribe(card => { });
  }

  editList() {
    this.editingList = !this.editingList;
  }

  editCard(cardIndex: number) {
    if(this.editingCard != cardIndex) {
      this.editingCard = cardIndex;
    } else {
      this.editingCard = null;
    }
  }
}
