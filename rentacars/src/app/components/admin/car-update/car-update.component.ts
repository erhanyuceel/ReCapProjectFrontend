import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  car: Car;
  carUpdateForm: FormGroup;
  colors: Color[];
  brands: Brand[];

  constructor(
    private carService: CarService,
    private colorService: ColorService,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCar(params['carId']);
    });
    this.getBrands();
    this.getColors();
  }
  getBrands() {
    this.brandService.getBrands().subscribe(response => { this.brands = response.data });
  }
  getColors() {
    this.colorService.getColors().subscribe(response => { this.colors = response.data });
  }

  getCar(id: number) {
    this.carService.getCar(id).subscribe((response) => {
      this.car = response.data;
      this.createCarUpdateForm();
      console.log(this.car)
    });
  }
  createCarUpdateForm(): void {
    this.carUpdateForm = this.formBuilder.group({
      id: [this.car.id],
      carName:[this.car.carName,Validators.required],
      colorId:[this.car.colorId,Validators.required],
      brandId:[this.car.brandId,Validators.required],
      modelYear:[this.car.modelYear,Validators.required],
      dailyPrice:[this.car.dailyPrice,Validators.required],
      descriptions:[this.car.descriptions,Validators.required]
    });
  }
  update() {
    if (this.carUpdateForm.valid) {
      const carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.updateBrand(carModel).subscribe(
        (response) => {
          this.toastrService.success(`Araç güncellendi: ${carModel.carName}`, 'Başarılı');
          this.toastrService.warning("Admin sayfasına Yonlendiriliyorsunuz");
          setTimeout(() => {
            this.router.navigate(['/admin']);
        }, 1000);
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Dogrulama hatasi'
              );
            }
          }
        }
      );
    }
  }

}
