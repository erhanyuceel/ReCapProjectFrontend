import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin/admin.component';
import { BrandAddComponent } from './components/admin/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/admin/brand-update/brand-update.component';
import { CarAddComponent } from './components/admin/car-add/car-add.component';
import { CarUpdateComponent } from './components/admin/car-update/car-update.component';
import { ColorAddComponent } from './components/admin/color-add/color-add.component';
import { ColorUpdateComponent } from './components/admin/color-update/color-update.component';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/:carId", component:CardetailComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/filteredCars/color/:colorfilterId/brand/:brandfilterId",component:CarComponent},
  {path:"payment/:rental",component:PaymentComponent},
  {path:"admin", component:AdminComponent, canActivate:[LoginGuard]},
  {path:"admin/brandAdd", component:BrandAddComponent, canActivate:[LoginGuard]},
  {path:"admin/brandUpdate/:brandId", component:BrandUpdateComponent, canActivate:[LoginGuard]},
  {path:"admin/colorAdd", component:ColorAddComponent, canActivate:[LoginGuard]},
  {path:"admin/colorUpdate/:colorId", component:ColorUpdateComponent, canActivate:[LoginGuard]},
  {path:"admin/carAdd", component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"admin/carUpdate/:carId", component:CarUpdateComponent, canActivate:[LoginGuard]},
  {path:"login", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
