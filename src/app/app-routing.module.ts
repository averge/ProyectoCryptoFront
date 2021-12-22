import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonedaViewComponent } from './moneda-view/moneda-view.component';
import { AgregarMonedaComponent } from './agregar-moneda/agregar-moneda.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { AgregarExchangeComponent } from './agregar-exchange/agregar-exchange.component';
import { HomeComponent } from './home/home.component';
import { AgregarExchangeAMonedaComponent } from './agregar-exchange-amoneda/agregar-exchange-amoneda.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'homeMoneda', component: MonedaViewComponent },
  { path: 'nuevaMoneda/:id', component: AgregarMonedaComponent },
  { path: 'nuevaMoneda', component: AgregarMonedaComponent },
  { path: 'exchange', component: ExchangeComponent },
  { path: 'agregarExchange/:id', component: AgregarExchangeComponent },
  { path: 'agregarExchange', component: AgregarExchangeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'agregarExchangeAMoneda/:id', component: AgregarExchangeAMonedaComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
