import { Component, OnInit } from '@angular/core';
import { Coin } from '../openapi/model/coin';
import { MonedaService } from '../moneda.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Exchange } from '../openapi/model/exchange';
import { ExchangeService } from '../exchange.service';
import { MonedaExchangeService } from '../moneda-exchange.service';
import { NewExchangeInCoin } from '../openapi/model/newExchangeInCoin';
import { coinEchange } from '../models/coinEchange'


@Component({
  selector: 'app-home',
  template: `
  <button mat-raised-button color="primary" [routerLink]="['/homeMoneda']">Monedas</button>

     <p *ngFor="let moneda of monedaList">
       {{
          moneda.nombre
       }}
      </p>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor( private monedaService: MonedaService, private monedaExchangeService: MonedaExchangeService) { }
  
  monedaList!: Coin[];
  coinExchange!: coinEchange[];
  exchangePorMoneda!: NewExchangeInCoin[];
  moendaExcahnges!: [][];

  ngOnInit(): void {
    this.monedaService.getMonedas().subscribe((moneda:Coin[]) => {
      this.monedaList = moneda;
      console.log(this.monedaList);
      for (let i = 0; i < moneda.length; i++) {
        this.monedaExchangeService.getExchangeForMoneda(moneda[i].id!).subscribe((exchange:NewExchangeInCoin[]) => {
        this.exchangePorMoneda = exchange;
        console.log(this.exchangePorMoneda);
      } ); }
    });
    
    this.listarExchangePorMoneda()
  }

  listarExchangePorMoneda(){
    
    
  }


}
