import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryApiActions, CategoryPageActions } from './actions';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}

  loadCategoryList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryPageActions.loadCategoryList),
      mergeMap((action) =>
        this.categoryService.getCategoryList().pipe(
          map((categoryList) =>
            CategoryApiActions.loadCategorySuccess({ categoryList })
          ),
          catchError((error) =>
            of(CategoryApiActions.loadCategoryFailure({ error }))
          )
        )
      )
    );
  });

  updateCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryPageActions.updateCategory),
      concatMap((action) =>
        this.categoryService.updateCategory(action.category).pipe(
          map((category) =>
            CategoryApiActions.updateCategorySuccess({ category })
          ),
          catchError((error) =>
            of(CategoryApiActions.updateCategoryFailure({ error }))
          )
        )
      )
    );
  });

  createCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryPageActions.createCategory),
      concatMap((action) =>
        this.categoryService.createCategory(action.category).pipe(
          tap((catID) => console.log(catID)),
          map((catID) =>
            CategoryApiActions.createCategorySuccess({
              category: { ...action.category, id: catID },
            })
          ),
          catchError((error) =>
            of(CategoryApiActions.createCategoryFailure({ error }))
          )
        )
      )
    );
  });

  deleteCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryPageActions.deleteCategory),
      mergeMap((action) =>
        this.categoryService.deleteCategory(action.categoryId).pipe(
          map(() =>
            CategoryApiActions.deleteCategorySuccess({
              categoryId: action.categoryId,
            })
          ),
          catchError((error) =>
            of(CategoryApiActions.deleteCategoryFailure({ error }))
          )
        )
      )
    );
  });
}
