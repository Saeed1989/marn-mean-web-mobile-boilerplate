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
  rootUrl = '5001';
  constructor(private http: HttpClient) {}

  getDataByCatagory(catHiararcy: string): Observable<any> {
    console.log('Getting all data from the server.');
    return this.http.post<any>(`${this.rootUrl}/api/data/search`, {
      searchText: catHiararcy
    });
  }

  getDataById(id: number): Observable<Data> {
    return this.http.get<Data>(`/api/data/${id}`);
  }

  addData(data: Data): Observable<Data> {
    return this.http.post<Data>('/api/data', data);
  }

  updateData(updatedData: Data): Observable<void> {
    return this.http.patch<void>(`/api/data/${updatedData.id}`, updatedData);
  }

  deleteData(dataID: number): Observable<void> {
    return this.http.delete<void>(`/api/data/${dataID}`);
  }

  getAlerts(userId: string): Observable<void> {
    return this.http.get<void>(`/api/alerts/${userId}`);
  }
}
