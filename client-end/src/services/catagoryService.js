import { get } from "./httpService";

const URL = ":5000/api/catagories";

const catList = [
  {
    catName: "Main Cat 1",
    sku: "maincat001",
    description: "A description",
    parentSku: "",
  },
  {
    catName: "Main Cat 2",
    sku: "Maincat002",
    description: "A description",
    parentSku: "",
  },
  {
    catName: "Main Cat 3",
    sku: "Maincat003",
    description: "A description",
    parentSku: "",
  },
  {
    catName: "Sub Cat 1",
    sku: "sub cat 1",
    description: "A description",
    parentSku: "maincat001",
  },
  {
    catName: "Sub Cat 2",
    sku: "subcat2",
    description: "A description",
    parentSku: "Maincat002",
  },
  {
    catName: "Sub cat 3",
    sku: "subcat3",
    description: "A description",
    parentSku: "Maincat002",
  },
];

export const getAllCatagory = async () => {
  //return catList;
  return get(URL)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
