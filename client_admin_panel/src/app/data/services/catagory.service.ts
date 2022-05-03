import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import { CatagoryNetworkService } from 'src/app/core/services/network/catagory-network.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as LoadingPageActions from 'src/app/state/loading.actions';
import { AppFetchErrorHandlerService } from 'src/app/core/services/fetch-error-handler.service';
import { Catagory } from 'src/app/core/modles/catagory.model';

@Injectable()
export class CatagoryService {
  constructor(
    private appFetchErrorHandlerService: AppFetchErrorHandlerService,
    private networkService: CatagoryNetworkService,
    private store: Store<State>
  ) {}

  getCatagoryList(): Observable<Catagory[]> {
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

  createCatagory(catagory: Catagory): Observable<string> {
    // Catagory Id must be null for the Web API to assign an Id
    const newCatagory = { ...catagory, id: null };
    return this.addLaoding(
      this.networkService.addCatagory(newCatagory).pipe(
        tap((catagory) => console.log('createCatagory: ' + JSON.stringify(catagory))),
        catchError(this.handleError.bind(this))
      )
    );
  }

  deleteCatagory(id: string): Observable<void> {
    return this.addLaoding(
      this.networkService.deleteCatagory(id).pipe(
        tap((catagory) => console.log('deleteCatagory: ' + id)),
        catchError(this.handleError.bind(this))
      )
    );
  }

  updateCatagory(catagory: Catagory): Observable<Catagory> {
    return this.addLaoding(
      this.networkService.updateCatagory(catagory).pipe(
        tap(() => console.log('updateCatagory: ' + catagory.id)),
        // Return the catagory on an update
        map(() => catagory),
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
