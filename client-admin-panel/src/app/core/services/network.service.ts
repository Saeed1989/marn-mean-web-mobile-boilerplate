import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Data } from '../modles/data.model';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(private http: HttpClient) {}

  getAllDataList(): Observable<Data[]> {
    console.log('Getting all data from the server.');
    return this.http.get<Data[]>(`/api/dataList`);
  }

  getDataById(id: number): Observable<Data> {
    return this.http.get<Data>(`/api/dataList/${id}`);
  }

  addData(data: Data): Observable<Data> {
    return this.http.post<Data>('/api/dataList', data);
  }

  updateData(updatedData: Data): Observable<void> {
    return this.http.patch<void>(
      `/api/dataList/${updatedData.id}`,
      updatedData
    );
  }

  deleteData(dataID: number): Observable<void> {
    return this.http.delete<void>(`/api/dataList/${dataID}`);
  }

  getAlerts(userId: string): Observable<void> {
    return this.http.get<void>(`/api/alerts/${userId}`);
  }
}
