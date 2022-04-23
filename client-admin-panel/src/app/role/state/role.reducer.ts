import { createReducer, on } from '@ngrx/store';
import { Role } from 'src/app/core/modles/role.model';
import { RoleApiActions, RolePageActions } from './actions';

export interface ResState {
  showRoleCode: boolean;
  currentRoleId: string | null;
  roleList: Role[];
  error: string;
}

const initialState: ResState = {
  showRoleCode: true,
  currentRoleId: null,
  roleList: [],
  error: '',
};

export const roleReducer = createReducer<ResState>(
  initialState,
  on(RolePageActions.toggleRoleCode, (state): ResState => {
    return {
      ...state,
      showRoleCode: !state.showRoleCode,
    };
  }),
  on(RolePageActions.setCurrentRole, (state, action): ResState => {
    return {
      ...state,
      currentRoleId: action.currentRoleId,
    };
  }),
  on(RolePageActions.clearCurrentRole, (state): ResState => {
    return {
      ...state,
      currentRoleId: null,
    };
  }),
  on(
    RolePageActions.initializeCurrentRole,
    (state, action): ResState => {
      return {
        ...state,
        currentRoleId: '0',
      };
    }
  ),
  on(RoleApiActions.loadRoleSuccess, (state, action): ResState => {
    console.log(action);
    return {
      ...state,
      roleList: action.roleList,
      error: '',
    };
  }),
  on(RoleApiActions.loadRoleFailure, (state, action): ResState => {
    return {
      ...state,
      roleList: [],
      error: action.error,
    };
  }),
  on(RoleApiActions.updateRoleSuccess, (state, action): ResState => {
    const updatedRoleList = state.roleList.map((item) =>
      action.role.name === item.name ? action.role : item
    );
    return {
      ...state,
      roleList: updatedRoleList,
      currentRoleId: action.role.name,
      error: '',
    };
  }),
  on(RoleApiActions.updateRoleFailure, (state, action): ResState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  // After a create, the currentRole is the new role.
  on(RoleApiActions.createRoleSuccess, (state, action): ResState => {
    console.log('create role success');
    console.log(action.role);
    const updatedRoleList = [...state.roleList, action.role];
    return {
      ...state,
      roleList: updatedRoleList,
      currentRoleId: action.role.name,
      error: '',
    };
  }),
  on(RoleApiActions.createRoleFailure, (state, action): ResState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  // After a delete, the currentRole is null.
  on(RoleApiActions.deleteRoleSuccess, (state, action): ResState => {
    return {
      ...state,
      roleList: state.roleList.filter(
        (role) => role.name !== action.roleId
      ),
      currentRoleId: null,
      error: '',
    };
  }),
  on(RoleApiActions.deleteRoleFailure, (state, action): ResState => {
    return {
      ...state,
      error: action.error,
    };
  })
);
