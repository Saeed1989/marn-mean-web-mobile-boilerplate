import { createAction, props } from '@ngrx/store';
import { Catagory } from 'src/app/core/modles/catagory.model';

export const loadCatagorySuccess = createAction(
  '[Catagory API] Load Success',
  props<{ catagoryList: Catagory[] }>()
);

export const loadCatagoryFailure = createAction(
  '[Catagory API] Load Fail',
  props<{ error: string }>()
);

export const updateCatagorySuccess = createAction(
  '[Catagory API] Update Catagory Success',
  props<{ catagory: Catagory }>()
);

export const updateCatagoryFailure = createAction(
  '[Catagory API] Update Catagory Fail',
  props<{ error: string }>()
);

export const createCatagorySuccess = createAction(
  '[Catagory API] Create Catagory Success',
  props<{ catagory: Catagory }>()
);

export const createCatagoryFailure = createAction(
  '[Catagory API] Create Catagory Fail',
  props<{ error: string }>()
);

export const deleteCatagorySuccess = createAction(
  '[Catagory API] Delete Catagory Success',
  props<{ catagoryId: string }>()
);

export const deleteCatagoryFailure = createAction(
  '[Catagory API] Delete Catagory Fail',
  props<{ error: string }>()
);
