import * as AppActions from '../../constants/appActions';
import {getSelectedCatList} from '../../utils/catHierarchy/catHierarchy';

export const reducer = (state, action) => {
  switch (action.type) {
    case AppActions.UPDATE_DATA:
      return {
        ...state,
        dataList: action.dataList,
      };

    case AppActions.UPDATE_CAT_LIST:
      return {
        ...state,
        categoryList: action.categoryList,
        dataList: getSelectedCatList(action.categoryList, ''),
      };

    case AppActions.UPDATE_SELECT_CAT_LIST:
      return {
        ...state,
        selctedCatList: action.selctedCatList,
      };

    case AppActions.UPDATE_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case AppActions.UPDATE_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
};

export const initialState = {
  dataList: [],
  categoryList: [],
  selctedCatList: [],
  error: {},
  isLoading: false,
};
