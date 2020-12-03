import axios from "axios";

const Axios = axios.create({
  withCredentials: true,
});

const getUrl = (route) => {
  return `${process.env.REACT_APP_API}${route}`;
};
export { getUrl, Axios };
