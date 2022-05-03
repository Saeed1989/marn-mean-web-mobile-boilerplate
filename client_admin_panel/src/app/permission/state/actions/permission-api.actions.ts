import { createAction, props } from '@ngrx/store';
import { Permission } from 'src/app/core/modles/permission.model';

export const loadPermissionSuccess = createAction(
  '[Permission API] Load Success',
  props<{ permissionList: Permission[] }>()
);

export const loadPermissionFailure = createAction(
  '[Permission API] Load Fail',
  props<{ error: string }>()
);

export const updatePermissionSuccess = createAction(
  '[Permission API] Update Permission Success',
  props<{ permission: Permission }>()
);

export const updatePermissionFailure = createAction(
  '[Permission API] Update Permission Fail',
  props<{ error: string }>()
);

export const createPermissionSuccess = createAction(
  '[Permission API] Create Permission Success',
  props<{ permission: Permission }>()
);

export const createPermissionFailure = createAction(
  '[Permission API] Create Permission Fail',
  props<{ error: string }>()
);

export const deletePermissionSuccess = createAction(
  '[Permission API] Delete Permission Success',
  props<{ permissionId: string }>()
);

export const deletePermissionFailure = createAction(
  '[Permission API] Delete Permission Fail',
  props<{ error: string }>()
);
