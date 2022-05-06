import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Category } from '../../modles/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryNetworkService {
  readPort = '5000';
  writePort = '5003';
  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    console.log('Getting all category from the server.');
    return this.http.get<any>(`${this.readPort}/api/categories`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.readPort}/api/categories/${id}`);
  }

  addCategory(category: Category): Observable<string> {
    const paylodad = {
      catName: category.catName,
      sku: category.sku,
      description: category.description,
      parentSku: category.parentSku,
    };
    return this.http.post<string>(`${this.writePort}/api/categories`, paylodad);
  }

  updateCategory(updatedCategory: Category): Observable<string> {
    const paylodad = {
      catName: updatedCategory.catName,
      sku: updatedCategory.sku,
      description: updatedCategory.description,
      parentSku: updatedCategory.parentSku,
    };
    return this.http.put(
      `${this.writePort}/api/categories/${updatedCategory.id}`,
      paylodad,
      { responseType: 'text' }
    );
  }

  deleteCategory(categoryID: string): Observable<string> {
    return this.http.delete(`${this.writePort}/api/categories/${categoryID}`, {
      responseType: 'text',
    });
  }
}
