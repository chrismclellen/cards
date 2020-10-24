import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Card } from './card.Interface';

const url = 'assets/data/cards.json';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {

  }

  getAllCards(): Observable<Card> {
    return this.http.get<Card> (url);
  }

}
