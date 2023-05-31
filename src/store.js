import Vuex from 'vuex'

var store = new Vuex.Store({
  state: {
    EmployeeID: 0,
    roleEmployee: "",
    roleContract: "",
    roleUserRole: "",
    roleUserList: ""
  },
  mutations:{
    login(state, employeeID){
        state.EmployeeID = employeeID;
    },
    roleEmployee(state, roleEmployee){
        state.roleEmployee = roleEmployee;
    },
    roleContract(state, roleContract){
      state.roleContract = roleContract;
    },
    roleUserRole(state, roleUserRole){
      state.roleUserRole = roleUserRole;
    },
    roleUserList(state, roleUserList){
      state.roleUserList = roleUserList;
    }
  }
})

export default store