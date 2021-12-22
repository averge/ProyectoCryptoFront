import { Component, OnInit, ViewChild } from '@angular/core';
import { Exchange } from '../openapi/model/exchange';
import { ExchangeService } from '../exchange.service';
import { ConstantPool } from '@angular/compiler';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-exchange',
  template: `
    <p >
      exchange works!
    </p>
    <table mat-table [dataSource]="exchangeList" matSort class="mat-elevation-z8">  
      <ng-container matColumnDef="nombre">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Nombre </th>
        <td mat-cell *matCellDef="let exchangeList"> {{exchangeList.nombre}} </td>
      </ng-container>
     <ng-container matColumnDef="link">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> link </th>
            <td mat-cell *matCellDef="let exchangeList"> {{exchangeList.link}} </td>
     </ng-container> 
     <ng-container matColumnDef="edit">
     <th mat-header-cell *matHeaderCellDef> Edit </th>
        <td mat-cell *matCellDef="let exchangeList">
     <button [routerLink]="['/agregarExchange',exchangeList.id]"  mat-icon-button>          
            <mat-icon color="primary">edit</mat-icon>        
          </button> 
     </ng-container> 
     <ng-container matColumnDef="delete">
     <th mat-header-cell *matHeaderCellDef> delete </th>
        <td mat-cell *matCellDef="let exchangeList">
     <button (click)="onDelete(exchangeList.id)" mat-icon-button>        
            <mat-icon color="primary">delete</mat-icon>        
          </button> 
     </ng-container> 
     
     
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
     <button mat-raised-button color="primary" (click)="agregarExchange()">Agregar</button>
  `,
  styles: [
  ]
})
export class ExchangeComponent implements OnInit {
  displayedColumns: string[] =  ['nombre', 'link', 'edit', 'delete'];    
  
  constructor(private router: Router, private service:ExchangeService) { }
  exchangeList!: Exchange[];
  ngOnInit(): void {
    this.service.getExchanges().subscribe((exchange:Exchange[]) => {
      this.exchangeList = exchange;
    });
  }

  agregarExchange(){
    this.router.navigateByUrl('/agregarExchange');
  }

  onDelete(id:any){
    this.service.deleteExchange(id).subscribe(
      (data) => {
        console.log(data);
        this.service.getExchanges().subscribe((exchange:Exchange[]) => {
          this.exchangeList = exchange;
        });
      }
    );
  }

  onEdit(id:any){
    this.router.navigateByUrl('/agregarExchange',id);
  }

}