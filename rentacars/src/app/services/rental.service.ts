import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl: string = `${environment.apiUrl}/`;

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + "rentals/getrentdetails"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  getRentalsByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl+"rentals/getbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  addRental(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl +"rentals/add";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
  
}
