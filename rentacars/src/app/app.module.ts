import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NaviComponent } from './components/navi/navi.component';
import { RentalComponent } from './components/rental/rental.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    CustomerComponent,
    NaviComponent,
    RentalComponent,
    SidebarComponent,
    CardetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
