import { createAction, props } from '@ngrx/store';
import { Resource } from 'src/app/core/modles/resource.model';

export const toggleResourceCode = createAction(
  '[Resource Page] Toggle Dat Code'
);

export const setCurrentResource = createAction(
  '[Resource Page] Set Current Resource',
  props<{ currentResourceId: string }>()
);

export const clearCurrentResource = createAction(
  '[Resource Page] Clear Current Resource'
);

export const initializeCurrentResource = createAction(
  '[Resource Page] Initialize Current Resource',
  props<{ name: string }>()
);

export const loadResourceList = createAction('[Resource Page] Load');

export const updateResource = createAction(
  '[Resource Page] Update Resource',
  props<{ resource: Resource }>()
);

export const createResource = createAction(
  '[Resource Page] Create Resource',
  props<{ resource: Resource }>()
);

export const deleteResource = createAction(
  '[Resource Page] Delete Resource',
  props<{ resourceId: string }>()
);
