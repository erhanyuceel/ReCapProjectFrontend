import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ResponseModel } from '../models/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl: string = `${environment.apiUrl}/payments/`;
  
  constructor(
    private httpClient:HttpClient
  ) { }
  
  // Test
  payWithCreditCard(): Observable<ResponseModel> {
    let newPath = this.apiUrl + "paywithcard";
    return this.httpClient.get<ResponseModel>(newPath);
  }
}
