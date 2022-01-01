import {get} from '../http/httpService';

const URL = ':5000/api/catagories';

export const getAllCatagory = async () => {
  return get(URL)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw err;
    });
};
