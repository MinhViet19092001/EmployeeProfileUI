import { HTTP } from "./BaseAPI.js";

class UserListAPI{
    controller = "UserList";

    getDataPaging(paramPaging){
        return HTTP.get(
            `${
              this.controller
            }/paging?pageSize=${paramPaging?.pageSize}&pageNumber=${paramPaging?.pageNumber}&searchValue=${paramPaging?.searchValue?.trim()}`
          );
    }
    getEmployee(){
      return HTTP.get(`${this.controller}/GetEmployee`)
    }
    getUserRole(){
      return HTTP.get(`${this.controller}/GetUserRole`)
    }
    insertUserList(userList){
      return HTTP.post(`${this.controller}`, userList)
  }
}

export default new UserListAPI();