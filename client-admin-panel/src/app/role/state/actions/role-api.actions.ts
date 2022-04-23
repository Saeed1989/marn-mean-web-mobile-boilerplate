import { createAction, props } from '@ngrx/store';
import { Role } from 'src/app/core/modles/role.model';

export const loadRoleSuccess = createAction(
  '[Role API] Load Success',
  props<{ roleList: Role[] }>()
);

export const loadRoleFailure = createAction(
  '[Role API] Load Fail',
  props<{ error: string }>()
);

export const updateRoleSuccess = createAction(
  '[Role API] Update Role Success',
  props<{ role: Role }>()
);

export const updateRoleFailure = createAction(
  '[Role API] Update Role Fail',
  props<{ error: string }>()
);

export const createRoleSuccess = createAction(
  '[Role API] Create Role Success',
  props<{ role: Role }>()
);

export const createRoleFailure = createAction(
  '[Role API] Create Role Fail',
  props<{ error: string }>()
);

export const deleteRoleSuccess = createAction(
  '[Role API] Delete Role Success',
  props<{ roleId: string }>()
);

export const deleteRoleFailure = createAction(
  '[Role API] Delete Role Fail',
  props<{ error: string }>()
);
