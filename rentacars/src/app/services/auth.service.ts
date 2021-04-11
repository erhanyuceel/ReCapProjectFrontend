import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PasswordChangeModel } from '../models/passwordChangeModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper:JwtHelperService = new JwtHelperService();
  userName:string;
  userId:number;
  roles:string[];

  apiUrl: string = `${environment.apiUrl}/auth`;

  constructor(private httpClient:HttpClient,
    private localStorageService:LocalStorageService
  ) {
      this.setUserId()
      this.setRoles();
    }

  isAuthenticated(){
    if (this.localStorageService.get("token")) {
      return true;      
    } else{
      return false;
    }
  }

  login(login:Login){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"/login",login)
  }

  //-----------------------

  register(register:Register):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"/register", register)
  }

  getUserId():number{
    console.log(this.userId)
    return this.userId;
  }

  setRoles(){
    if (this.localStorageService.get("token")) {
      var decoded = this.jwtHelper.decodeToken(this.localStorageService.get("token"));
      var role = Object.keys(decoded).filter(x => x.endsWith("/role"))[0];
      this.roles = (decoded[role])
    }
  }

  isAdmin(){
    if (this.roles.includes("admin")) {
      return true
    }
    return false;
  }

  setUserId(){
    if (this.localStorageService.get("token")) {
      var decoded = this.jwtHelper.decodeToken(this.localStorageService.get("token"));
      var propUserId = Object.keys(decoded).filter(x => x.endsWith("/nameidentifier"))[0];
      this.userId = Number(decoded[propUserId]);
    }
  }

  changePassword(passwordChangeModel:PasswordChangeModel):Observable<ResponseModel>{
    console.log(passwordChangeModel)
    let newPath = this.apiUrl + "/changepassword";
    return this.httpClient.post<ResponseModel>(newPath,passwordChangeModel);
  }

}
