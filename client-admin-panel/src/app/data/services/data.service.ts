import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import { Data } from '../../core/modles/data.model';
import { DataNetworkService } from 'src/app/core/services/network/data-network.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as LoadingPageActions from 'src/app/state/loading.actions';
import { AppFetchErrorHandlerService } from 'src/app/core/services/fetch-error-handler.service';

@Injectable()
export class DataService {
  constructor(
    private appFetchErrorHandlerService: AppFetchErrorHandlerService,
    private networkService: DataNetworkService,
    private store: Store<State>
  ) {}

  getDataList(catHiararcy: string): Observable<Data[]> {
    return this.addLaoding(
      this.networkService.getDataByCatagory(catHiararcy).pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError.bind(this))
      )
    );
  }

  createData(data: Data): Observable<Data> {
    // Data Id must be null for the Web API to assign an Id
    const newData = { ...data, id: null };
    return this.addLaoding(
      this.networkService.addData(newData).pipe(
        tap((data) => console.log('createData: ' + JSON.stringify(data))),
        catchError(this.handleError.bind(this))
      )
    );
  }

  deleteData(id: number): Observable<void> {
    return this.addLaoding(
      this.networkService.deleteData(id).pipe(
        tap((data) => console.log('deleteData: ' + id)),
        catchError(this.handleError.bind(this))
      )
    );
  }

  updateData(data: Data): Observable<Data> {
    return this.addLaoding(
      this.networkService.updateData(data).pipe(
        tap(() => console.log('updateData: ' + data.id)),
        // Return the data on an update
        map(() => data),
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
