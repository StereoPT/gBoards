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

  @Output() deleteEvent = new EventEmitter<List>();
  @Output() updateEvent = new EventEmitter<List>();

  constructor(private listService: ListService) { }

  ngOnInit() { }

  addCard(name: string) {
    name = name.trim();
    if(!name) { return; }
    this.listService.addCard({ listID: this.list._id, name: name } as Card).subscribe(card => {
      this.list.cards.push(card.name);
    });
  }

  deleteList(list: List) {
    if(!list) { return; }
    this.deleteEvent.emit(list);
  }

  updateList(list: List) {
    if(!list) { return; }
    this.updateEvent.emit(list);
  }

  editList() {
    this.editingList = !this.editingList;
  }
}
