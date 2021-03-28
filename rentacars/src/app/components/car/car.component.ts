import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImageDetail } from 'src/app/models/carImageDetail';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
apiURL = 'https://localhost:44365/';

  cars:Car[] = [];
  currentCar:Car;
  emptyCar:Car;
  carDetails:CarDetail[];
  carImage:CarImageDetail;
  dataLoaded = false;
  
  constructor(
    private carService : CarService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }
      else{
        this.getCars()
      }
    })
  }

  getCars(){
    this.carService.getCars().subscribe(response => {
      this.cars = response.data, 
      this.dataLoaded = true;
      this.setAllImageUrls(this.cars);
    })
  }
  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
      this.setAllImageUrls(this.cars);
    })   
  }
  
  getCarsByColor(colorId:number) {
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
      this.setAllImageUrls(this.cars);
    })   
  }

  setCurretCar(car: Car){
    this.currentCar = car;
  }

  getCarImages(carId:number){
    this.carService.getCarImages(carId).subscribe((response) => {
      this.carImage = response.data;
    });
  }

  setAllImageUrls(cars:Car[]){
    cars.forEach(c => {
      this.getCarImages(c.id);
    });
  }

}
