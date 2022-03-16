import React from "react";

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