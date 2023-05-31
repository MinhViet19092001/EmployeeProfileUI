import axios from "axios";
export const HTTP = axios.create({
  baseURL: `https://api.vietqr.io/v2/banks`,
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


class BankAPI{
    getAllBank(){
        return HTTP.get();
    }
}
export default new BankAPI();