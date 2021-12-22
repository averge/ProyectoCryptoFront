import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonedaViewComponent } from './moneda-view/moneda-view.component';
import { AgregarMonedaComponent } from './agregar-moneda/agregar-moneda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { ExchangeComponent } from './exchange/exchange.component';
import { AgregarExchangeComponent } from './agregar-exchange/agregar-exchange.component';
import { HomeComponent } from './home/home.component';
import { AgregarExchangeAMonedaComponent } from './agregar-exchange-amoneda/agregar-exchange-amoneda.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'


import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/table';
import { LoginComponent } from './login/login.component';




@NgModule({
  declarations: [
    AppComponent,
    MonedaViewComponent,
    AgregarMonedaComponent,
    ExchangeComponent,
    AgregarExchangeComponent,
    HomeComponent,
    AgregarExchangeAMonedaComponent,
    LoginComponent,

    
  ],
  imports: [
    HttpClientModule,  
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
   NgxChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
