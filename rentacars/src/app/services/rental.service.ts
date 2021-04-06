import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl: string = `${environment.apiUrl}/rentals/getrentdetails`;

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl);
  }
}
