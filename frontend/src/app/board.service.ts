import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Board } from './board';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class BoardService {
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getBoards(): Observable<Board[]> {
    //TODO: send the message _after_ fetching the Boards
    this.messageService.add("BoardService: Fetched Boards");
    return this.http.get<Board[]>('http://localhost:2909/boards');
  }
}
