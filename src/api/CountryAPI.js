import axios from "axios";
export const HTTP = axios.create({
    baseURL: `https://restcountries.com/v3.1/all`,
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

class CountryAPI{
    //lấy ra danh sách quốc gia
    getCountry(){
        return HTTP.get();
    }
}
export default new CountryAPI();