import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exchange } from '../app/openapi/model/exchange';
@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  
  constructor(private http: HttpClient) {  }
  url = 'http://[::1]:3000/exchanges';

  getExchanges(): Observable<Exchange[]> {
    return this.http.get<Exchange[]>(this.url);
  }

  addExchange(exchange: Exchange) {
    console.log(exchange);
    return this.http.post(this.url, exchange);
  }

  getExchange(id: string): Observable<Exchange> {
    return this.http.get<Exchange>(this.url + '/' + id);
  }

  deleteExchange(id: string) {
    return this.http.delete(this.url + '/' + id);
  }

  updateExchange(exchange: Exchange, id: string) {
    return this.http.put(this.url + '/' + id, exchange);
  }
}
