import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coin } from '../app/openapi/model/coin';
@Injectable({
  providedIn: 'root'
})
export class MonedaService {

  constructor(private http: HttpClient) {  }
  url = 'http://[::1]:3000/coins';
  getMonedas(): Observable<Coin[]> {
    return this.http.get<Coin[]>(this.url);
  }

  addMoneda(moneda: Coin) {
    return this.http.post(this.url, moneda);
  }

  deleteMoneda(id: string) {
    return this.http.delete(this.url + '/' + id);
  }

  findMoneda(id: string): Observable<Coin> {
    return this.http.get<Coin>(this.url + '/' + id);
  }

  updateMoneda(moneda: Coin) {

    return this.http.put(this.url + '/' + moneda.id , moneda);
  }

  updatePrecio(moneda: Coin, id: string) {
    return this.http.put(this.url + '/' + id, moneda);
  }
}
