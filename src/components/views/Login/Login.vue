<template>
  <div class="box" v-if="formLogin">
    <div class="container">
      <div class="top">
        <header>Laptop HN</header>
      </div>

      <div class="input-field" :class="{'error-empty': usernameEmpty}">
        <input ref="username" type="text" class="input" placeholder="Số điện thoại/email" id="" v-model="username" @focusin="focusUserName()" tabindex="1" v-on:keyup.enter="login()"/>
        <i class="bx bx-user"></i>
        <div v-if="usernameEmpty" class="text-error">Tên đăng nhập không được để trống.</div>
      </div>
      <div class="input-field" :class="{'error-empty': passwordEmpty}">
        <input v-if="!showPassword" type="text" class="input" placeholder="Mật khẩu" v-model="password" @focusin="focusPassword()" tabindex="2" v-on:keyup.enter="login()"/>
        <input v-else type="password" class="input" placeholder="Mật khẩu" v-model="password" @focusin="focusPassword()" tabindex="2" v-on:keyup.enter="login()">
        <i class="bx bx-lock-alt"></i>
        <i class='bx show-pass' :class="{'bx-show ': showPassword, 'bx-hide': !showPassword  }" @click="toogleShowPassword()"></i>
        <div v-if="passwordEmpty" class="text-error">Mật khẩu không được để trống.</div>
      </div>
      <div v-if="loginError" class="login-error">Tên đăng nhập hoặc mật khẩu không đúng.</div>

      <div class="input-field"  v-if="readyLogin">
        <i class="fa fa-sign-in login-loading"></i>
          <input type="submit" class="submit" value="Đăng nhập" id=""  @click="login()" v-on:keyup.enter="login()" @blur="blurInputLogin($event)"/>
      </div>

      <div class="input-field"  v-if="continueLogin">
        <i class="fa fa-refresh fa-spin login-loading"></i>
        <input type="submit" class="submit" value="Đang xác thực..." id=""/>
      </div>

      <div class="two-col">
        <div class="two">
          <label><a href="#" class="forgotBtn">Quên mật khẩu?</a></label>
        </div>
      </div>
    </div>

    <!--Begin toast thông báo -->
    <BaseToast
      v-if="toastMsg.isShowToast"
      :toastText="toastMsg.toastText"
      :isShowToastError="toastMsg.isShowToastError"
      @closeToastMsg="toastMsg.isShowToast = $event"
    />
  </div>
</template>

