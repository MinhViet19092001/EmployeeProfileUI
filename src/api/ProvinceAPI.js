import axios from "axios";
export const HTTP = axios.create({
  baseURL: `https://provinces.open-api.vn/api/`,
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


class ProvinceAPI{
    //Lấy ra danh sách các tỉnh thành
    getProvince(){
        return HTTP.get(`?depth=1`);
    }
    //lấy ra danh sách các quận huyện của tỉnh thành
    getDistrict(provinceID){
        return HTTP.get(`p/${provinceID}?depth=2`);
    }
    //lấy ra danh sách các xã của huyện
    getWard(districtID){
        return HTTP.get(`d/${districtID}?depth=2`);
    }
}
export default new ProvinceAPI();