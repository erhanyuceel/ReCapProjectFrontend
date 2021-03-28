import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImageDetail } from 'src/app/models/carImageDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit { 

  apiURL = 'https://localhost:44365/';

  carDetail:CarDetail;
  carImages:CarImageDetail[];

  constructor(
    private carService:CarService, 
    private activatedRoute: ActivatedRoute, 
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetails(params['carId']);
        this.getCarImages(params['carId']);
      }
    });
  }

  getCarDetails(carId:number){
    this.carService.getCarDetails(carId).subscribe((response) => {
      this.carDetail = response.data;
    });
  }

  getCarImages(carId:number){
    this.carService.getCarImagesById(carId).subscribe((response) => {
      this.carImages = response.data;
      if(response.data[0]["imagePath"]==null)
      {
        this.carImages[0]["imagePath"]=this.apiURL+response.data[0]["imagePath"];
      }
    });
  }

}
