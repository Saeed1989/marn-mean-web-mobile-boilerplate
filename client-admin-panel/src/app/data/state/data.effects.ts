import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DataService } from '../services/data.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataApiActions, DataPageActions } from './actions';

@Injectable()
export class DataEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  loadDataList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DataPageActions.loadDataList),
      mergeMap((action) =>
        this.dataService.getDataList(action.catHierarchy).pipe(
          map((dataList) => DataApiActions.loadDataSuccess({ dataList })),
          catchError((error) => of(DataApiActions.loadDataFailure({ error })))
        )
      )
    );
  });

  updateData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DataPageActions.updateData),
      concatMap((action) =>
        this.dataService.updateData(action.data).pipe(
          map((data) => DataApiActions.updateDataSuccess({ data })),
          catchError((error) => of(DataApiActions.updateDataFailure({ error })))
        )
      )
    );
  });

  createData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DataPageActions.createData),
      concatMap((action) =>
        this.dataService.createData(action.data).pipe(
          tap((dataId) => console.log(dataId)),
          map((dataId) =>
            DataApiActions.createDataSuccess({
              data: { ...action.data, id: dataId },
            })
          ),
          catchError((error) => of(DataApiActions.createDataFailure({ error })))
        )
      )
    );
  });

  deleteData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DataPageActions.deleteData),
      mergeMap((action) =>
        this.dataService.deleteData(action.dataId).pipe(
          map(() =>
            DataApiActions.deleteDataSuccess({ dataId: action.dataId })
          ),
          catchError((error) => of(DataApiActions.deleteDataFailure({ error })))
        )
      )
    );
  });
}
