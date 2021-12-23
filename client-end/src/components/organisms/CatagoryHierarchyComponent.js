import React from "react";
import { AppContext } from "../../contexts/app";
import {
  UPDATE_DATA,
  UPDATE_SELECT_CAT_LIST,
} from "../../constants/appActions";
import { getSelectedCatList } from "../../utils/catHierarchy";
import { YesNoModal } from "../molecules/YesNoModal";

const CatagoryView = (props) => {
  const { cat, onSelect } = props;
  const onClick = () => {
    onSelect();
  };

  return (
    <>
      <button className="badge bg-secondary" onClick={onClick}>
        {cat.catName}
      </button>{" "}
    </>
  );
};

export const CatagoryHierarchyComponent = () => {
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const CONFIRM_MESSAGE = "Do you want to clear all?";

  const [state, dispatch] = React.useContext(AppContext);
  const { selctedCatList } = state;

  const confirmResultHandle = (result) => {
    console.log("result");
    setShowConfirmDialog(false);
    if (result) {
      clearAll();
    }
  };

  const onSelect = (indx) => {
    if (indx !== selctedCatList.length - 1) {
      const newSlectedCatList = selctedCatList.slice(0, indx + 1);
      console.log(newSlectedCatList);
      const selectedCat = selctedCatList[indx];

      dispatch({
        type: UPDATE_SELECT_CAT_LIST,
        selctedCatList: newSlectedCatList,
      });

      dispatch({
        type: UPDATE_DATA,
        dataList: getSelectedCatList(state.catagoryList, selectedCat.sku),
      });
    }
  };

  const clearAll = () => {
    dispatch({
      type: UPDATE_SELECT_CAT_LIST,
      selctedCatList: [],
    });

    dispatch({
      type: UPDATE_DATA,
      dataList: getSelectedCatList(state.catagoryList, ""),
    });
  };

  const onClearAll = () => {
    setShowConfirmDialog(true);
  };

  return (
    <>
      <h5>
        {selctedCatList.length > 0 ? (
          <span>
            <button className="badge bg-danger" onClick={onClearAll}>
              X
            </button>{" "}
          </span>
        ) : null}
        {selctedCatList.map((cat, indx) => (
          <CatagoryView
            key={indx}
            cat={cat}
            onSelect={() => onSelect(indx)}
          ></CatagoryView>
        ))}
      </h5>
      <div>
        <YesNoModal
          isShow={showConfirmDialog}
          result={confirmResultHandle}
          message={CONFIRM_MESSAGE}
        ></YesNoModal>
      </div>
    </>
  );
};
