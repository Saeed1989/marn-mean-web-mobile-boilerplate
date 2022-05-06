import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import { CategoryNetworkService } from 'src/app/core/services/network/category-network.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as LoadingPageActions from 'src/app/state/loading.actions';
import { AppFetchErrorHandlerService } from 'src/app/core/services/fetch-error-handler.service';
import { Category } from 'src/app/core/modles/category.model';

@Injectable()
export class CategoryService {
  constructor(
    private appFetchErrorHandlerService: AppFetchErrorHandlerService,
    private networkService: CategoryNetworkService,
    private store: Store<State>
  ) {}

  getCategoryList(): Observable<Category[]> {
    console.log('get...');
    return this.addLaoding(
      this.networkService.getCategories().pipe(
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

  createCategory(category: Category): Observable<string> {
    // Category Id must be null for the Web API to assign an Id
    const newCategory = { ...category, id: null };
    return this.addLaoding(
      this.networkService.addCategory(newCategory).pipe(
        tap((category) => console.log('createCategory: ' + JSON.stringify(category))),
        catchError(this.handleError.bind(this))
      )
    );
  }

  deleteCategory(id: string): Observable<void> {
    return this.addLaoding(
      this.networkService.deleteCategory(id).pipe(
        tap((category) => console.log('deleteCategory: ' + id)),
        catchError(this.handleError.bind(this))
      )
    );
  }

  updateCategory(category: Category): Observable<Category> {
    return this.addLaoding(
      this.networkService.updateCategory(category).pipe(
        tap(() => console.log('updateCategory: ' + category.id)),
        // Return the category on an update
        map(() => category),
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
