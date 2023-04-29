import Vuex from 'vuex'

var store = new Vuex.Store({
  state: {
    EmployeeID: 0
  },
  mutations:{
    login(state, employeeID){
        state.EmployeeID = employeeID
    }
  }
})

export default store