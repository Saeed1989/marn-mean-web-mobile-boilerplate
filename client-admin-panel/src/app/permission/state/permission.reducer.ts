import { createReducer, on } from '@ngrx/store';
import { Permission } from 'src/app/core/modles/permission.model';
import { PermissionApiActions, PermissionPageActions } from './actions';

export interface PerState {
  showPermissionCode: boolean;
  currentPermissionId: string | null;
  permissionList: Permission[];
  error: string;
}

const initialState: PerState = {
  showPermissionCode: true,
  currentPermissionId: null,
  permissionList: [],
  error: '',
};

export const permissionReducer = createReducer<PerState>(
  initialState,
  on(PermissionPageActions.togglePermissionCode, (state): PerState => {
    return {
      ...state,
      showPermissionCode: !state.showPermissionCode,
    };
  }),
  on(PermissionPageActions.setCurrentPermission, (state, action): PerState => {
    return {
      ...state,
      currentPermissionId: action.currentPermissionId,
    };
  }),
  on(PermissionPageActions.clearCurrentPermission, (state): PerState => {
    return {
      ...state,
      currentPermissionId: null,
    };
  }),
  on(PermissionPageActions.initializeCurrentPermission, (state, action): PerState => {
    return {
      ...state,
    };
  }),
  on(PermissionApiActions.loadPermissionSuccess, (state, action): PerState => {
    console.log(action);
    return {
      ...state,
      permissionList: action.permissionList,
      error: '',
    };
  }),
  on(PermissionApiActions.loadPermissionFailure, (state, action): PerState => {
    return {
      ...state,
      permissionList: [],
      error: action.error,
    };
  }),
  on(PermissionApiActions.updatePermissionSuccess, (state, action): PerState => {
    const updatedPermissionList = state.permissionList.map((item) =>
      action.permission.roleName === item.roleName ? action.permission : item
    );
    return {
      ...state,
      permissionList: updatedPermissionList,
      currentPermissionId: action.permission.roleName,
      error: '',
    };
  }),
  on(PermissionApiActions.updatePermissionFailure, (state, action): PerState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  // After a create, the currentPermission is the new permission.
  on(PermissionApiActions.createPermissionSuccess, (state, action): PerState => {
    console.log('create permission success');
    console.log(action.permission);
    const updatedPermissionList = [...state.permissionList, action.permission];
    return {
      ...state,
      permissionList: updatedPermissionList,
      currentPermissionId: action.permission.roleName,
      error: '',
    };
  }),
  on(PermissionApiActions.createPermissionFailure, (state, action): PerState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  // After a delete, the currentPermission is null.
  on(PermissionApiActions.deletePermissionSuccess, (state, action): PerState => {
    return {
      ...state,
      permissionList: state.permissionList.filter((permission) => permission.roleName !== action.permissionId),
      currentPermissionId: null,
      error: '',
    };
  }),
  on(PermissionApiActions.deletePermissionFailure, (state, action): PerState => {
    return {
      ...state,
      error: action.error,
    };
  })
);
