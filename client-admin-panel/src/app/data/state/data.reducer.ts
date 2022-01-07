import { Data } from '../../core/modles/data.model';
import { DataApiActions, DataPageActions } from './actions';
import { createReducer, on } from '@ngrx/store';

export interface DataState {
  showDataCode: boolean;
  currentDataId: number | null;
  dataList: Data[];
  error: string;
}

const initialState: DataState = {
  showDataCode: true,
  currentDataId: null,
  dataList: [],
  error: '',
};

export const dataReducer = createReducer<DataState>(
  initialState,
  on(DataPageActions.toggleDataCode, (state): DataState => {
    return {
      ...state,
      showDataCode: !state.showDataCode,
    };
  }),
  on(DataPageActions.setCurrentData, (state, action): DataState => {
    return {
      ...state,
      currentDataId: action.currentDataId,
    };
  }),
  on(DataPageActions.clearCurrentData, (state): DataState => {
    return {
      ...state,
      currentDataId: null,
    };
  }),
  on(DataPageActions.initializeCurrentData, (state): DataState => {
    return {
      ...state,
      currentDataId: 0,
    };
  }),
  on(DataApiActions.loadDataSuccess, (state, action): DataState => {
    return {
      ...state,
      dataList: action.dataList,
      error: '',
    };
  }),
  on(DataApiActions.loadDataFailure, (state, action): DataState => {
    return {
      ...state,
      dataList: [],
      error: action.error,
    };
  }),
  on(DataApiActions.updateDataSuccess, (state, action): DataState => {
    const updatedDataList = state.dataList.map((item) =>
      action.data.id === item.id ? action.data : item
    );
    return {
      ...state,
      dataList: updatedDataList,
      currentDataId: action.data.id,
      error: '',
    };
  }),
  on(DataApiActions.updateDataFailure, (state, action): DataState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  // After a create, the currentData is the new data.
  on(DataApiActions.createDataSuccess, (state, action): DataState => {
    return {
      ...state,
      dataList: [...state.dataList, action.data],
      currentDataId: action.data.id,
      error: '',
    };
  }),
  on(DataApiActions.createDataFailure, (state, action): DataState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  // After a delete, the currentData is null.
  on(DataApiActions.deleteDataSuccess, (state, action): DataState => {
    return {
      ...state,
      dataList: state.dataList.filter((data) => data.id !== action.dataId),
      currentDataId: null,
      error: '',
    };
  }),
  on(DataApiActions.deleteDataFailure, (state, action): DataState => {
    return {
      ...state,
      error: action.error,
    };
  })
);
