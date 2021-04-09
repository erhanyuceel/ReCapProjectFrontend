import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NaviComponent } from './components/navi/navi.component';
import { RentalComponent } from './components/rental/rental.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CarfilterComponent } from './components/carfilter/carfilter.component';
import { RentalFormComponent } from './components/rental-form/rental-form.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandAddComponent } from './components/admin/brand-add/brand-add.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { ColorAddComponent } from './components/admin/color-add/color-add.component';
import { CarAddComponent } from './components/admin/car-add/car-add.component';
import { BrandUpdateComponent } from './components/admin/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/admin/color-update/color-update.component';
import { CarUpdateComponent } from './components/admin/car-update/car-update.component';

import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { FilterCarPipe } from './pipes/filter-car.pipe';

import { ToastrModule } from "ngx-toastr";
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    CustomerComponent,
    NaviComponent,
    RentalComponent,
    SidebarComponent,
    CardetailComponent,
    VatAddedPipe,
    FilterBrandPipe,
    FilterColorPipe,
    FilterCarPipe,
    CarfilterComponent,
    RentalFormComponent,
    PaymentComponent,
    BrandAddComponent,
    AdminComponent,
    ColorAddComponent,
    CarAddComponent,
    BrandUpdateComponent,
    ColorUpdateComponent,
    CarUpdateComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
