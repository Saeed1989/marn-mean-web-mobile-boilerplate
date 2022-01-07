import { Data } from '../../../core/modles/data.model';
import { createAction, props } from '@ngrx/store';

export const loadDataSuccess = createAction(
  '[Data API] Load Success',
  props<{ dataList: Data[] }>()
);

export const loadDataFailure = createAction(
  '[Data API] Load Fail',
  props<{ error: string }>()
);

export const updateDataSuccess = createAction(
  '[Data API] Update Data Success',
  props<{ data: Data }>()
);

export const updateDataFailure = createAction(
  '[Data API] Update Data Fail',
  props<{ error: string }>()
);

export const createDataSuccess = createAction(
  '[Data API] Create Data Success',
  props<{ data: Data }>()
);

export const createDataFailure = createAction(
  '[Data API] Create Data Fail',
  props<{ error: string }>()
);

export const deleteDataSuccess = createAction(
  '[Data API] Delete Data Success',
  props<{ dataId: number }>()
);

export const deleteDataFailure = createAction(
  '[Data API] Delete Data Fail',
  props<{ error: string }>()
);
