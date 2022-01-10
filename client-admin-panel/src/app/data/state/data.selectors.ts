import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { DataState } from './data.reducer';

export interface State extends AppState.State {
  dataList: DataState;
}

const getDataFeatureState = createFeatureSelector<DataState>('dataList');

export const getShowDataCode = createSelector(
  getDataFeatureState,
  (state) => state.showDataCode
);

export const getCurrentDataId = createSelector(
  getDataFeatureState,
  (state) => state.currentDataId
);

export const getCurrentCatHiararcy = createSelector(
  getDataFeatureState,
  (state) => state.currentCatHiararchy
);


export const getCurrentData = createSelector(
  getDataFeatureState,
  getCurrentDataId,
  (state, currentDataId) => {
    if (currentDataId === '0') {
      return {
        id: '0',
        name: '',
        catagory: state.currentCatHiararchy,
        description: ''
      };
    } else {
      return currentDataId
        ? state.dataList.find((p) => p.id === currentDataId)
        : null;
    }
  }
);

export const getDataList = createSelector(
  getDataFeatureState,
  (state) => state.dataList
);

export const getError = createSelector(
  getDataFeatureState,
  (state) => state.error
);
