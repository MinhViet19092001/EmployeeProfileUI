import axios from "axios";
export const HTTP = axios.create({
  baseURL: `https://localhost:7260/api/v1/`,
});

HTTP.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error && error.response && error.response.status == 401) {
      console.log("expired");
    }
    return Promise.reject(error);
  }
);
