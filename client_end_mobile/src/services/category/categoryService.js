import {get} from '../http/httpService';

const URL = ':5000/api/categories';

export const getAllCategory = async () => {
  return get(URL)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw err;
    });
};
