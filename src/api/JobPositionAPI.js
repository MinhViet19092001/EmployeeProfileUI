import { HTTP } from "./BaseAPI.js";

class JobPositionAPI{
    controller = "JobPosition";

    insertOrg(jobposition){
        return HTTP.post(`${this.controller}`, jobposition)
    }
    getDataPaging(paramPaging){
        return HTTP.get(
            `${
              this.controller
            }/paging?pageSize=${paramPaging?.pageSize}&pageNumber=${paramPaging?.pageNumber}&searchValue=${paramPaging?.searchValue?.trim()}&statusID=${paramPaging?.statusID}`
          );
    }
    delete(jobPositionUnitID) {
        return HTTP.delete(`${this.controller}/${jobPositionUnitID}`);
    }
    getById(jobPositionUnitID){
      return HTTP.get(`${this.controller}/${jobPositionUnitID}`);
    }
    updateById(jobPositionUnitID, jobPosition){
      return HTTP.put(`${this.controller}/${jobPositionUnitID}`, jobPosition);
    }
    export(){
      return HTTP.get(`${this.controller}/Export`,{ responseType: "blob" });
    }
    getNewCode(){
      return HTTP.get(`${this.controller}/NewJobPositionCode`);
    }
    getJobPositionByOrg(organizationUnitID){
      return HTTP.get(`${this.controller}/GetJobPositionByOrg/${organizationUnitID}`);
    }
}

export default new JobPositionAPI();