import { CatagoryApiActions, CatagoryPageActions } from './actions';
import { createReducer, on } from '@ngrx/store';
import { Catagory } from 'src/app/core/modles/catagory.model';

export interface CatagoryState {
  showCatagoryCode: boolean;
  currentCatagoryId: string | null;
  currentParentSku: string;
  catagoryList: Catagory[];
  error: string;
}

const initialState: CatagoryState = {
  showCatagoryCode: true,
  currentCatagoryId: null,
  currentParentSku: '',
  catagoryList: [],
  error: '',
};

export const catagoryReducer = createReducer<CatagoryState>(
  initialState,
  on(CatagoryPageActions.toggleCatagoryCode, (state): CatagoryState => {
    return {
      ...state,
      showCatagoryCode: !state.showCatagoryCode,
    };
  }),
  on(CatagoryPageActions.setCurrentCatagory, (state, action): CatagoryState => {
    return {
      ...state,
      currentCatagoryId: action.currentCatagoryId,
    };
  }),
  on(CatagoryPageActions.clearCurrentCatagory, (state): CatagoryState => {
    return {
      ...state,
      currentCatagoryId: null,
    };
  }),
  on(CatagoryPageActions.initializeCurrentCatagory, (state, action): CatagoryState => {
    return {
      ...state,
      currentCatagoryId: '0',
      currentParentSku: action.parentSku
    };
  }),
  on(CatagoryApiActions.loadCatagorySuccess, (state, action): CatagoryState => {
    return {
      ...state,
      catagoryList: action.catagoryList,
      error: '',
    };
  }),
  on(CatagoryApiActions.loadCatagoryFailure, (state, action): CatagoryState => {
    return {
      ...state,
      catagoryList: [],
      error: action.error,
    };
  }),
  on(CatagoryApiActions.updateCatagorySuccess, (state, action): CatagoryState => {
    const updatedCatagoryList = state.catagoryList.map((item) =>
      action.catagory.id === item.id ? action.catagory : item
    );
    return {
      ...state,
      catagoryList: updatedCatagoryList,
      currentCatagoryId: action.catagory.id,
      error: '',
    };
  }),
  on(CatagoryApiActions.updateCatagoryFailure, (state, action): CatagoryState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  // After a create, the currentCatagory is the new catagory.
  on(CatagoryApiActions.createCatagorySuccess, (state, action): CatagoryState => {
    console.log('create cat success');
    console.log(action.catagory);
    const updatedCatagoryList = [...state.catagoryList, action.catagory];
    return {
      ...state,
      catagoryList: updatedCatagoryList,
      currentCatagoryId: action.catagory.id,
      error: '',
    };
  }),
  on(CatagoryApiActions.createCatagoryFailure, (state, action): CatagoryState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  // After a delete, the currentCatagory is null.
  on(CatagoryApiActions.deleteCatagorySuccess, (state, action): CatagoryState => {
    return {
      ...state,
      catagoryList: state.catagoryList.filter((catagory) => catagory.id !== action.catagoryId),
      currentCatagoryId: null,
      error: '',
    };
  }),
  on(CatagoryApiActions.deleteCatagoryFailure, (state, action): CatagoryState => {
    return {
      ...state,
      error: action.error,
    };
  })
);
