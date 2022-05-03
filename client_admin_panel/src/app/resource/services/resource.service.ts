import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as LoadingPageActions from 'src/app/state/loading.actions';
import { AppFetchErrorHandlerService } from 'src/app/core/services/fetch-error-handler.service';
import { Resource } from 'src/app/core/modles/resource.model';
import { ResourceNetworkService } from 'src/app/core/services/network/resource-network.service';

@Injectable()
export class ResourceService {
  constructor(
    private appFetchErrorHandlerService: AppFetchErrorHandlerService,
    private networkService: ResourceNetworkService,
    private store: Store<State>
  ) {}

  getResourceList(): Observable<Resource[]> {
    console.log('get...');
    return this.addLaoding(
      this.networkService.getResources().pipe(
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

  createResource(resource: Resource): Observable<string> {
    // Resource Id must be null for the Web API to assign an Id
    const newResource = { ...resource, id: null };
    return this.addLaoding(
      this.networkService.addResource(newResource).pipe(
        tap((resource) =>
          console.log('createResource: ' + JSON.stringify(resource))
        ),
        catchError(this.handleError.bind(this))
      )
    );
  }

  deleteResource(id: string): Observable<void> {
    return this.addLaoding(
      this.networkService.deleteResource(id).pipe(
        tap((resource) => console.log('deleteResource: ' + id)),
        catchError(this.handleError.bind(this))
      )
    );
  }

  updateResource(resource: Resource): Observable<Resource> {
    return this.addLaoding(
      this.networkService.updateResource(resource).pipe(
        tap(() => console.log('updateResource: ' + resource.id)),
        // Return the resource on an update
        map(() => resource),
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
