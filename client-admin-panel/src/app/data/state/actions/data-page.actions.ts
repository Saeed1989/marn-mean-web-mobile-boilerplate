import { Data } from '../../../core/modles/data.model';
import { createAction, props } from '@ngrx/store';

export const toggleDataCode = createAction(
  '[Data Page] Toggle Jersey Number'
);

export const setCurrentData = createAction(
  '[Data Page] Set Current Data',
  props<{ currentDataId: number }>()
);

export const clearCurrentData = createAction(
  '[Data Page] Clear Current Data'
);

export const initializeCurrentData = createAction(
  '[Data Page] Initialize Current Data'
);

export const loadDataList = createAction('[Data Page] Load');

export const updateData = createAction(
  '[Data Page] Update Data',
  props<{ data: Data }>()
);

export const createData = createAction(
  '[Data Page] Create Data',
  props<{ data: Data }>()
);

export const deleteData = createAction(
  '[Data Page] Delete Data',
  props<{ dataId: number }>()
);
