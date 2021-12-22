import { Component, OnInit } from '@angular/core';
import { Coin } from '../openapi/model/coin';
import { MonedaService } from '../moneda.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-agregar-moneda',
  template: `
    
    <div class="container">

   <h1>New coin</h1>
   
   <form (ngSubmit)="onSubmit()" [formGroup]="monedaForm"> 
     <div class="form-group">
       
       <label for="name">Nombre</label>
       <input type="text" id="name" formControlName="nombre"  >
        <br>
        <label for="name">Sufijo</label>
        <input type="text" id="name" formControlName="sufijo"  >
        <br>
       <label for="name">Descripcion</label>
       <input type="text" id="name" formControlName="descripcion"  >
        <br>
        <label for="name">LinkWiki</label>
        <input type="text" id="name" formControlName="link"  >
        <br>
     </div>
     <br>
     <div class="form-group">
        <button mat-raised-button class="btn btn-primary"  color="primary" type="submit">Guardar</button>  
        <button mat-raised-button color="secundary" [routerLink]="['/homeMoneda']">Cancelar</button>  
    </div>

   </form>
 </div>
  `,
  styles: [
  ]
})
export class AgregarMonedaComponent implements OnInit {
 

  moneda!: Coin ;
  id = "";
  isEdit: boolean = false;
  monedaForm = new FormGroup({
  nombre : new FormControl('', [Validators.required]),  
  sufijo : new FormControl('', [Validators.required]),
  descripcion : new FormControl('', [Validators.required,]),
  link : new FormControl('', [Validators.required,])});
  constructor(private route: ActivatedRoute ,private router: Router, private service:MonedaService) { }
 
  ngOnInit(): void {
    var id=this.route.snapshot.paramMap.get("id");
    if (id){
      this.id = id;
      this.isEdit=true;
      this.service.findMoneda(id).subscribe( (moneda: Coin) => {
        this.moneda = moneda;
        this.monedaForm.setValue({
          sufijo: this.moneda.sufijo,
          nombre: this.moneda.nombre,
          descripcion: this.moneda.descripcion,
          link: this.moneda.link
        });
      });
  }
  
  
  }

  	
  onSubmit(): void {
   
	this.addMoneda(new Coin (this.monedaForm.value.nombre,this.monedaForm.value.sufijo,0,
    this.monedaForm.value.descripcion,this.monedaForm.value.link))}


addMoneda(item: Coin) {
  if (!this.isEdit) {
	this.service.addMoneda(item).subscribe();

 }else{
   item.id=this.moneda.id;

    this.service.updateMoneda(item).subscribe();
 }
 this.router.navigateByUrl('/homeMoneda')
	
}
}


