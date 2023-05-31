import { HTTP } from "./BaseAPI.js";

class OverviewAPI{
    controller = "Overview";
    getDataPaging(paramPaging){
        return HTTP.get(
            `${
              this.controller
            }/paging?pageSize=${paramPaging?.pageSize}&pageNumber=${paramPaging?.pageNumber}&searchValue=${paramPaging?.searchValue?.trim()}`
          );
    }

}

export default new OverviewAPI();