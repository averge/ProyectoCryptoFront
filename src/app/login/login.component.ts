import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <form (ngSubmit)="onSubmit()" [formGroup]="userForm"> 
     <div class="form-group">
       
       <label for="name">Usuario</label>
       <input type="text" id="name" formControlName="user"  >
        <br>
        <label for="name">Password</label>
        <input type="text" id="name" formControlName="pass"  >
        <br>
        <br>
     </div>
     <br>
     <div class="form-group">
        <button mat-raised-button class="btn btn-primary"  color="primary" type="submit">Acceder</button>  
        <button mat-raised-button color="secundary" [routerLink]="['/homeMoneda']">Registrarse</button>  
    </div>

   </form>
  `,
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  userForm = new FormGroup({
    user : new FormControl('', [Validators.required]),  
    pass : new FormControl('', [Validators.required]),
  });
    constructor(private route: ActivatedRoute ,private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
  }

}



