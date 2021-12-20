import React from "react";
import { Badge } from "react-bootstrap";
import { AppContext } from "../contexts/app";
import { UPDATE_DATA, UPDATE_SELECT_CAT_LIST } from "../constants/appActions";
import { getSelectedCatList } from "../utils/CatHierarchy";

const CatagoryView = (props) => {
  const { cat, onSelect } = props;
  const onClick = () => {
    onSelect();
  };
  return (
    <span>
      <Badge bg="secondary" as="button" onClick={onClick}>
        {cat.catName}
      </Badge>{" "}
    </span>
  );
};

export const CatagoryHierarchyComponent = () => {
  const [state, dispatch] = React.useContext(AppContext);
  const { selctedCatList } = state;

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

  const onClear = () => {
    dispatch({
      type: UPDATE_SELECT_CAT_LIST,
      selctedCatList: [],
    });

    dispatch({
      type: UPDATE_DATA,
      dataList: getSelectedCatList(state.catagoryList, ""),
    });
  };

  return (
    <div>
      {selctedCatList.length > 0 ? (
        <span>
          <Badge bg="danger" as="button" onClick={onClear}>
            X
          </Badge>{" "}
        </span>
      ) : null}
      {selctedCatList.map((cat, indx) => (
        <CatagoryView
          key={indx}
          cat={cat}
          onSelect={() => onSelect(indx)}
        ></CatagoryView>
      ))}
    </div>
  );
};
