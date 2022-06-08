import React from "react";
import {
  UPDATE_DATA,
  UPDATE_ERROR,
  UPDATE_SELECT_CAT_LIST,
} from "../../constants/appActions";
import { AppContext } from "../../contexts/app";
import { getCatHierarchy, getSelectedCatList } from "../../utils/catHierarchy";
import { DataView } from "../molecules/DataView";
import * as DATA_API from "../../services/dataService";
import { openUrlInNewTab } from "../../services/browserUtilsService";

export const DataListComponent = () => {
  const [state, dispatch] = React.useContext(AppContext);
  const { dataList } = state;

  const onSelect = (data) => {
    if (data.catName) {
      const newSelectedCataList = [...state.selctedCatList, data];
      dispatch({
        type: UPDATE_SELECT_CAT_LIST,
        selctedCatList: newSelectedCataList,
      });
      const catList = getSelectedCatList(state.categoryList, data.sku);
      if (catList && catList.length > 0) {
        dispatch({
          type: UPDATE_DATA,
          dataList: catList,
        });
      } else {
        reloadData(newSelectedCataList);
      }
    } else {
      // show link in browser
      if(!data.type || data.type === "WEB") {
        console.log(data);
        openUrlInNewTab("google.com");
      }
    }
  };

  const reloadData = async (categoryList) => {
    console.log(categoryList);
    DATA_API.getData(getCatHierarchy(categoryList))
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
          {dataList && dataList.length > 0 && dataList[0].name ? <h5>Data List:</h5> : <h5>Cat List:</h5>}
          {dataList.map((data, indx) => (
            <DataView key={indx} onSelect={onSelect} data={data}></DataView>
          ))}
        </div>
      </div>
    </div>
  );
};