<script>
import LoginAPI from "@/api/LoginAPI";
import BaseToast from "@/common/BaseToast.vue";
export default {
  name: "Login",
  components: {
    BaseToast
  },
  data() {
    return {
        //Biến ẩn hiện form login
        formLogin: true,
        //Tên dăng nhập
        username: '',
        //Mật khẩu
        password: '',
        //Biến check xem username có trống hay không
        usernameEmpty: false,
        //Biến check xem password có trống hay không
        passwordEmpty: false,
        //Biến xem có ẩn hiển password k: true là có hiện, false là không hiện
        showPassword: true,
        //Biến check khi đăng nhập với tài khoản và mật khẩu không đúng
        loginError: false,
        //Biến ẩn hiện thông báo toast
        isVisibleToast:  true,
        //Hiển thị nút đăng nhập
        readyLogin: true,
        //Hiển thị nút đang đăng nhập
        continueLogin: false,
        //Nội dung thông báo toast
        messageToast: '',
        //Kiểu toast
        typeToast: '',
        //Đối tượng UI toast thông báo
        toastMsg: {
          isShowToast: false, //ẩn hiện toast thông báo
          toastText: { type: String }, //Nội dung toast thông báo
          isShowToastError: false, //phân biệt toast thông báo có phải là thông báo lỗi không
        },
        //ID của user đăng nhập
        employeeID: 0
    };
  },
  created(){
    //Xét title cho page
    document.title = "Đăng nhập | Thông tin nhân sự"
  },  
  mounted(){
    this.focusInputUserName();
  },
  updated(){
    //Xử lí khi toast thông báo xuất hiện => tự động ẩn đi sau 2s
    if (this.toastMsg.isShowToast === true) {
      setTimeout(() => {
        this.toastMsg.isShowToast = false;
      }, 2000);
    }
  },
  watch:{
    username(){
        this.usernameEmpty = false;
        this.loginError = false;
    },
    password(){
        this.passwordEmpty = false;
        this.loginError = false;
    },
    employeeID(){
      //gán giá trị employeeID của người dùng đang đăng nhập
      this.$store.commit('login',this.employeeID);
    },
  },
  computed:{
  },
  methods: {
    //Mở form lên sẽ auto focus vào tên dăng nhập
    focusInputUserName(){
      this.$refs.username.focus()
    },
    //Xử lý khi bấm nút đăng nhập
    login(){
        var me = this;
        me.validateForm();
        if(!me.usernameEmpty && !me.passwordEmpty){
          //Hiển thị form loading button
          me.readyLogin = false;
          me.continueLogin = true;
          //gọi service check
          try
          {
            LoginAPI.checkLogin(me.username, me.password).then((res) =>{
              if(res){
                if(res?.success == true && res?.data?.EmployeeID > 0){
                  me.loginError = false; 
                  me.$router.push('/overview');
                  me.employeeID = res.data.EmployeeID;
                }
                else{
                  me.readyLogin = true;
                  me.continueLogin = false;
                  me.loginError = true;
                }
              }
            }).catch((err) => {
                me.readyLogin = true;
                me.continueLogin = false;
                me.toastMsg.isShowToast = true;
                me.toastMsg.isShowToastError = true;
                me.toastMsg.toastText = "Có lỗi xảy ra";
            })
          }
          catch{
            me.readyLogin = true;
            me.continueLogin = false;
            me.toastMsg.isShowToast = true;
            me.toastMsg.isShowToastError = true;
            me.toastMsg.toastText = "Có lỗi xảy ra";
          }
        }
    },
    //Xử lý khi bấm nút ẩn hiện password
    toogleShowPassword(){
        this.showPassword = !this.showPassword
    },
    //validate form login
    validateForm(){
      var me = this;
      if(me.username.length <= 0){
        me.usernameEmpty = true;
      }
      if(me.password.length <= 0){
        me.passwordEmpty = true;
      }
    },
    //Khi focus vào UserName
    focusUserName(){
      this.loginError = false;
    },
    //KhI focus vào Password
    focusPassword(){
      this.loginError = false;
    },
    //Khi blur khỏi nút đăng nhập 
    blurInputLogin(e){
      e.preventDefault();
      this.$refs.username.focus()
    }
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;800&display=swap");
.box {
  height: 100vh;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../../assets/images/login-bgr.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
.container {
  width: 350px;
  display: flex;
  flex-direction: column;
  padding: 0 15px 0 15px;
}
span {
  color: #fff;
  font-size: small;
  display: flex;
  justify-content: center;
  padding: 10px 0 10px 0;
}
header {
  color: #fff;
  font-size: 30px;
  display: flex;
  justify-content: center;
  padding: 10px 0 10px 0;
}

.input-field .input {
  height: 45px;
  width: 87%;
  border: none;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  padding: 0 0 0 45px;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
}
i {
  position: relative;
  top: -30px;
  left: 17px;
  color: #fff;
}
.show-pass{
    left: 300px;
}
::-webkit-input-placeholder {
  color: #fff;
}
.submit {
  border: none;
  border-radius: 30px;
  font-size: 15px;
  height: 45px;
  outline: none;
  cursor: pointer;
  width: 100%;
  color: black;
  background: rgba(255, 255, 255, 0.9);
  transition: 0.3s;
}
.readyLogin .submit:hover {
  box-shadow: 1px 5px 7px 1px rgba(0, 0, 0, 0.4);
}
.submit:active{
    background: rgba(255, 255, 255, 0);
}
.submit:focus{
  box-shadow: 1px 5px 7px 1px rgba(0, 0, 0, 0.4);
}
.two-col {
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: #fff;
  font-size: small;
  margin-top: 10px;

}
.one {
  display: flex;
}
label a {
  text-decoration: none;
  color: #fff;
}
.error-empty input{
    border: 1px solid red !important;
}
.text-error{
    font-size: 12px;
    color: red;
    position: relative;
    top: -15px;
    left: 18px;
}
.login-error{
  font-size: 14px;
  color: red;
  position: relative;
  top: -7px;
  left: 18px;
}
.forgotBtn:hover{
  color: #0073e6
}
.login-loading{
  position: relative;
  top: 33px;
  left: 94px;
  color: #000;
}
</style>
