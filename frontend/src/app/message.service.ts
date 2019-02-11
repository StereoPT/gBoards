import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/';


@Injectable({
  providedIn: 'root'
})

export class MessageService {
  constructor(private snackBar: MatSnackBar) { }

  add(message: string) {
    this.snackBar.open(message, "", { duration: 2000, });
  }
}
