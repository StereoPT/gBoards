import { Component, OnInit, Input } from '@angular/core';

import { Board } from '../board';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {
  @Input() board: Board;

  constructor() { }

  ngOnInit() {
  }

}
