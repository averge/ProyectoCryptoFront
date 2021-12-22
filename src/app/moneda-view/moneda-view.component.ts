import { Component, OnInit, ViewChild } from '@angular/core';
import { Coin } from '../openapi/model/coin';
import { MonedaService } from '../moneda.service';
import { ConstantPool } from '@angular/compiler';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApisService } from '../apis.service';
import { ExchangeService } from '../exchange.service';
import { Exchange } from '../openapi';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MonedaExchangeService } from '../moneda-exchange.service'; 

import { AgregarMonedaComponent } from '../agregar-moneda/agregar-moneda.component';
import { HistoricoService } from '../historico.service';
import { Historico } from '../openapi/model/historico';




@Component({
  selector: 'app-moneda-view',
  template: `
   
    
    
    <table mat-table [dataSource]="monedaList" matSort class="mat-elevation-z8" style="width: 100%" >  
      <ng-container matColumnDef="nombre">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Nombre </th>
        <td mat-cell *matCellDef="let monedaList"> {{monedaList.nombre}} </td>
      </ng-container>
      <ng-container matColumnDef="sufijo">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Sufijo </th>
        <td mat-cell *matCellDef="let monedaList"> {{monedaList.sufijo}} </td>
      </ng-container>
      <ng-container matColumnDef="descripcion">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Descripcion </th>
            <td mat-cell *matCellDef="let monedaList"> {{monedaList.descripcion}} </td>
     </ng-container> 
     <ng-container matColumnDef="precio">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Precio promedio </th>
            <td mat-cell *matCellDef="let monedaList"> $ {{monedaList.precio}} </td>
     </ng-container> 
     <ng-container matColumnDef="linkWiki">
            <th mat-header-cell *matHeaderCellDef mat-sort-header > Link </th>
            <td mat-cell *matCellDef="let monedaList">  {{monedaList.link}} </td>
     </ng-container> 
     <ng-container matColumnDef="edit">
     <th mat-header-cell *matHeaderCellDef> Edit </th>
        <td mat-cell *matCellDef="let monedaList">
     <button [routerLink]="['/nuevaMoneda',monedaList.id]"  mat-icon-button>          
            <mat-icon color="primary">edit</mat-icon>        
          </button> 
     </ng-container> 
     <ng-container matColumnDef="delete">
     <th mat-header-cell *matHeaderCellDef> Delete </th>
        <td mat-cell *matCellDef="let monedaList">
     <button (click)="onDelete(monedaList)"  mat-icon-button>          
            <mat-icon color="primary">delete</mat-icon>        
          </button> 
     </ng-container> 
     <ng-container matColumnDef="consultarPrecio">
     <th mat-header-cell *matHeaderCellDef> Mostrar tabla </th>
        <td mat-cell *matCellDef="let monedaList">
     <button (click)="mostrarTabla(monedaList)"  mat-icon-button>          
            <mat-icon color="primary">autorenew</mat-icon>        
          </button> 
     </ng-container> 
     <ng-container matColumnDef="agregarExchange">
     <th mat-header-cell *matHeaderCellDef> Agregar Exchange </th>
        <td mat-cell *matCellDef="let monedaList">
     <button [routerLink]="['/agregarExchangeAMoneda',monedaList.id]"  mat-icon-button>          
            <mat-icon color="primary">add</mat-icon>        
          </button> 
     </ng-container> 
     <ng-container matColumnDef="EliminarExchanges" >
     <th mat-header-cell *matHeaderCellDef > Eliminar Exchanges asociados</th>
        <td mat-cell *matCellDef="let monedaList" >
     <button (click)="eliminarExchaneDeMoneda(monedaList,false)" mat-icon-button>          
            <mat-icon color="primary">delete</mat-icon>        
          </button> 
     </ng-container> 

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
     <button mat-raised-button color="primary" [routerLink]="['/nuevaMoneda']">Agregar moneda</button>

<br>
<div *ngIf="mostrarChart">
  <h1 style="text-align: center;">{{monedaActual.nombre}}</h1>
  <table class="mat-elevation-z8" style="align-items: center;">
  <tr>
    <th>Exchange</th>
    <th>Precio</th>
    <th>Ver histial</th>
    <th>Eliminar</th>
    
  </tr>
  <tr  *ngFor="let precio of precios">
    <td>{{precio.exchange}}</td>
    <td>$ {{precio.precio}}</td>
    <td><button (click)="verHistorial(precio)" mat-icon-button></button>
    <td><button (click)="eliminarExchange(precio)" mat-icon-button>          
            <mat-icon color="primary">delete</mat-icon>        
          </button>
    </td>
  </tr>
</table>
<br>
<ngx-charts-bar-vertical 
    [view]="[600,400]"
    [results]="saleData"
    [xAxisLabel]="'Excahnge'"
    [legendTitle]="'Comparativa'"
    [yAxisLabel]="'Precio'"
    [legend]="true"
    [showXAxisLabel]="true"
    [showYAxisLabel]="true"
    [xAxis]="true"
    [yAxis]="true"
    [gradient]="true">
    (select)="onSelect($event)">
</ngx-charts-bar-vertical> 
<div *ngIf="mostrarHistorial">
<ngx-charts-line-chart
  [view]="[1500, 600]"
  
  [showXAxisLabel]="true"
  [showYAxisLabel]="true"
  [xAxis]="true"
  [yAxis]="true"
  [xAxisLabel]="'fecha'"
  [yAxisLabel]="'precio'"
  [timeline]="true"
  [results]="multi"
  >
</ngx-charts-line-chart>
</div>
<ngx-charts-number-card
  [view]="[800 , 100]"
  [results]="saleData">
</ngx-charts-number-card>

</div>



  `,
  styles: [ 
    'th { text-align:center }'
   ]
})
export class MonedaViewComponent implements OnInit {
  displayedColumns: string[] =  ['nombre','sufijo', 'descripcion', 'precio', 'linkWiki','edit', 'delete', 'consultarPrecio', 'agregarExchange', 'EliminarExchanges'];    
  
