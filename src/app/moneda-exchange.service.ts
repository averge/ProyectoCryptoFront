import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewExchangeInCoin } from '../app/openapi/model/newExchangeInCoin';

@Injectable({
  providedIn: 'root'
})
export class MonedaExchangeService {

  constructor(private http: HttpClient) {  }
  url = 'http://[::1]:3000/coins/';

  addExchange (exchange: NewExchangeInCoin){
    console.log(exchange);
    return this.http.post(this.url + exchange.coinId + '/exchanges' , exchange);
  }
  getExchangeForMoneda (monedaId:string): Observable<NewExchangeInCoin[]> {
    return this.http.get<NewExchangeInCoin[]>(this.url + monedaId + '/exchanges');
  }
  getExchanges(monedaId: string): Observable<NewExchangeInCoin[]> {
    return this.http.get<NewExchangeInCoin[]>(this.url + monedaId + '/exchanges');
  }

  elimnarExchange(exchangeId: string){
    return this.http.delete(this.url +'/'+ exchangeId + '/exchanges');
  }
}
