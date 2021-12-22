
import { Component, OnInit } from '@angular/core';
import { Exchange } from '../openapi/model/exchange';
import { ExchangeService } from '../exchange.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-exchange',
  template: `
    <form (ngSubmit)="onSubmit()" [formGroup]="ExchangeForm"> 
     <div class="form-group">
       <label for="name">Nombre</label>
       <input type="text" id="name" formControlName="nombre"  >
      <br>
        <label for="name">link</label>
        <input type="text" id="name" formControlName="link"  >
      <br>
     </div>
     <div class="form-group">
        <button class="btn btn-primary" type="submit">Save</button>    
        <a routerLink="/home" class="btn btn-link">Cancel</a>
    </div>

   </form>
 
  `,
  styles: [
  ]
})
export class AgregarExchangeComponent implements OnInit {


  Exchange!: Exchange ;
  id = "";
  isEdit: boolean = false;
  ExchangeForm = new FormGroup({
  nombre : new FormControl('', [Validators.required]), 
  link : new FormControl('', [Validators.required,])});
  constructor(private route: ActivatedRoute ,private router: Router, private service:ExchangeService ) { }
 
  ngOnInit(): void {
    var id=this.route.snapshot.paramMap.get("id");
    if (id){
      this.id = id;
      this.isEdit=true;
      this.service.getExchange(id).subscribe( (exchange: Exchange) => {
        this.Exchange = exchange;
        this.ExchangeForm.setValue({
          nombre: this.Exchange.nombre,
          link: this.Exchange.link,
        });
      });
  }
  
  
  }

  	
  onSubmit(): void {
   
	this.addExchange(new Exchange (this.ExchangeForm.value.nombre,this.ExchangeForm.value.link));}

addExchange(item: Exchange) {
  if (!this.isEdit) {
	this.service.addExchange(item).subscribe();
  console.log(item);
  this.router.navigateByUrl('/home')
 }else{
    this.service.updateExchange(item, this.id).subscribe();
    this.router.navigateByUrl('/home')
 }
 
	
}
}


