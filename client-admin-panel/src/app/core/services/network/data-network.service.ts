import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Data } from '../../modles/data.model';

@Injectable({
  providedIn: 'root',
})
export class DataNetworkService {
  rootUrlRead = '5001';
  rootUrlWrite = '5003';
  constructor(private http: HttpClient) {}

  getDataByCatagory(catHiararcy: string): Observable<any> {
    console.log('Getting all data from the server.');
    return this.http.post<any>(`${this.rootUrlRead}/api/data/search`, {
      searchText: catHiararcy
    });
  }

  getDataById(id: number): Observable<Data> {
    return this.http.get<Data>(`${this.rootUrlRead}/api/data/${id}`);
  }

  addData(data: Data): Observable<String> {
    const payload = {
      name: data.name,
      catagory: data.catagory,
      description: data.description
    }
    return this.http.post<String>(`${this.rootUrlWrite}/api/data`, payload);
  }

  updateData(updatedData: Data): Observable<String> {

    const ops = { observe: 'response', responseType: 'text' }
    const payload = {
      name: updatedData.name,
      catagory: updatedData.catagory,
      description: updatedData.description
    }
    return this.http.put(`${this.rootUrlWrite}/api/data/${updatedData.id}`, payload, {responseType: 'text'});
  }

  deleteData(dataID: string): Observable<String> {
    return this.http.delete(`${this.rootUrlWrite}/api/data/${dataID}`,{responseType: 'text'});
  }

  getAlerts(userId: string): Observable<void> {
    return this.http.get<void>(`${this.rootUrlRead}/api/alerts/${userId}`);
  }
}
