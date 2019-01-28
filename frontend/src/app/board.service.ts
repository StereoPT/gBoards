import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Board } from './board';
import { BOARDS } from './mock-boards';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class BoardService {
  constructor(private messageService: MessageService) { }

  getBoards(): Observable<Board[]> {
    //TODO: send the message _after_ fetching the Boards
    this.messageService.add("BoardService: Fetched Boards");
    return of(BOARDS);
  }
}
