import { HTTP } from "./BaseAPI.js";

class OrganizationUnitAPI{
    controller = "OrganizationUnit";

    insertOrg(org){
        return HTTP.post(`${this.controller}`, org)
    }
    getDataPaging(paramPaging){
        return HTTP.get(
            `${
              this.controller
            }/paging?pageSize=${paramPaging?.pageSize}&pageNumber=${paramPaging?.pageNumber}&searchValue=${paramPaging?.searchValue?.trim()}&statusID=${paramPaging?.statusID}`
          );
    }
    delete(organizationUnitID) {
        return HTTP.delete(`${this.controller}/${organizationUnitID}`);
    }
    getById(organizationUnitID){
      return HTTP.get(`${this.controller}/${organizationUnitID}`);
    }
    updateById(organizationUnitID, organizationUnit){
      return HTTP.put(`${this.controller}/${organizationUnitID}`, organizationUnit);
    }
    export(){
      return HTTP.get(`${this.controller}/Export`,{ responseType: "blob" });
    }
    getAll(){
      return HTTP.get(`${this.controller}`);
    }
}

export default new OrganizationUnitAPI();