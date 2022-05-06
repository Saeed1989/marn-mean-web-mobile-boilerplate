import { post } from "./httpService";

const URL = ":5001/api/data/search";

export const getData = async (category) => {
  let payload = {};
  if (category) {
    payload = { searchText: category, ...payload };
  }

  return post(URL, payload)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
