import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionStorageService } from './sessiont-storage.service';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor(private ssService: SessionStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.ssService.getCurrentUser();
    const userToken = (user && user.accessToken) ? `Bearer ${user.accessToken}` : '';
    req.headers.set('Authorization', `${userToken}`);
    let modifiedReq = req.clone({
      headers: req.headers
        .set('Authorization', userToken)
        .set('Accept', 'application/json'),
    });
    return next.handle(modifiedReq);
  }
}
