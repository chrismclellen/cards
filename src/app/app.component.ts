import { Component, ViewChild } from '@angular/core';

import { ApiService } from './api.service';
import { AfterViewInit} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Card } from './card.Interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  title = 'cards';
  remainingCards: Card[] = [];
  drawnCards: Card[] = [];
  displayedColumns: string[] = ['suit', 'value'];
  faceValues: string[] = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING'];
  @ViewChild("table1") table1: MatTable<Card>;
  @ViewChild("table2") table2: MatTable<Card>;

  constructor(private api: ApiService) {}

  ngAfterViewInit(): void {
    this.getCards();
  }

  getCards() {
    this.api.getAllCards()
      .subscribe(data => {
        for (const d of (data as any)) {
          this.remainingCards.push({
            id: d.id,
            suit: d.suit,
            value: d.value
          });
        }
      });
  }


  reshuffle() {
    if (this.remainingCards.length == 0) { return; }
    let length = this.drawnCards.length;
    for( let i = 0; i < length; i++) {
      let card = this.drawnCards.pop();
      this.remainingCards.unshift(card);
    }
    this.remainingCards.reverse();
    this.table1.renderRows();
    this.table2.renderRows();
  }

  draw() {
    if (this.remainingCards.length == 0) { return; }

    let card = this.remainingCards.shift();
    this.drawnCards.push(card);
    this.table1.renderRows();
    this.table2.renderRows();
  }

  drawNewHand() {
    if (this.remainingCards.length == 0) { return; }
    let length = this.drawnCards.length;
    for( let i = 0; i < length; i++) {
      let card1 = this.drawnCards.shift();
      this.remainingCards.push(card1);
      let card2 = this.remainingCards.shift();
      this.drawnCards.push(card2);
    }
    this.table1.renderRows();
    this.table2.renderRows();
  }




}
