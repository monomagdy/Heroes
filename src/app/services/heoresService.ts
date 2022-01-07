import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IResponseModel } from '../interfaces';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeoresService {
  constructor(private http: HttpClient) { }

  getCountries(): Observable<IResponseModel> {
    return this.http.get<IResponseModel>('https://6127a523c2e8920017bc0e21.mockapi.io/Lookups/Country/countries');
  }
getDataList():Observable<IResponseModel>{
  return this.http.get<IResponseModel>('https://mocki.io/v1/0882f168-e569-496d-9230-b839bc00373d');
}

}



