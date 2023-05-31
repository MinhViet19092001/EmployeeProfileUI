<template>
<div class="h-full w-full flex flex-column">
        <ToolbarComponent 
            :title-component="'Thêm người dùng'" 
            :show-icon-back="true" 
            @backPage="backPage"
            :show-btn-add="false"
        >
            <template v-slot:custom-btn>
                <div class="btn-save" @click="saveUserList">
                    <div class="title-save">Lưu</div>
                </div>
            </template>
        </ToolbarComponent>
        <div class="form-content">
            <div class="organization-create-content flex flex-column" style="margin: 0 16px 16px !important;">
                <div class="form-group w-full">
                    <div class="title-form-group">Thông tin chung</div>
                    <div class="content-from-group flex flex-row">
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Họ và tên người dùng <span style="color: red;">*</span></div>
                                <div class="input-row-content" v-bind:class="{'error-input': isErrorEmployeeID === true}" style="width: calc(55% + 32px);">
                                    <DxSelectBox
                                        tabindex="3"
                                        class="select-box-status"
                                        :search-enabled="true"
                                        :search-mode="'contains'"
                                        :search-expr="'FullName'"
                                        :data-source="lstEmployee"
                                        v-model="userList.EmployeeID"
                                        value-expr="EmployeeID"
                                        display-expr="FullName"
                                        :placeholder="''"
                                        :noDataText="'Không có dữ liệu'"
                                        @opened="onOpenedListEmployee"
                                        @item-click="chooseEmployee($event)"
                                        item-template="item-employee"

                                    >
                                        <template #item-employee="{data}">
                                            <div class="list-item flex">
                                                <div class="item flex align-center">
                                                    <div class="item-ava flex align-center justify-center" v-bind:style="'background-color: ' + bgAvatar(data.FullName)">
                                                        <div class="bold" style="color: #fff; font-size: 20px">
                                                            {{ avatar(data.FullName) }}
                                                        </div>
                                                    </div>
                                                    <div class="item-content flex flex-column">
                                                        <div class="first-content"><b>{{ data.FullName }}</b> ({{ data.EmployeeCode }})</div>
                                                        <div class="second-content">{{ data.JobPositionName }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                    </DxSelectBox>
                                    <div v-if="isErrorEmployeeID" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorEmployeeID }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                            <div class="title-input-row">Vai trò người dùng: <span style="color: red;">*</span></div>
                            <div class="input-row-content"  v-bind:class="{'error-input': isErrorRole === true}" style="width: calc(55% + 32px);">
                                <DxSelectBox
                                    tabindex="3"
                                    class="select-box-status"
                                    :search-enabled="true"
                                    :search-mode="'contains'"
                                    :search-expr="'UserRoleName'"
                                    :data-source="lstRole"
                                    v-model="userList.UserRoleID"
                                    value-expr="UserRoleID"
                                    display-expr="UserRoleName"
                                    :placeholder="''"
                                    :noDataText="'Không có dữ liệu'"
                                    @opened="onOpenedOrgUserRoleID"
                                    @item-click="chooseRole($event)"
                                >
                                </DxSelectBox>
                                <div v-if="isErrorRole" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorRole }}</div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--Begin toast thông báo -->
        <BaseToast
            v-if="false"
            :toastText="toastMsg.toastText"
            :isShowToastError="toastMsg.isShowToastError"
            @closeToastMsg="toastMsg.isShowToast = $event"
            @showToast="showToast"
        />
    </div>
