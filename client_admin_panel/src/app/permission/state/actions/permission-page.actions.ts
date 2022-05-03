import { createAction, props } from '@ngrx/store';
import { Permission } from 'src/app/core/modles/permission.model';

export const togglePermissionCode = createAction(
  '[Permission Page] Toggle Dat Code'
);

export const setCurrentPermission = createAction(
  '[Permission Page] Set Current Permission',
  props<{ currentPermissionId: string}>()
  );
  
  export const clearCurrentPermission = createAction(
    '[Permission Page] Clear Current Permission'
    );
    
    export const initializeCurrentPermission = createAction(
      '[Permission Page] Initialize Current Permission',
      props<{ roleName: string }>()
);

export const loadPermissionList = createAction('[Permission Page] Load');

export const updatePermission = createAction(
  '[Permission Page] Update Permission',
  props<{ permission: Permission }>()
);

export const createPermission = createAction(
  '[Permission Page] Create Permission',
  props<{ permission: Permission }>()
);

export const deletePermission = createAction(
  '[Permission Page] Delete Permission',
  props<{ permissionId: string }>()
);
