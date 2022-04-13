import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Resource } from '../../modles/resource.model';

@Injectable({
  providedIn: 'root',
})
export class ResourceNetworkService {
  readPort = '5003';
  writePort = '5003';
  constructor(private http: HttpClient) {}

  getResources(): Observable<any> {
    console.log('Getting all resource from the server.');
    return this.http.get<any>(`${this.readPort}/api/resources`);
  }

  getResourceById(id: number): Observable<Resource> {
    return this.http.get<Resource>(`${this.readPort}/api/resources/${id}`);
  }

addResource(resource: Resource): Observable<string> {
    const paylodad = {
      // roleName: resource.roleName,
      // resourceName: resource.resourceName,
      // isDisabled: resource.isDisabled,
      // isAllowed: resource.isAllowed,
    };
    return this.http.post<string>(`${this.writePort}/api/resources`, paylodad);
  }

  updateResource(updatedResource: Resource): Observable<string> {
    const paylodad = {
      // id: updatedResource.id,
      // roleName: updatedResource.roleName,
      // resourceName: updatedResource.resourceName,
      // isDisabled: updatedResource.isDisabled,
      // isAllowed: updatedResource.isAllowed,
    };
    return this.http.put(
      `${this.writePort}/api/resources/${updatedResource.id}`,
      paylodad,
      { responseType: 'text' }
    );
  }

  deleteResource(resourceID: string): Observable<string> {
    return this.http.delete(`${this.writePort}/api/resources/${resourceID}`, {
      responseType: 'text',
    });
  }
}
