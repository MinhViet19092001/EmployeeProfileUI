import { HTTP } from "./BaseAPI.js";

/**
 * Lớp chứa các API Employees
 * Author: Dương Minh Việt (10/7/2022)
 */
class EmployeeApi {
  controller = "Employees";

  /**
   * Lấy danh sách thông tin nhân viên
   * @returns danh sách nhân viên
   */
  getAll() {
    return HTTP.get(`${this.controller}`);
  }

  /**
   * Lấy thông tin nhân viên với id truyền vào tương ứng
   * @param {*} id
   * @returns thông tin nhân viên có Id = id
   */
  getById(id) {
    return HTTP.get(`${this.controller}/GetEmployeeProfile/${id}`);
  }

  /**
   * Lấy ra thông tin nhân viên truyền vào tương ứng
   * @returns mã nhân viên mới
   */
  getNewCode() {
    return HTTP.get(`${this.controller}/GetNewEmployeeCode`);
  }

  /**
   * Thêm mới 1 dữ liệu nhân viên
   * @param {*} employee  // đối tượng nhân viên cần thêm
   * @returns Trả về 1 - thêm mới thành công
   */
  postEmployee(employee) {
    return HTTP.post(`${this.controller}/InsertEmployee`, employee);
  }

  /**
   * Sửa thông tin 1 dữ liệu theo id
   * @param {*} id  //id nhân viên cần sửa
   * @returns trả về 1 - Sửa thành công
   */
  putEmployee(id, employee) {
    return HTTP.put(`${this.controller}/${id}`, employee);
  }

  /**
   * Xoá thông tin 1 dữ liệu theo id
   * @param {*} id  //id nhân viên cần xoá
   * @returns trả về 1 - Xoá thành công
   */
  deleteEmployee(id) {
    return HTTP.delete(`${this.controller}/${id}`);
  }

  /**
   * Tìm kiếm, phân trang
   * @param {*} pageSize   //số bản ghi trên 1 trang hiện tại
   * @param {*} pageNumber  //số trang hiện tại
   * @param {*} keyWord     //từ khoá tìm kiếm
   * @returns danh sách tìm kiếm, tổng số trang , tổng số bản ghi
   */
  getDataPaging(paramPaging) {
    return HTTP.get(
      `${
        this.controller
      }/paging?pageSize=${paramPaging?.pageSize}&pageNumber=${paramPaging?.pageNumber}&searchValue=${paramPaging?.searchValue?.trim()}&organizationUnitID=${paramPaging?.organizationUnitID}&filterStatus=${paramPaging?.filterStatus}`
    );
  }

  /**
   * Export File Excel
   * @returns file excel
   */
  export() {
    //kiểu dữ liệu của phản hồi máy chủ. Nó có thể là 'arraybuffer', 'blob', 'document', 'JSON', 'text', 'stream'. Mặc định là 'JSON
    return HTTP.get(`${this.controller}/Export`, { responseType: "blob" });
  }

  /**
   * Xoá tất cả thông tin nhân viên
   * @returns trả về số bản ghi xoá thành công
   */
  deleteAll() {
    return HTTP.delete(`${this.controller}/DeleteAll`);
  }

  /**
   * Xoá nhiều thông tin nhân viên
   * @param {*} employeeIds //mảng chứa các employeeId cần xoá
   * @returns số bản ghi xoá thành công
   */
  deleteMulti(employeeIdDeletes) {
    return HTTP.delete(`${this.controller}/DeleteMulti`, {
      data: employeeIdDeletes,
    });
  }
}

export default new EmployeeApi();
