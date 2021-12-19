import React from "react";
import PropTypes from "prop-types";
import { Badge } from "react-bootstrap";
import { AppContext } from "../contexts/app";

const CatagoryView = (props) => {
  const { catName, ...rest } = props;
  return (
    <span>
      <Badge bg="secondary">{catName}</Badge>{" "}
    </span>
  );
};

export const CatagoryHierarchyComponent = () => {
  const [state] = React.useContext(AppContext);
  const { selctedCatList } = state;
  console.log(selctedCatList);
  return (
    <div>
      {selctedCatList.map((cat, indx) => (
        <CatagoryView key={indx} catName={cat.catName}></CatagoryView>
      ))}
    </div>
  );
};
