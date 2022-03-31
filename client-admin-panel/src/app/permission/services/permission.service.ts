import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as LoadingPageActions from 'src/app/state/loading.actions';
import { AppFetchErrorHandlerService } from 'src/app/core/services/fetch-error-handler.service';
import { Permission } from 'src/app/core/modles/permission.model';
import { PermissionNetworkService } from 'src/app/core/services/network/permission-network.service';

@Injectable()
export class PermissionService {
  constructor(
    private appFetchErrorHandlerService: AppFetchErrorHandlerService,
    private networkService: PermissionNetworkService,
    private store: Store<State>
  ) {}

  getPermissionList(): Observable<Permission[]> {
    console.log('get...');
    return this.addLaoding(
      this.networkService.getCatagories().pipe(
        tap((data) => console.log(JSON.stringify(data))),
        map((res) => {
          if (!res?.data) return [];
          res.data.map((d) => (d.id = d._id));
          return res.data;
        }),
        catchError(this.handleError.bind(this))
      )
    );
  }

  createPermission(permission: Permission): Observable<string> {
    // Permission Id must be null for the Web API to assign an Id
    const newPermission = { ...permission, id: null };
    return this.addLaoding(
      this.networkService.addPermission(newPermission).pipe(
        tap((permission) => console.log('createPermission: ' + JSON.stringify(permission))),
        catchError(this.handleError.bind(this))
      )
    );
  }

  deletePermission(id: string): Observable<void> {
    return this.addLaoding(
      this.networkService.deletePermission(id).pipe(
        tap((permission) => console.log('deletePermission: ' + id)),
        catchError(this.handleError.bind(this))
      )
    );
  }

  updatePermission(permission: Permission): Observable<Permission> {
    return this.addLaoding(
      this.networkService.updatePermission(permission).pipe(
        tap(() => console.log('updatePermission: ' + permission.id)),
        // Return the permission on an update
        map(() => permission),
        catchError(this.handleError.bind(this))
      )
    );
  }

  private handleError(err: any) {
    let errorMessage = this.appFetchErrorHandlerService.handleError(err);
    return throwError(errorMessage.friendlyMessage);
  }

  private addLaoding(inpObser$: Observable<any>): Observable<any> {
    this.store.dispatch(LoadingPageActions.showLoading());
    return inpObser$.pipe(
      finalize(() => this.store.dispatch(LoadingPageActions.hideLoading()))
    );
  }
}
