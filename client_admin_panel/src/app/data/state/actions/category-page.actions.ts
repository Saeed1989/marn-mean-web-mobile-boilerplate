import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/core/modles/category.model';

export const toggleCategoryCode = createAction(
  '[Category Page] Toggle Dat Code'
);

export const setCurrentCategory = createAction(
  '[Category Page] Set Current Category',
  props<{ currentCategoryId: string }>()
);

export const clearCurrentCategory = createAction(
  '[Category Page] Clear Current Category'
);

export const initializeCurrentCategory = createAction(
  '[Category Page] Initialize Current Category',
  props<{ parentSku: string }>()
);

export const loadCategoryList = createAction('[Category Page] Load');

export const updateCategory = createAction(
  '[Category Page] Update Category',
  props<{ category: Category }>()
);

export const createCategory = createAction(
  '[Category Page] Create Category',
  props<{ category: Category }>()
);

export const deleteCategory = createAction(
  '[Category Page] Delete Category',
  props<{ categoryId: string }>()
);
