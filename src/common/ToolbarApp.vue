<template>
    <div class="main-toolbar flex align-center">
        <div class="toolbar-left flex align-center">
            <div class="all-app icon icon-all-app"></div>
            <div class="icon-app" @click="reloadApp()"></div>
            <div class="title-app" @click="reloadApp()">Thông tin nhân sự</div>
        </div>
        <div class="toolbar-right flex align-center">
            <div class="icon-notifi m-r-16" :title="'Thông báo'"></div>
            <div class="icon-help m-r-16" :title="'Trợ giúp'"></div>
            <div class="avatar flex align-center m-r-16 justify-center" v-bind:style="'background-color: ' + bgAvatar(currentEmployee.FullName)" @click="showPopupDetail()">
                <div class="bold" style="color: #fff; font-size: 18px">
                  {{ avatar(currentEmployee.FullName) }}
                </div>
            </div>
        </div>
    </div>
    <div v-if="isShowInfoDetail" class="user-account-menu">
        <div class="icon-align"></div>
        <div class="user-account flex">
            <div class="avatarBig">
                <div class="user-account-avatar" v-bind:style="'background-color: ' + bgAvatar(currentEmployee.FullName)">
                    <div class="bold" style="color: #fff; font-size: 35px">
                        {{ avatar(currentEmployee.FullName) }}
                    </div>
                </div>
            </div>
            <div class="user-info flex">
                <div class="fullname">{{ currentEmployee.FullName }}</div>
                <div class="username-account">{{ currentEmployee.AccountUserName }}</div>
            </div>
            <div class="workplace flex align-center justify-center">
                <div class="icon icon-work-place"></div>
                <div class="workplace-name">{{ currentEmployee.WorkPlace }}</div>
            </div>
            <div class="change-pass flex align-center">
                <i class='bx bx-key'></i>
                <div style="font-size: 15px; font-weight: normal !important;">Đổi mật khẩu</div>
            </div>
            <div class="logout flex align-center justify-center" @click="logout()">
                <i class='bx bx-log-out'></i>
                <div style="font-size: 15px; font-weight: normal !important;">Đăng xuất</div>
            </div> 
        </div>
    </div>
</template>
<script>
import { createAvatar, createBgAvatar } from "../common/avatar";
export default {
    name: "ToolbarApp",
    component: {
    },
    data(){
        return{
            //ID nhân viên đang đăng nhập
            EmployeeID: {
                type: Number,
                default: 0
            },
            //Thông tin nhân viên đăng nhập
            currentEmployee: {
                FullName: 'Dương Minh Việt',
                WorkPlace: 'Văn phòng Tổng công ty',
                AccountUserName: 'dmviet@gmail.com'
            },
            //Biến ẩn hiện thông tin chi tiết của tài khoản hiện tại
            isShowInfoDetail: false
        }
    },
    created(){
        this.EmployeeID = this.$store.EmployeeID;
    },
    methods: {
        reloadApp(){
            window.location.reload();
            this.$router.push('/overview');
        },
        //tạo tên avatar
        avatar(name) {
            return createAvatar(name);
        },
        //tạo bg cho avatar
        bgAvatar(name) {
            return createBgAvatar(this.avatar(name));
        },
        //Show popup detail
        showPopupDetail(){
            this.isShowInfoDetail = !this.isShowInfoDetail
        },
        //Ânr đi infor detail
        hideInforDetail(){
            this.isShowInfoDetail = false
        },
        //Đăng xuất khỏi chương trình
        logout(){
            window.location.href= 'http://localhost:8080/login';
        },
    }
}
</script>
<style scoped>
.toolbar-left{
    width: 90%;
}
.toolbar-right{
    width: 10%;
    justify-content: flex-end;
}
.main-toolbar{
    height: 100%;
    width: 100%;
    box-shadow: 0 0 4px rgba(0,0,0,.16);
    justify-content: space-between;
}
.all-app:hover{
    border-radius: 50%;
    background-color: #eff1f6;
}
.title-app{
    width: 165px;
    font-size: 20px;
    font-weight: 500;
    margin-right: 40px;
    margin-left: 12px;
    cursor: pointer;
    font-family: Roboto, Helvetica, Arial, sans-serif;
}
.avatar{
    width: 34px;
    height: 34px;
    border-radius: 50%;
    cursor: pointer;
}
.fullname{
    margin-bottom: 4px;
    font-size: 20px;
    font-weight: bold;
    padding: 0 24px;
    line-height: 30px;
}
.user-account-menu{
    position: absolute;
    left: 1603px;
    width: 302px;
    height: auto;
    cursor: default;
    color: #1f1f1f;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 3px 16px rgba(0,0,0,.16);
    -webkit-box-shadow: 0 3px 16px rgba(0,0,0,.16);
    text-align: center;
    display: flex;
    flex-direction: column;
}
.user-account{
   flex-direction: column;
}
.user-account .avatarBig{
    height: 64px;
    width: 64px;
    margin: 0 auto;
    margin-top: 24px;
}
.user-account-avatar{
    height: 100%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.user-info{
    flex-direction: column;
    text-align: center;
    margin: 16px 0px;
}
.username-account{
    font-size: 13px;
    color: #666;
    line-height: 19px;
}
.workplace{
    height: 40px;
    margin: 0 16px;
    border-radius: 4px;
    color: #1f1f1f;
    border: 1px solid #e0e0e0;
    margin-bottom: 8px;
    padding: 0 8px;
}
.icon-align {
    width: 10px;
    height: 10px;
    display: block;
    right: 15px;
    top: -5px;
    position: absolute;
    background-color: #fff;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
}
.change-pass{
    height: 40px;
    line-height: 42px;
    margin: 0 16px;
    border-radius: 3px;
    color: #1f1f1f;
    cursor: pointer;
    display: flex;
    padding-left: 30px;
    margin-bottom: 8px;
}
.change-pass:hover{
    background-color: #f2f2f2;
}
.bx-key{
    font-size: 25px;
    margin-right: 10px;
    opacity: 0.5;
}
.bx-log-out{
    font-size: 25px;
    margin-right: 10px;
    opacity: 0.5;
}
.logout{
    height: 40px;
    cursor: pointer;
    border-top: 1px solid #e0e0e0;
}
.logout:hover{
    background-color: #f2f2f2;
}
</style>