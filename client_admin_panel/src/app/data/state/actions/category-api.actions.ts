import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/core/modles/category.model';

export const loadCategorySuccess = createAction(
  '[Category API] Load Success',
  props<{ categoryList: Category[] }>()
);

export const loadCategoryFailure = createAction(
  '[Category API] Load Fail',
  props<{ error: string }>()
);

export const updateCategorySuccess = createAction(
  '[Category API] Update Category Success',
  props<{ category: Category }>()
);

export const updateCategoryFailure = createAction(
  '[Category API] Update Category Fail',
  props<{ error: string }>()
);

export const createCategorySuccess = createAction(
  '[Category API] Create Category Success',
  props<{ category: Category }>()
);

export const createCategoryFailure = createAction(
  '[Category API] Create Category Fail',
  props<{ error: string }>()
);

export const deleteCategorySuccess = createAction(
  '[Category API] Delete Category Success',
  props<{ categoryId: string }>()
);

export const deleteCategoryFailure = createAction(
  '[Category API] Delete Category Fail',
  props<{ error: string }>()
);
