import React from "react";
import { Route } from "react-router-dom";
import { NotFound } from "../Pages/NotFound";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

export const DataView = (props) => {
  const { name, ...rest } = props;
  return (
    <Button variant="primary" size="lg">
      {name}
    </Button>
  );
};

export const DalaListComponent = (props) => {
  const { dataList, ...rest } = props;
  console.log(dataList);
  return (
    <div className="d-grid gap-2" style={{ minWidth: "18rem" }}>
      {dataList.map((data, indx) => (
        <DataView key={indx} name={data.name}></DataView>
      ))}
    </div>
  );
};

DalaListComponent.propTypes = {
  dataList: PropTypes.array.isRequired,
};
