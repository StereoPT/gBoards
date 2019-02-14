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

  @Output() deleteEvent = new EventEmitter<List>();
  @Output() updateEvent = new EventEmitter<List>();

  constructor(private listService: ListService) { }

  ngOnInit() { }

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
