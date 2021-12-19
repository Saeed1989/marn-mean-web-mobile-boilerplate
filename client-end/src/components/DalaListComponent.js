import React from "react";
import { Button } from "react-bootstrap";
import { AppContext } from "../contexts/app";

export const DataView = (props) => {
  const { name, ...rest } = props;
  return (
    <Button variant="primary" size="lg">
      {name}
    </Button>
  );
};

export const DalaListComponent = () => {
  const [state] = React.useContext(AppContext);
  const { dataList } = state;
  console.log(dataList);
  return (
    <div className="d-grid gap-2" style={{ minWidth: "18rem" }}>
      {dataList.map((data, indx) => (
        <DataView key={indx} name={data.name}></DataView>
      ))}
    </div>
  );
};