  constructor(private serviceHistorico:HistoricoService, private router: Router,private monedaExchange:MonedaExchangeService, private service:MonedaService, private serviceConsulta:ApisService, private exchangeService:ExchangeService) { }
  
   multi = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "1990",
          "value": 62000000
        },
      ]
    },
  ];
  saleData = [
    {
      name: '',
      value: ''
    }
  ];
  monedaActual!:Coin;
  mostrarHistorial=false;
  monedaList!: Coin[];
  mostrarChart=false;
  exchangeList!: Exchange[];
  precios:Array<{exchange: string, precio: number, id:string}> = []; 
  exchangesDeMoneda!:Exchange[]
  myDate:any;
  intervaloActual:number =10000

  ngOnInit(): void {
    
    this.mostrarChart=false;
    this.service.getMonedas().subscribe((moneda:Coin[]) => {
      this.monedaList = moneda;
      this.myDate = new Date();
      
      setInterval(() => {     
        console.log(this.myDate);
        for (let i = 0; i < moneda.length; i++) {   
        this.consultarPrecio(moneda[i]);
        this.historico(moneda[i]);
        }
      }, 40*1000
      );
    
      
      
    });
    //this.intervalo();
    this.exchangeService.getExchanges().subscribe((exchange:Exchange[]) => {
      this.exchangeList = exchange;
    }
    );
    
  }

  intervalo(){
    this.myDate = new Date();
    for (let i = 0; i < this.monedaList.length; i++) {  
    setInterval(() => {     
      console.log(this.intervaloActual)    //replaced function() by ()=>
      console.log(this.myDate);
      this.consultarPrecio(this.monedaList[i]);
    }, this.intervaloActual
    );
  }
  }
 

  onDelete(coin:Coin){
      if(confirm("Esta seguro de eliminar la moneda "+ coin.nombre)){
      this.eliminarExchaneDeMoneda(coin,true);
      this.service.deleteMoneda(coin.id!).subscribe(
        (data) => {
          this.service.getMonedas().subscribe((moneda:Coin[]) => {
            this.monedaList = moneda;
          });
        }
      );
    }
  }

 // onEdit(){
   // const dialogRef = this.usardialogo.open(AgregarMonedaComponent       
    //);
  //}
  mostrarTabla(moneda:Coin){
    console.log(this.mostrarChart)
    //this.tablaHistorico(moneda);
    this.consultarPrecio(moneda);
    if(this.monedaActual.precio! > 0){
      this.mostrarChart= !this.mostrarChart;
      console.log(this.mostrarChart)
  }
  }

  change(){
    window.location.reload();
  }
  consultarPrecio(moneda:Coin){
    this.monedaActual=moneda;
    var total=0;
    //this.mostrarChart=false;
    this.monedaExchange.getExchangeForMoneda(moneda.id!).subscribe((exchange:Exchange[]) => {
      this.exchangesDeMoneda = exchange;
    this.saleData = [{name: '',value: ''}];
    this.precios = [];
    var actual=0;
    for (let i=0; this.exchangesDeMoneda.length; i++){
      console.log(this.exchangesDeMoneda[i])
      if (this.exchangesDeMoneda[i].script! == ""){
        this.serviceConsulta.getPricePesos(this.exchangesDeMoneda[i].nombre!, moneda.sufijo!).subscribe((res:any) => {
          if (res.ask != null){
            total += res.ask;
         // this.mostrarChart=true;
            this.precios[actual] = {exchange: this.exchangesDeMoneda[i].nombre, precio: res.ask!, id:this.exchangesDeMoneda[i].id!};
            this.saleData[actual] = {name: this.exchangesDeMoneda[i].nombre, value: res.ask!};
            this.saleData = [...this.saleData];
            moneda.precio = res.ask;
          
          this.service.updateMoneda(moneda).subscribe();
          actual++;
          if (actual == this.exchangesDeMoneda.length){
            moneda.precio = total/actual;
            moneda.precio= Math.round(moneda.precio * 100) / 100
            this.service.updateMoneda(moneda).subscribe();
          }
        }
        }); 
      }else{
        this.serviceConsulta.prueba2(this.exchangesDeMoneda[i].script!)
        console.log(this.exchangesDeMoneda[i].script)
        console.log(localStorage.getItem('valor'))
        var precio: number = +localStorage.getItem('valor')!;
        localStorage.clear()
        this.serviceConsulta.dePesosADolar().subscribe((res:any) => {
          precio = precio * res.blue;
          precio = Math.round(precio * 100) / 100
          console.log(precio)
        if (precio != null){
          total += precio;
          this.precios[actual] = {exchange: this.exchangesDeMoneda[i].nombre + " (aprox dolar blue)", precio: precio, id:this.exchangesDeMoneda[i].id!};
          this.saleData[actual] = {name: this.exchangesDeMoneda[i].nombre + " precio aproximado a dolar blue", value: precio.toString()};
          this.saleData = [...this.saleData];
          moneda.precio = precio;
          this.service.updateMoneda(moneda).subscribe();
          actual++;
          if (actual == this.exchangesDeMoneda.length){
            moneda.precio = total/actual;
            moneda.precio= Math.round(moneda.precio * 100) / 100
            this.service.updateMoneda(moneda).subscribe();
          }
        }

      }
      );  
      }
         
        
        //this.precios[i] = {exchange: this.exchangeList[i].nombre, precio: precioActual!};
    }
    

    });
    
  }

  eliminarExchange(exchange:any){
    if(confirm("Esta seguro de eliminar el exchange "+ exchange.exchange)){
      this.serviceHistorico.deleteHistorico(exchange.id!).subscribe()
    this.exchangeService.deleteExchange(exchange.id).subscribe( (data) => {
      this.exchangeService.getExchanges().subscribe((exchange:Exchange[]) => {
        this.exchangeList = exchange;
        this.monedaExchange.getExchangeForMoneda(this.monedaActual.id!).subscribe((exchange:Exchange[]) => {
          if (exchange.length == 0){
            this.monedaActual.precio = 0;
            this.mostrarChart=false;
            this.service.updateMoneda(this.monedaActual).subscribe();
          }
        });
        this.consultarPrecio(this.monedaActual);
      });
    }
    );
  }
    

  }

    eliminarExchaneDeMoneda(moneda:Coin, eliminarExchange:boolean){
      if(!eliminarExchange){


        if(confirm("Esta seguro de eliminar los exchange asosiados a "+ moneda.nombre)) {
          
          
        }
          
          this.monedaExchange.getExchangeForMoneda(moneda.id!).subscribe((exchange:Exchange[]) => {
          for (let i=0; i<exchange.length; i++){
            this.serviceHistorico.deleteHistorico(exchange[i].id!).subscribe()
            this.exchangeService.deleteExchange(exchange[i].id!).subscribe();
          }
        });
        this.monedaExchange.elimnarExchange(moneda.id!).subscribe();
        moneda.precio = 0;
        this.service.updateMoneda(moneda).subscribe();
        window.location.reload();
        }
      }


  historico(moneda:Coin){
    this.monedaExchange.getExchangeForMoneda(moneda.id!).subscribe((exchange:Exchange[]) => {
      for (let i=0; exchange.length; i++){
        if (exchange[i].script == ""){
          this.serviceConsulta.getPricePesos(exchange[i].nombre!, moneda.sufijo!).subscribe((res:any) => {
            this.serviceHistorico.setHistorico(exchange[i].id!, res.ask!).subscribe();
          });
        }else{
        this.serviceConsulta.prueba2(this.exchangesDeMoneda[i].script!)
        var precio: number = +localStorage.getItem('valor')!;
        this.serviceConsulta.dePesosADolar().subscribe((res:any) => {
          precio = precio * res.blue;
          precio = Math.round(precio * 100) / 100
        });
        this.serviceHistorico.setHistorico(exchange[i].id!, precio).subscribe();
        }
      }
    });
  }
  verHistorial(exchange:any){
    this.mostrarHistorial = true;
    this.tablaHistorico(exchange);
    
    //this.tablaHistorico(moneda);
  }

  tablaHistorico(exchange:any){
    this.multi = [];
    let x = {"name": "", "value": 0};
    let todos: { name: string; value: number; }[]=[]
    
        this.serviceHistorico.getHistoricos(exchange.id!).subscribe((res:Historico[]) => {
          console.log(res)
          for (let j=0; j<res.length; j++){
            console.log(res[j].fecha!.toLocaleString())
            x= {
              "name": res[j].fecha!.toLocaleString(),
              "value": res[j].precio!
            }
            todos.push(x);
          }

         
          console.log("algo" + todos)
          var temp = [
            {
              "name": exchange.exchange!,

              "series": 
                todos
              
            },
          ];
          
          console.log(temp);
          this.multi = [...this.multi ,...temp];
          console.log(this.multi);
        
  }  );
}
  }
 
  

