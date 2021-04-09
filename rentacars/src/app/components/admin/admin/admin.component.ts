import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { CarDto } from 'src/app/models/carDto';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  colors:Color[]=[];
  brands:Brand[]=[];
  cars:CarDto[] = [];
  dataLoaded=false;

  constructor(
    private brandService:BrandService,
    private colorService:ColorService,
    private carService : CarService
  ) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.getCars();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
      this.dataLoaded=true;
    })
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
      this.dataLoaded=true;
    })
  }
  getCars(){
    this.carService.getCars().subscribe(response => {
      this.cars = response.data, 
      this.dataLoaded = true;
    })
  }

}
