import { createAction, props } from '@ngrx/store';
import { Role } from 'src/app/core/modles/role.model';

export const toggleRoleCode = createAction(
  '[Role Page] Toggle Dat Code'
);

export const setCurrentRole = createAction(
  '[Role Page] Set Current Role',
  props<{ currentRoleId: string }>()
);

export const clearCurrentRole = createAction(
  '[Role Page] Clear Current Role'
);

export const initializeCurrentRole = createAction(
  '[Role Page] Initialize Current Role',
  props<{ name: string }>()
);

export const loadRoleList = createAction('[Role Page] Load');

export const updateRole = createAction(
  '[Role Page] Update Role',
  props<{ role: Role }>()
);

export const createRole = createAction(
  '[Role Page] Create Role',
  props<{ role: Role }>()
);

export const deleteRole = createAction(
  '[Role Page] Delete Role',
  props<{ roleId: string }>()
);
