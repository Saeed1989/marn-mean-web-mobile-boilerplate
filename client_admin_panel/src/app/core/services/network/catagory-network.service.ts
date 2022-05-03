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
  readPort = '5000';
  writePort = '5003';
  constructor(private http: HttpClient) {}

  getCatagories(): Observable<any> {
    console.log('Getting all catagory from the server.');
    return this.http.get<any>(`${this.readPort}/api/catagories`);
  }

  getCatagoryById(id: number): Observable<Catagory> {
    return this.http.get<Catagory>(`${this.readPort}/api/catagories/${id}`);
  }

  addCatagory(catagory: Catagory): Observable<string> {
    const paylodad = {
      catName: catagory.catName,
      sku: catagory.sku,
      description: catagory.description,
      parentSku: catagory.parentSku,
    };
    return this.http.post<string>(`${this.writePort}/api/catagories`, paylodad);
  }

  updateCatagory(updatedCatagory: Catagory): Observable<string> {
    const paylodad = {
      catName: updatedCatagory.catName,
      sku: updatedCatagory.sku,
      description: updatedCatagory.description,
      parentSku: updatedCatagory.parentSku,
    };
    return this.http.put(
      `${this.writePort}/api/catagories/${updatedCatagory.id}`,
      paylodad,
      { responseType: 'text' }
    );
  }

  deleteCatagory(catagoryID: string): Observable<string> {
    return this.http.delete(`${this.writePort}/api/catagories/${catagoryID}`, {
      responseType: 'text',
    });
  }
}
