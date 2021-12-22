import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http: HttpClient, private storage: StorageMap) {  }
  url = 'https://criptoya.com/api/'

  getPricePesos( unExchange: String,unaMoneda: String,): Observable<any> {
    return this.http.get(this.url + unExchange + '/' + unaMoneda + '/ars');
  }

  getExchanges( unaMoneda: String): Observable<any> {
    return this.http.get(this.url + unaMoneda + '/ars');
  }

  getPriceDolar( unExchange: String,unaMoneda: String,): Observable<any> {
    
    return this.http.get(this.url + unExchange + '/' + unaMoneda + '/usd');
  }

  getPricePesosMoneda( unaMoneda: String): Observable<any> {
    
    return this.http.get(this.url + unaMoneda + '/ars'  );
  }
  
  dePesosADolar(): Observable<any> {
    return this.http.get(this.url + 'dolar');
  }
    
  

  recibirScript (script: string): number  {
    let temp;
    async function a() {
      let valor = await eval (script);
      return valor;
    }
    a().then(valor => {
      if (valor > 0) {
        return valor
    }
    
  });
  return 0;
  }

  
  prueba2 (script: string)  {
    let valor;
    async function a() {
      valor = await eval (script);
      console.log("dento de api" + valor);
      return valor;
    }
    a().then(valor => {
      console.log("dentro de api 2" + valor);
      localStorage.setItem('valor', valor.toString());
      //this.storage.set('precio', valor.toString()).subscribe(() => {
        //console.log('valor guardado');
      //});
      //console.log(localStorage.getItem('valor'))  
        return valor
    }
    );
  }

  
}
