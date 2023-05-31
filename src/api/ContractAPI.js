import { HTTP } from "./BaseAPI.js";


class ContractAPI{
    controller = "Contract";


    getDataPaging(paramPaging) {
      return HTTP.get(
        `${
          this.controller
        }/paging?pageSize=${paramPaging?.pageSize}&pageNumber=${paramPaging?.pageNumber}&searchValue=${paramPaging?.searchValue?.trim()}&organizationUnitID=${paramPaging?.organizationUnitID}&filterStatus=${paramPaging?.filterStatus}`
      );
    }
    export(){
      return HTTP.get(`${this.controller}/Export`,{ responseType: "blob" })
    }
    postContract(contract){
      return HTTP.post(`${this.controller}`, contract);
    }
    getEmployee(){
      return HTTP.get(`${this.controller}/GetEmployee`)
    }
    getNewContractNo(){
      return HTTP.get(`${this.controller}/GetNewContractNo`)
    }
    getEmployeeSign(){
      return HTTP.get(`${this.controller}/GetEmployeeSign`)
    }
    deleteContract(id) {
      return HTTP.delete(`${this.controller}/${id}`);
    }
    getDetailContract(id){
      return HTTP.get(`${this.controller}/getDetailContract/${id}`);
    }
}

export default new ContractAPI();