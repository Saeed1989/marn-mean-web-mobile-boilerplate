import axios from "axios";

console.log("envs", process.env);

const BaseUrl = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : "http://localhost";

export const get = async (url) => {
  const response = await axios.get(BaseUrl + url);
  return response.data;
};

export const post = async (url, payload) => {
  const response = await axios.post(`${BaseUrl}${url}`, payload);
  return response.data;
};
