import { post } from "./httpService";

const URL = ":5000/api/data";

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

export const getData = async (catagory) => {
  let payload = {};
  if (catagory) {
    payload = { searchText: catagory, ...payload };
  }

  return dataList;
  return post(URL, payload);
};
