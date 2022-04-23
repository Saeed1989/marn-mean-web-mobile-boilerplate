import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as LoadingPageActions from 'src/app/state/loading.actions';
import { AppFetchErrorHandlerService } from 'src/app/core/services/fetch-error-handler.service';
import { Role } from 'src/app/core/modles/role.model';
import { RoleNetworkService } from 'src/app/core/services/network/role-network.service';

@Injectable()
export class RoleService {
  constructor(
    private appFetchErrorHandlerService: AppFetchErrorHandlerService,
    private networkService: RoleNetworkService,
    private store: Store<State>
  ) {}

  getRoleList(): Observable<Role[]> {
    console.log('get...');
    return this.addLaoding(
      this.networkService.getRoles().pipe(
        tap((data) => console.log(JSON.stringify(data))),
        map((res) => {
          if (!res || !res.length) return [];
          res.map((d) => (d.id = d._id));
          return res;
        }),
        catchError(this.handleError.bind(this))
      )
    );
  }

  createRole(role: Role): Observable<string> {
    // Role Id must be null for the Web API to assign an Id
    const newRole = { ...role, id: null };
    return this.addLaoding(
      this.networkService.addRole(newRole).pipe(
        tap((role) =>
          console.log('createRole: ' + JSON.stringify(role))
        ),
        catchError(this.handleError.bind(this))
      )
    );
  }

  deleteRole(id: string): Observable<void> {
    return this.addLaoding(
      this.networkService.deleteRole(id).pipe(
        tap((role) => console.log('deleteRole: ' + id)),
        catchError(this.handleError.bind(this))
      )
    );
  }

  updateRole(role: Role): Observable<Role> {
    return this.addLaoding(
      this.networkService.updateRole(role).pipe(
        tap(() => console.log('updateRole: ' + role.id)),
        // Return the role on an update
        map(() => role),
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
