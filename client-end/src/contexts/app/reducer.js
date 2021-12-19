import * as AppActions from "../../constants/appActions";

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
        catagoryList: action.catagoryList,
      };

    case AppActions.UPDATE_SELECT_CAT_LIST:
      console.log(action.selctedCatList);
      return {
        ...state,
        selctedCatList: action.selctedCatList,
      };

    default:
      return state;
  }
};

export const initialState = {
  dataList: [],
  catagoryList: [],
  selctedCatList: [],
};
