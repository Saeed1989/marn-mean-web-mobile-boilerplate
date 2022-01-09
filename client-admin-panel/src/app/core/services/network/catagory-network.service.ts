import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Catagory } from '../../modles/catagory.model';

@Injectable({
  providedIn: 'root',
})
export class CatagoryNetworkService {
  rootUrl = '5000';
  constructor(private http: HttpClient) {}

  getCatagories(): Observable<any> {
    console.log('Getting all catagory from the server.');
    return this.http.get<any>(`${this.rootUrl}/api/catagories`);
  }

  getCatagoryById(id: number): Observable<Catagory> {
    return this.http.get<Catagory>(`/api/catagories/${id}`);
  }

  addCatagory(catagory: Catagory): Observable<Catagory> {
    return this.http.post<Catagory>('/api/catagories', catagory);
  }

  updateCatagory(updatedCatagory: Catagory): Observable<void> {
    return this.http.patch<void>(
      `/api/catagories/${updatedCatagory.id}`,
      updatedCatagory
    );
  }

  deleteCatagory(catagoryID: string): Observable<void> {
    return this.http.delete<void>(`/api/catagories/${catagoryID}`);
  }
}