</template>
<script>
import BaseToast from "@/common/BaseToast.vue";
import ToolbarComponent from '@/common/ToolbarComponent.vue';
import 'devextreme/dist/css/dx.light.css';
import DxSelectBox from 'devextreme-vue/select-box';
import { createAvatar, createBgAvatar } from "@/common/avatar";
import UserListAPI from '@/api/UserListAPI';
export default {
    name: 'UserListCreate',
    components:{
        ToolbarComponent,
        BaseToast,
        DxSelectBox
    },
    data(){
        return{
            userList: {},
            isErrorEmployeeID: false,
            errorEmployeeID: "Họ và tên người dùng không được để trống",
            isErrorRole: false,
            errorRole: 'Vai trò người dùng không được để trống',
            lstEmployee: [],
            lstRole: [],
            isErrorValidate: true,
        }
    },
    methods: {
        backPage(){
            this.$router.push('/user-list');
        },
        //tạo tên avatar
        avatar(name) {
            return createAvatar(name);
        },
        //tạo bg cho avatar
        bgAvatar(name) {
            return createBgAvatar(this.avatar(name));
        },
        async onOpenedListEmployee(){
            await UserListAPI.getEmployee().then(
                (res) => {
                    this.lstEmployee = res;
                },
                (err) => {
                    
                }
            )
        },
        async onOpenedOrgUserRoleID(){
            await UserListAPI.getUserRole().then(
                (res) => {
                    this.lstRole = res;
                },
                (err) => {
                    
                }
            )
        },
        chooseEmployee(e){
            this.isErrorEmployeeID = false
        },
        chooseRole(e){
            this.isErrorRole = false;
        },
        saveUserList(){
            var me = this;
            this.beforeSave();
            if(!this.isValiteDate){
                UserListAPI.insertUserList(this.userList).then(
                    () => {
                        //Toast lên thông báo thêm thành công
                        me.$emit('showToast', true, 'Thêm mới thành công', false);
                        //back lại trang danh sách
                        me.backPage();
                    },
                    (err) => {
                    }
                ).catch(
                    () => {
                        me.$emit('showToast', true, 'Có lỗi xảy ra', true);
                    }
                )
            }
        },
         //Validate dữ liệu trước khi insert
        validate(){
            if(!this.userList.EmployeeID){
                this.isErrorEmployeeID = true;
            }
            if(!this.userList.UserRoleID){
                this.isErrorRole = true;
            }
        },
        beforeSave(){
            this.validate();
            if(this.isErrorEmployeeID || this.isErrorRole){
                this.isErrorValidate = true;
            }else{
                this.isErrorValidate = false;
            }
        },
    },
}
</script>
<style scoped>

.btn-save{
    height: 36px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2566e9;
    color: #fff;
    cursor: pointer;
    min-width: 80px;
}
.error-org .dx-texteditor.dx-editor-outlined{
    border-color: red;
}
.title-save{
    font-size: 14px;
}
.organization-create-content{
    background-color: #fff;
    margin: 0 24px;
    border-radius: 4px;
    padding: 24px;
}
.organization-create-content .box-content{
    flex: 1;
    width: 50%;
}
.input-row{
    height: 36px;
    margin: 15px 10px;
    width: 100%;
}
.title-input-row{
    font-size: 14px;
    color: #1f1f20!important;
    width: 200px;
    line-height: 36px;
    min-width: 140px;
}
.input-row-content{
    width: 55%;
}
.title-form-group{
    font-size: 16px;
    font-weight: 700;
}
.field-row-input{
    height: 34px;
    width: 100%;
    padding: 0 16px;
    color: #1f1f20;
    font-size: 14px!important;
    border-radius: 4px;
    -moz-background-clip: padding;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid #e0e1e4;
}
.field-row-input:hover{
    border-color: #1c80f2;
}
.field-row-input:focus-within{
    border-color: #1c80f2;
}
.field-row-input-error{
    border-color: red !important;
}
.dx-texteditor.dx-state-hover{
    border-color: #1c80f2;
}
.error-input .dx-texteditor.dx-editor-outlined{
    border-color: red;
}
.list-item{
    height: 40px
}
.item{
    padding: 7px 9px;
}
.item-ava{
    width: 36px!important;
    height: 36px!important;
    text-align: center;
    line-height: 32px;
    border-radius: 50%;
    justify-content: center;
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: #1f1f20;
    margin-right: 20px;
}
</style>