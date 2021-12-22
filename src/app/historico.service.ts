import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewExchangeInCoin } from '../app/openapi/model/newExchangeInCoin';
import { Historico } from './openapi/model/historico';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  constructor(private http: HttpClient) {  }
  url = 'http://[::1]:3000/exchanges/';

  setHistorico(exchangeId: string, precio: number ) {
    let historico = { "fecha":  new Date(),
    "precio": precio,
    "exchangeId": exchangeId
  }
    return this.http.post(this.url + exchangeId + '/historicos', historico);
  }

  getHistoricos(exchangeId: string): Observable<Historico[]> {
    return this.http.get<Historico[]>(this.url + exchangeId + '/historicos');
  }

  deleteHistorico(id: string) {
    return this.http.delete(this.url + id + '/historicos');
  }
}
