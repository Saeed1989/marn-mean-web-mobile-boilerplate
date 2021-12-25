import React from "react";
import {
  UPDATE_DATA,
  UPDATE_ERROR,
  UPDATE_SELECT_CAT_LIST,
} from "../../constants/appActions";
import { AppContext } from "../../contexts/app";
import { getCatHierarchy, getSelectedCatList } from "../../utils/catHierarchy";
import * as DATA_API from "../../services/dataService";

export const DataView = (props) => {
  const { data, onSelect } = props;

  const onClick = () => {
    onSelect(data);
  };

  return (
    <button type="button" className="btn btn-primary" onClick={onClick}>
      {data.name || data.catName}
    </button>
  );
};

export const DalaListComponent = () => {
  const [state, dispatch] = React.useContext(AppContext);
  const { dataList } = state;

  const onSelect = (data) => {
    if (data.catName) {
      const newSelectedCataList = [...state.selctedCatList, data];
      dispatch({
        type: UPDATE_SELECT_CAT_LIST,
        selctedCatList: newSelectedCataList,
      });
      const dataList = getSelectedCatList(state.catagoryList, data.sku);
      if (dataList && dataList.length > 0) {
        dispatch({
          type: UPDATE_DATA,
          dataList: dataList,
        });
      } else {
        reloadData(newSelectedCataList);
      }
    } else {
      alert(data.name);
    }
  };

  const reloadData = async (catagoryList) => {
    console.log(catagoryList);
    DATA_API.getData(getCatHierarchy(catagoryList))
      .then((dataList) => {
        dispatch({
          type: UPDATE_DATA,
          dataList: dataList,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_ERROR,
          error: {
            msg: "Something went wrong",
          },
        });
      });
  };

  return (
    <div className="d-flex flex-column flex-fill">
      <div className="row justify-content-center align-self-center">
        <div className="d-grid gap-2" style={{ minWidth: "18rem" }}>
          {dataList.map((data, indx) => (
            <DataView key={indx} onSelect={onSelect} data={data}></DataView>
          ))}
        </div>
      </div>
    </div>
  );
};
