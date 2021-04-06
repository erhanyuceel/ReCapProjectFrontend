import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { CarImageDetail } from '../models/carImageDetail';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl: string = `${environment.apiUrl}/`;

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcarsdetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcarsbybrandid?id=" + brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcarsbycolorid?id=" + colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarDetails(carId:number):Observable<SingleResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcardetailsbyid?id="+ carId;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
  }
  getCarImagesById(carId:number):Observable<ListResponseModel<CarImageDetail>>{
    let carImagesPath = this.apiUrl + "carimages/getimagesbycarid?id=" + carId;
    return this.httpClient.get<ListResponseModel<CarImageDetail>>(carImagesPath);
  }
  
  getCarImages(carId:number):Observable<SingleResponseModel<CarImageDetail>>{
    let carImagesPath = this.apiUrl + "carimages/getimagesbycarid?id=" + carId;
    return this.httpClient.get<SingleResponseModel<CarImageDetail>>(carImagesPath);
  }
}
