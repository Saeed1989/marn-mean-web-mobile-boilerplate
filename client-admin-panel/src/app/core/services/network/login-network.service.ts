import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../../modles/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginNetworkService {
  rootUrl = '5003';
  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<User> {
    console.log('Log in.');
    return this.http.post<User>(`${this.rootUrl}/api/auth/login`, {
      username: userName,
      password: password,
    });
  }
}
