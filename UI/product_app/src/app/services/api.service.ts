import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  baseUrl = "https://127.0.0.1:7139"
  constructor(private http: HttpClient) {}


  getProductList(skip:any,take:any,searchTerm:any=""){
    let url = this.baseUrl + "/Product/GetProductList"
    let json:any = {
      "skip":skip,
      "take":take,
      "keyword":searchTerm
    }

    return this.http.post(url,json);
  }

  saveFormData(payload:any){ 
    let url = this.baseUrl + "/Product/AddUpdateProducts"
    return this.http.post(url,payload);
  }

  

}
