import { HTTP } from "./BaseAPI.js";

class UserRoleAPI{
    controller = "UserRole";

    getDataPaging(paramPaging){
        return HTTP.get(
            `${
              this.controller
            }/paging?pageSize=${paramPaging?.pageSize}&pageNumber=${paramPaging?.pageNumber}&searchValue=${paramPaging?.searchValue?.trim()}`
          );
    }
    insertUserRole(userRole){
      return HTTP.post(`${this.controller}/InsertUserRole`, userRole);
    }
    getRoleDetail(userRoleID){
      return HTTP.get(`${this.controller}/GetRoleDetail/${userRoleID}`);
    }
}

export default new UserRoleAPI();