import post from "./httpService";

const URL = ":5000/api/data";

export const getData = async (catagory) => {
  let payload = {};
  if (catagory) {
    payload = { searchText: catagory, ...payload };
  }

  return post(URL, payload);
};
