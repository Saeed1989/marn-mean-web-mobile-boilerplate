import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { CatagoryState } from './catagory.reducer';

export interface State extends AppState.State {
  catagoryList: CatagoryState;
}

const getCatagoryFeatureState = createFeatureSelector<CatagoryState>('catagoryList');

export const getShowCatagoryCode = createSelector(
  getCatagoryFeatureState,
  (state) => state.showCatagoryCode
);

export const getCurrentCatagoryId = createSelector(
  getCatagoryFeatureState,
  (state) => state.currentCatagoryId
);

export const getCurrentCatagory = createSelector(
  getCatagoryFeatureState,
  getCurrentCatagoryId,
  (state, currentCatagoryId) => {
    if (currentCatagoryId === '0') {
      return {
        id: '0',
        catName: '0',
        sku: '0',
        description: '0',
        parentSku: '0',
      };
    } else {
      return currentCatagoryId
        ? state.catagoryList.find((p) => p.id === currentCatagoryId)
        : null;
    }
  }
);

export const getCatagoryList = createSelector(
  getCatagoryFeatureState,
  (state) => state.catagoryList
);

export const getError = createSelector(
  getCatagoryFeatureState,
  (state) => state.error
);
