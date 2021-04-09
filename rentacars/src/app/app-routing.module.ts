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
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/:carId", component:CardetailComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/filteredCars/color/:colorfilterId/brand/:brandfilterId",component:CarComponent},
  {path:"payment/:rental",component:PaymentComponent},
  {path:"admin", component:AdminComponent},
  {path:"admin/brandAdd", component:BrandAddComponent},
  {path:"admin/brandUpdate/:brandId", component:BrandUpdateComponent},
  {path:"admin/colorAdd", component:ColorAddComponent},
  {path:"admin/colorUpdate/:colorId", component:ColorUpdateComponent},
  {path:"admin/carAdd", component:CarAddComponent},
  {path:"admin/carUpdate/:carId", component:CarUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
