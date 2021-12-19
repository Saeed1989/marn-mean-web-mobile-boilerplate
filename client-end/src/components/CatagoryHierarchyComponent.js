import React from "react";
import { Route } from "react-router-dom";
import { NotFound } from "../Pages/NotFound";
import PropTypes from "prop-types";
import { Badge } from "react-bootstrap";
import { Space } from "antd";

const CatagoryView = (props) => {
  const { catName, ...rest } = props;
  return (
    <span>
      <Badge bg="secondary">{catName}</Badge>{" "}
    </span>
  );
};

export const CatagoryHierarchyComponent = (props) => {
  const { catagoryList, ...rest } = props;
  console.log(catagoryList);
  return (
    <div>
      {catagoryList.map((cat, indx) => (
        <CatagoryView key={indx} catName={cat.catName}></CatagoryView>
      ))}
    </div>
  );
};

CatagoryHierarchyComponent.propTypes = {
  catagoryList: PropTypes.array.isRequired,
};
