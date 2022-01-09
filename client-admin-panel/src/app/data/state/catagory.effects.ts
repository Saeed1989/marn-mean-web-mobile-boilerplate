import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CatagoryService } from '../services/catagory.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CatagoryApiActions, CatagoryPageActions } from './actions';

@Injectable()
export class CatagoryEffects {
  constructor(
    private actions$: Actions,
    private catagoryService: CatagoryService
  ) {}

  loadCatagoryList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CatagoryPageActions.loadCatagoryList),
      mergeMap((action) =>
        this.catagoryService.getCatagoryList().pipe(
          map((catagoryList) => CatagoryApiActions.loadCatagorySuccess({ catagoryList })),
          catchError((error) =>
            of(CatagoryApiActions.loadCatagoryFailure({ error }))
          )
        )
      )
    );
  });

  updateCatagory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CatagoryPageActions.updateCatagory),
      concatMap((action) =>
        this.catagoryService.updateCatagory(action.catagory).pipe(
          map((catagory) => CatagoryApiActions.updateCatagorySuccess({ catagory })),
          catchError((error) =>
            of(CatagoryApiActions.updateCatagoryFailure({ error }))
          )
        )
      )
    );
  });

  createCatagory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CatagoryPageActions.createCatagory),
      concatMap((action) =>
        this.catagoryService.createCatagory(action.catagory).pipe(
          tap((catagory) => console.log(catagory)),
          map((catagory) => CatagoryApiActions.createCatagorySuccess({ catagory })),
          catchError((error) =>
            of(CatagoryApiActions.createCatagoryFailure({ error }))
          )
        )
      )
    );
  });

  deleteCatagory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CatagoryPageActions.deleteCatagory),
      mergeMap((action) =>
        this.catagoryService.deleteCatagory(action.catagoryId).pipe(
          map(() =>
            CatagoryApiActions.deleteCatagorySuccess({ catagoryId: action.catagoryId })
          ),
          catchError((error) =>
            of(CatagoryApiActions.deleteCatagoryFailure({ error }))
          )
        )
      )
    );
  });
}
