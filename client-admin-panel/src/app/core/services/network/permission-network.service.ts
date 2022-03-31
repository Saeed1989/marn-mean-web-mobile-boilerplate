import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Permission } from '../../modles/permission.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionNetworkService {
  readPort = '5003';
  writePort = '5003';
  constructor(private http: HttpClient) {}

  getCatagories(): Observable<any> {
    console.log('Getting all permission from the server.');
    return this.http.get<any>(`${this.readPort}/api/permissions`);
  }

  getPermissionById(id: number): Observable<Permission> {
    return this.http.get<Permission>(`${this.readPort}/api/permissions/${id}`);
  }

  addPermission(permission: Permission): Observable<string> {
    const paylodad = {
      roleName: permission.roleName,
      resourceName: permission.resourceName,
      isDisabled: permission.isDisabled,
      isAllowed: permission.isAllowed,
    };
    return this.http.post<string>(`${this.writePort}/api/permissions`, paylodad);
  }

  updatePermission(updatedPermission: Permission): Observable<string> {
    const paylodad = {
      roleName: updatedPermission.roleName,
      resourceName: updatedPermission.resourceName,
      isDisabled: updatedPermission.isDisabled,
      isAllowed: updatedPermission.isAllowed,
    };
    return this.http.put(
      `${this.writePort}/api/permissions/${updatedPermission.id}`,
      paylodad,
      { responseType: 'text' }
    );
  }

  deletePermission(permissionID: string): Observable<string> {
    return this.http.delete(`${this.writePort}/api/permissions/${permissionID}`, {
      responseType: 'text',
    });
  }
}
