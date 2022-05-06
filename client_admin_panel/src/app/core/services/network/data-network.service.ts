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

  getDataByCategory(catHiararcy: string): Observable<any> {
    console.log('Getting all data from the server.');
    return this.http.post<any>(`${this.rootUrlRead}/api/data/search`, {
      searchText: catHiararcy,
    });
  }

  getDataById(id: number): Observable<Data> {
    return this.http.get<Data>(`${this.rootUrlRead}/api/data/${id}`);
  }

  addData(data: Data): Observable<string> {
    const payload = {
      name: data.name,
      category: data.category,
      description: data.description,
    };
    return this.http.post<string>(`${this.rootUrlWrite}/api/data`, payload);
  }

  updateData(updatedData: Data): Observable<string> {
    const payload = {
      name: updatedData.name,
      category: updatedData.category,
      description: updatedData.description,
    };
    return this.http.put(
      `${this.rootUrlWrite}/api/data/${updatedData.id}`,
      payload,
      { responseType: 'text' }
    );
  }

  deleteData(dataID: string): Observable<string> {
    return this.http.delete(`${this.rootUrlWrite}/api/data/${dataID}`, {
      responseType: 'text',
    });
  }

}
