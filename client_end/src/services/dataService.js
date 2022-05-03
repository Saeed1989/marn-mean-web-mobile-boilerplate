import { post } from "./httpService";

const URL = ":5001/api/data/search";

export const getData = async (catagory) => {
  let payload = {};
  if (catagory) {
    payload = { searchText: catagory, ...payload };
  }

  return post(URL, payload)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
