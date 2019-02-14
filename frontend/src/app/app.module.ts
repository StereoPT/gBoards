import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';

import { BoardsComponent } from './boards/boards.component';
import { MessagesComponent } from './messages/messages.component';
import { BoardComponent } from './board/board.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    MessagesComponent,
    BoardComponent,
    ListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatSnackBarModule,
    MatInputModule
  ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
