import React from "react";
import { Layout } from "antd";
import { Stack, Row } from "react-bootstrap";
import { CatagoryHierarchyComponent } from "../components/CatagoryHierarchyComponent";
import { DalaListComponent } from "../components/DalaListComponent";
import "bootstrap/dist/css/bootstrap.min.css";

export const MainLayout = () => {
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

  return (
    <Layout>
      <Stack gap={4}>
        <div>
          <CatagoryHierarchyComponent
            catagoryList={catList}
          ></CatagoryHierarchyComponent>
        </div>
        <div>
          <DalaListComponent dataList={dataList}></DalaListComponent>
        </div>
      </Stack>
    </Layout>
  );
};
