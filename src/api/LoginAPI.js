import { HTTP } from "./BaseAPI.js";

/**
 * Lớp chứa các API login
 * dmviet 198.4.2023
 */
class LoginAPI{
    controller = "Login";

    checkLogin(userName, passWord){
        return HTTP.get(`${this.controller}/checkAccountLogin?userName=${userName}&passWord=${passWord}`)
    }
}

export default new LoginAPI();