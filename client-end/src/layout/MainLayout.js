import React from "react";
import { Layout } from "antd";
import { Stack } from "react-bootstrap";
import { CatagoryHierarchyComponent } from "../components/CatagoryHierarchyComponent";
import { DalaListComponent } from "../components/DalaListComponent";
import { AppContext } from "../contexts/app";
import { useEffect } from "react";
import { UPDATE_DATA, UPDATE_SELECT_CAT_LIST } from "../constants/appActions";
import "bootstrap/dist/css/bootstrap.min.css";

export const MainLayout = () => {
  const [state, dispatch] = React.useContext(AppContext);

  const catList = [
    {
      catName: "Main Cat 1",
      sku: "maincat001",
      description: "A description",
      parentSku: "",
    },
    {
      catName: "Sub Cat 1",
      sku: "Subcat002",
      description: "A description",
      parentSku: "",
    },
    {
      catName: "Sub Cat 2",
      sku: "Subcat003",
      description: "A description",
      parentSku: "",
    },
    {
      catName: "Sub Cat 3",
      sku: "Subcat004",
      description: "A description",
      parentSku: "",
    },
    {
      catName: "Main Cat 4",
      sku: "maincat005",
      description: "A description",
      parentSku: "",
    },
    {
      catName: "sub cat 5",
      sku: "subcat1",
      description: "A description",
      parentSku: "maincat001",
    },
  ];

  const dataList = [
    {
      name: "Name one",
      catagory: "/maincat001",
      secondDataField: "two",
      thirdDataField: "third",
      description: "A description",
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
    },
    {
      name: "Name two",
      catagory: "/maincat001",
      secondDataField: "two",
      thirdDataField: "third",
      description: "A description",
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
    },
    {
      name: "Name three",
      catagory: "/maincat001",
      secondDataField: "two",
      thirdDataField: "third",
      description: "A description",
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
    },
    {
      name: "Name four",
      catagory: "/maincat001",
      secondDataField: "two",
      thirdDataField: "third",
      description: "A description",
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
    },
    {
      name: "Name six",
      catagory: "/maincat001/subcat1",
      secondDataField: "two",
      thirdDataField: "third",
      description: "A description",
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
    },
    {
      name: "Name seven",
      catagory: "/maincat001/subcat1",
      secondDataField: "two",
      thirdDataField: "third",
      description: "A description",
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
    },
  ];

  useEffect(() => {
    dispatch({
      type: UPDATE_SELECT_CAT_LIST,
      selctedCatList: catList,
    });
    dispatch({
      type: UPDATE_DATA,
      dataList: dataList,
    });
  }, []);

  return (
    <Layout>
      <Stack gap={4}>
        <div>
          <CatagoryHierarchyComponent />
        </div>
        <div>
          <DalaListComponent />
        </div>
      </Stack>
    </Layout>
  );
};
