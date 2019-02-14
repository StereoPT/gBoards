import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { List } from './list';
import { MessageService } from './message.service';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})

export class ListService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getLists(id: string): Observable<List[]> {
    return this.http.get<List[]>(`http://localhost:2909/lists/${id}`).pipe(
      tap(_ => this.log('Fetched Board Lists')),
      catchError(this.handleError('getLists', []))
    );
  }

  addList(list: List): Observable<List> {
    return this.http.post<List>('http://localhost:2909/lists/add', list, httpOptions).pipe(
      tap((list: List) => this.log(`Added List w/ name=${list.name}`)),
      catchError(this.handleError<List>('addList'))
    );
  }

  updateList(list: List): Observable<List> {
    return this.http.put<List>('http://localhost:2909/lists/update/', list, httpOptions).pipe(
      tap(_ => this.log(`Updated List: name=${list.name}`)),
      catchError(this.handleError<List>(`updateList name=${list.name}`))
    );
  }

  deleteList(list: List): Observable<List> {
    return this.http.delete<List>(`http://localhost:2909/lists/delete/${list._id}`, httpOptions).pipe(
      tap(_ => this.log(`Deleted List: name=${list.name}`)),
      catchError(this.handleError<List>(`deleteList name=${list.name}`))
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
    this.messageService.add(`ListService: ${message}`);
  }
}
