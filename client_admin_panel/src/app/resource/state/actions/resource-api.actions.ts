import { createAction, props } from '@ngrx/store';
import { Resource } from 'src/app/core/modles/resource.model';

export const loadResourceSuccess = createAction(
  '[Resource API] Load Success',
  props<{ resourceList: Resource[] }>()
);

export const loadResourceFailure = createAction(
  '[Resource API] Load Fail',
  props<{ error: string }>()
);

export const updateResourceSuccess = createAction(
  '[Resource API] Update Resource Success',
  props<{ resource: Resource }>()
);

export const updateResourceFailure = createAction(
  '[Resource API] Update Resource Fail',
  props<{ error: string }>()
);

export const createResourceSuccess = createAction(
  '[Resource API] Create Resource Success',
  props<{ resource: Resource }>()
);

export const createResourceFailure = createAction(
  '[Resource API] Create Resource Fail',
  props<{ error: string }>()
);

export const deleteResourceSuccess = createAction(
  '[Resource API] Delete Resource Success',
  props<{ resourceId: string }>()
);

export const deleteResourceFailure = createAction(
  '[Resource API] Delete Resource Fail',
  props<{ error: string }>()
);
