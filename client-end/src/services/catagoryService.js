import get from "./httpService";

const URL = ":5000/api/catagory";

export const getAllCatagory = async () => {
  return get(URL);
};
