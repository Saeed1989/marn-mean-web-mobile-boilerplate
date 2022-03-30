import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { PerState } from './permission.reducer';

export interface State extends AppState.State {
  permissionList: PerState;
}

const getPermissionFeatureState = createFeatureSelector<PerState>('permissionList');

export const getShowPermissionCode = createSelector(
  getPermissionFeatureState,
  (state) => state.showPermissionCode
);

export const getCurrentPermissionId = createSelector(
  getPermissionFeatureState,
  (state) => state.currentPermissionId
);

export const getCurrentPermission = createSelector(
  getPermissionFeatureState,
  getCurrentPermissionId,
  (state, currentPermissionId) => {
    if (currentPermissionId === '0') {
      return {
        id: '0',
        roleName: '',
        resourceName: '',
        isAllowed: false,
        isDisabled: false,
      };
    } else {
      return currentPermissionId
        ? state.permissionList.find((p) => p.id === currentPermissionId)
        : null;
    }
  }
);

export const getPermissionList = createSelector(
  getPermissionFeatureState,
  (state) => state.permissionList
);

export const getPermissionError = createSelector(
  getPermissionFeatureState,
  (state) => state.error
);
