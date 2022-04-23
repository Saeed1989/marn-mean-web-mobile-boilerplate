import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { ResState } from './resource.reducer';

export interface State extends AppState.State {
  resourceList: ResState;
}

const getResourceFeatureState = createFeatureSelector<ResState>('resourceList');

export const getShowResourceCode = createSelector(
  getResourceFeatureState,
  (state) => state.showResourceCode
);

export const getCurrentResourceId = createSelector(
  getResourceFeatureState,
  (state) => state.currentResourceId
);

export const getCurrentResource = createSelector(
  getResourceFeatureState,
  getCurrentResourceId,
  (state, currentResourceId) => {
    if (currentResourceId === '0') {
      return {
        id: '0',
        name: '',
        type: '',
      };
    } else {
      return currentResourceId
        ? state.resourceList.find((p) => p.id === currentResourceId)
        : null;
    }
  }
);

export const getResourceList = createSelector(
  getResourceFeatureState,
  (state) => state.resourceList
);

export const getResourceError = createSelector(
  getResourceFeatureState,
  (state) => state.error
);
