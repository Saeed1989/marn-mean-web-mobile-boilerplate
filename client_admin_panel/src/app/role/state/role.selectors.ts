import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { ResState } from './role.reducer';

export interface State extends AppState.State {
  roleList: ResState;
}

const getRoleFeatureState = createFeatureSelector<ResState>('roleList');

export const getShowRoleCode = createSelector(
  getRoleFeatureState,
  (state) => state.showRoleCode
);

export const getCurrentRoleId = createSelector(
  getRoleFeatureState,
  (state) => state.currentRoleId
);

export const getCurrentRole = createSelector(
  getRoleFeatureState,
  getCurrentRoleId,
  (state, currentRoleId) => {
    if (currentRoleId === '0') {
      return {
        id: '0',
        name: '',
        alias: '',
      };
    } else {
      return currentRoleId
        ? state.roleList.find((p) => p.id === currentRoleId)
        : null;
    }
  }
);

export const getRoleList = createSelector(
  getRoleFeatureState,
  (state) => state.roleList
);

export const getRoleError = createSelector(
  getRoleFeatureState,
  (state) => state.error
);
