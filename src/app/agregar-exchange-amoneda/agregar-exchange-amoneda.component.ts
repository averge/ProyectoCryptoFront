import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExchangeService } from '../exchange.service';
import { MonedaService } from '../moneda.service';
import { Exchange } from '../openapi/model/exchange';
import { Coin } from '../openapi/model/coin';
import { MonedaExchangeService } from '../moneda-exchange.service';
import { NewExchangeInCoin } from '../openapi/model/newExchangeInCoin';
import { ApisService } from '../apis.service';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-agregar-exchange-amoneda',
  template: `
    <h1 >
      {{moneda.nombre}}
</h1>
    <form (ngSubmit)="onSubmit()" [formGroup]="ExchangeForm"> 
     <div class="form-group">
     <label for="name">Name</label>
      <select id="name" formControlName="nombre" *ngIf="!new">
          <option disabled selected value> -- select an option -- </option>
          <option *ngFor="let item of opcionesValidas" >{{item}}</option>
        </select>
        <input type="text" formControlName="nombre" *ngIf="new">
       
       <b (click)="new = !new"  mat-icon-button>          
            <mat-icon color_green style="font-size: 36px;">add</mat-icon>        
</b> 
       <div *ngIf="new">
        <label for="name">link</label>
        <input type="text" id="name" formControlName="link"  >
        <br>
      <label for="name">script whit api</label> <br>
      <textarea id="name" formControlName="script"  ></textarea>
      <br>
       </div>
    </div>

     <div class="form-group">
        <button mat-raised-button class="btn btn-primary"  color="primary" [disabled]="!ExchangeForm.value.nombre" type="submit">Save</button>    
        <button mat-raised-button color="secundary" [routerLink]="['/homeMoneda']">Cancelar</button> 
    </div>

   </form>
  `,
  styles: [
  ]
})
export class AgregarExchangeAMonedaComponent implements OnInit {
  
  tipo:string = "";
  new: boolean = false;
  opciones:any=["argenbtc","belo","bitex","bitmonedero","bitso",
    "buda",
    "buenbit",
    "copter",
    "criptofacil",
    "cryptomkt",
    "decrypto",
    "domitai",
    "fiwind",
    "latamex",
    "lemoncash",
    "letsbit",
    "orionx",
    "pandaexchange",
    "ripio",
    "ripioexchange",
    "satoshitango",
    "sesocio",
    "tiendacrypto",
    "universalcoins",
    "vitawallet"];
  opcionesValidas:any=[]
  Exchange!: Exchange ;
  moneda !: Coin;
  id = this.route.snapshot.paramMap.get('id');
  isEdit: boolean = false;
  ExchangeForm = new FormGroup({
  nombre : new FormControl('', [Validators.required]),
  link : new FormControl('', ), 
  script: new FormControl('',),
  tipo: new FormControl('',),
});

  constructor(private serviceConsulta:ApisService, private monedaExchange:MonedaExchangeService, private route: ActivatedRoute ,private router: Router, private serviceExchange:ExchangeService, private serviceMoneda: MonedaService, private storage: StorageMap ) { }
 
  exchangeList!: Exchange[];
  ngOnInit(): void {
    id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.serviceExchange.getExchanges().subscribe((exchange:Exchange[]) => {
        this.exchangeList = exchange;
      });
    this.serviceMoneda.findMoneda(id).subscribe((moneda: Coin) => {
      this.moneda = moneda;
      this.serviceConsulta.getExchanges(moneda.sufijo!).subscribe((exchange:any[]) => {
        for (let i of this.opciones) {
          if(exchange[i]!==undefined){
            this.opcionesValidas.push(i)
          }
        }      
      },
      (error) => {
        for (let i = 0; i < this.opciones.length; i++) {
          this.serviceConsulta.getPricePesos(this.opciones[i], this.moneda.sufijo!).subscribe((res:any) => {
            if (res.ask>0) {
                this.opcionesValidas.push(this.opciones[i]);
            }
        },
        (error) => {
        }
        );}  
      }
      
      );
          
  /*  
    if(this.opcionesValidas.length===0){
      for (let i = 0; i < this.opciones.length; i++) {
        this.serviceConsulta.getPricePesos(this.opciones[i], this.moneda.sufijo!).subscribe((res:any) => {
          if (res.ask>0) {
              this.opcionesValidas.push(this.opciones[i]);
          }
      },
      (error) => {
        console.log(error);
      }
      );}
      }
      */
      this.eliminarExistentes();
    });
    /*
    this.serviceExchange.getExchanges().subscribe((exchange:Exchange[]) => {
      this.exchangeList = exchange;
    });
    console.log(this.moneda.sufijo)
    this.serviceConsulta.getExchanges(this.moneda.sufijo!).subscribe((exchange:Exchange[]) => {
      this.opcionesValidas = exchange;
      console.log(this.opcionesValidas)
    });
    this.monedaExchange.getExchanges(id).subscribe((exchange:Exchange[]) => {
      for (let i = 0; i < this.opciones.length; i++) {
        this.serviceConsulta.getPricePesos(this.opciones[i], this.moneda.sufijo!).subscribe((res:any) => {
          if (res.ask>0) {
            if(!exchange.find(x=>x.nombre==this.opciones[i])){
              this.opcionesValidas.push(this.opciones[i]);
              this.opcionesValidas.sort();
            }
          
          }
        })
        
      }
      
      
      
        
      
    });
    */
    var id=this.route.snapshot.paramMap.get("id");
    
   this.eliminarExistentes();
    }
  }

  	
  onSubmit(): void {
    if (this.new) {
      localStorage.clear()
      this.serviceConsulta.prueba2(this.ExchangeForm.value.script);
      this.addExchange(new NewExchangeInCoin (this.ExchangeForm.value.nombre,this.ExchangeForm.value.link,this.ExchangeForm.value.script, this.id!));
     
    } else {
      this.addExchange(new NewExchangeInCoin (this.ExchangeForm.value.nombre,this.ExchangeForm.value.link,"", this.id!));
    }
    localStorage.clear()
  }
  

  

  prueba(nombre:string){
    console.log(this.serviceConsulta.recibirScript(this.ExchangeForm.value.script))

  }
addExchange(item: NewExchangeInCoin) {

	  this.monedaExchange.addExchange(item).subscribe();

  this.router.navigateByUrl('/homeMoneda')
 }



changeNew(){
  this.new= !this.new;
}

tipoScript(){
  console.log(this.tipo)
  this.tipo=this.tipo;
}

eliminarExistentes(){
  this.monedaExchange.getExchanges(this.id!).subscribe((exchange:Exchange[]) => {
    for (let i of exchange) {
      if (this.opcionesValidas.includes(i.nombre)){
        this.opcionesValidas.splice(this.opcionesValidas.indexOf(i.nombre),1)
      }
    }
  });   
  this.opcionesValidas.sort(); 
}
}
