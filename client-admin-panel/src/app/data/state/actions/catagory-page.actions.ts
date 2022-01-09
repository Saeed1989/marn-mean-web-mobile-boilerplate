import { createAction, props } from '@ngrx/store';
import { Catagory } from 'src/app/core/modles/catagory.model';

export const toggleCatagoryCode = createAction(
  '[Catagory Page] Toggle Dat Code'
);

export const setCurrentCatagory = createAction(
  '[Catagory Page] Set Current Catagory',
  props<{ currentCatagoryId: string }>()
);

export const clearCurrentCatagory = createAction(
  '[Catagory Page] Clear Current Catagory'
);

export const initializeCurrentCatagory = createAction(
  '[Catagory Page] Initialize Current Catagory'
);

export const loadCatagoryList = createAction('[Catagory Page] Load');

export const updateCatagory = createAction(
  '[Catagory Page] Update Catagory',
  props<{ catagory: Catagory }>()
);

export const createCatagory = createAction(
  '[Catagory Page] Create Catagory',
  props<{ catagory: Catagory }>()
);

export const deleteCatagory = createAction(
  '[Catagory Page] Delete Catagory',
  props<{ catagoryId: string }>()
);
