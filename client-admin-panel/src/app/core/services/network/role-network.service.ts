import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Role } from '../../modles/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleNetworkService {
  readPort = '5003';
  writePort = '5003';
  constructor(private http: HttpClient) {}

  getRoles(): Observable<any> {
    console.log('Getting all role from the server.');
    return this.http.get<any>(`${this.readPort}/api/roles`);
  }

  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.readPort}/api/roles/${id}`);
  }

  addRole(role: Role): Observable<string> {
    const paylodad = {
      name: role.name,
      alias: role.alias,
    };
    return this.http.post<string>(`${this.writePort}/api/roles`, paylodad);
  }

  updateRole(updatedRole: Role): Observable<string> {
    const paylodad = {
      id: updatedRole.id,
      name: updatedRole.name,
      alias: updatedRole.alias,
    };
    return this.http.put(
      `${this.writePort}/api/roles/${updatedRole.id}`,
      paylodad,
      { responseType: 'text' }
    );
  }

  deleteRole(roleID: string): Observable<string> {
    return this.http.delete(`${this.writePort}/api/roles/${roleID}`, {
      responseType: 'text',
    });
  }
}
