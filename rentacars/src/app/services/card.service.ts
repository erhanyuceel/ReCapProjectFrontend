import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  apiUrl: string = `${environment.apiUrl}/`;

  constructor(
    private httpClient:HttpClient
  ) { }

  saveCard(card:Card):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cards/addcard"
    return this.httpClient.post<ResponseModel>(newPath, card)
  }

  getCardsByUserId(userId:number):Observable<ListResponseModel<Card>>{
    let newPath = this.apiUrl + "cards/getcardsbyuserid?userId=" + userId;
    return this.httpClient.get<ListResponseModel<Card>>(newPath);
  }

  deleteCard(cardModel:Card):Observable<ResponseModel>{
    let newPath = this.apiUrl + "carddetails/delete";
    return this.httpClient.post<ResponseModel>(newPath,cardModel);
  }
}
