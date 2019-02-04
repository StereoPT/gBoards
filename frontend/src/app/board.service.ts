import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Board } from './board';
import { MessageService } from './message.service';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})

export class BoardService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>('http://localhost:2909/boards').pipe(
      tap(_ => this.log('Fetched Boards')),
      catchError(this.handleError('getBoards', []))
    );
  }

  getBoard(id: number): Observable<Board> {
    return this.http.get<Board>(`http://localhost:2909/boards/${id}`).pipe(
      tap(_ => this.log(`Fetched Board: ID=${id}`)),
      catchError(this.handleError<Board>(`getBoard ID=${id}`))
    );
  }

  addBoard(board: Board): Observable<Board> {
    return this.http.post<Board>('http://localhost:2909/boards/add', board, httpOptions).pipe(
      tap((board: Board) => this.log(`Added Board w/ id=${board.id}`)),
      catchError(this.handleError<Board>('addBoard'))
    );
  }

  deleteBoard(board: Board): Observable<Board> {
    return this.http.post<Board>('http://localhost:2909/boards/delete/', board, httpOptions).pipe(
      tap(_ => this.log(`Deleted Board: ID=${board.id}`)),
      catchError(this.handleError<Board>(`deleteBoard ID=${board.id}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`BoardService: ${message}`);
  }
}
