<template>
  <Login v-if="!isLoginSuccess" @login-success="loginSuccess($event)"></Login>
  <BaseView v-if="isLoginSuccess"></BaseView>
</template>
<script>
import BaseView from './common/BaseView.vue';
import Login from './components/views/Login/Login.vue';
export default {
  name: 'App',
  components: {
    Login,
    BaseView
  },
  data() {
    return {
      isLoginSuccess: false
    }
  },
  created() {
    let url = window.location.href;
    if(url.includes('login') || url === 'http://localhost:8080/'){
      this.isLoginSuccess = false;
    }
    else{
      this.isLoginSuccess = true;
    }
  },
  methods: {
    loginSuccess(e){
      if(e == true){
        this.isLoginSuccess = true
        localStorage.setItem("employeeID", this.$store.state.EmployeeID);
      }
    }
  }
}
</script>
<style scoped>
@import "@/assets/style/base.css";
@import "@/assets/style/icon.css";
</style>
