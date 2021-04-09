import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { CarService } from 'src/app/services/car.service';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm : FormGroup;
  colors: Color[];
  brands: Brand[];
  
  constructor(
    private formBuilder:FormBuilder, 
    private carService: CarService,
    private colorService: ColorService,
    private brandService: BrandService,
    private toastrService:ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => { this.brands = response.data });
  }
  getColors() {
    this.colorService.getColors().subscribe(response => { this.colors = response.data });
  }

  createCarAddForm(){
     this.carAddForm = this.formBuilder.group({
      carName:["",Validators.required],
      colorId:["",Validators.required],
      brandId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      descriptions:["",Validators.required]
     })
  }

  add(){
    if(this.carAddForm.valid){
      const carModel:Car = Object.assign({},this.carAddForm.value);
      console.log(carModel);
      this.carService.add(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı");
        this.toastrService.warning("Admin sayfasına Yonlendiriliyorsunuz");
        setTimeout(() => {
          this.router.navigate(['/admin']);
      }, 1000);
      },responseError=>{
        console.log(responseError)
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
          }       
        } 
      })
      
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
    
  }
}
