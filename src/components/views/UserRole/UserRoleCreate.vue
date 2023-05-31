<template>
<div class="h-full w-full flex flex-column">
        <ToolbarComponent 
            :title-component="'Thêm vai trò'" 
            :show-icon-back="true" 
            @backPage="backPage"
            :show-btn-add="false"
        >
            <template v-slot:custom-btn>
                <div class="btn-save" @click="saveUserRole">
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
                                <div class="title-input-row">Tên vai trò <span style="color: red;">*</span></div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" ref="employeeCode" tabindex="1" :class="{'field-row-input-error': isErrorName}" v-model="userRole.UserRoleName">
                                    <div v-if="isErrorName" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorName }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Mô tả</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" tabindex="4" v-model="userRole.UserRoleDescription">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="organization-create-content flex flex-column" style="margin: 0 16px 16px !important;">
                <div class="form-group w-full">
                    <div class="title-form-group">Phân quyền phân hệ</div>
                    <div class="content-from-group flex flex-row">
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Hồ sơ</div>
                                <div class="input-row-content">
                                    <DxTagBox
                                        :data-source="role"
                                        :value="userRole.RoleEmployee"
                                        display-expr="RoleName"
                                        value-expr="RoleCode"
                                        :placeholder="''"
                                        @item-click="clickRoleEmployee($event)"
                                        @selection-changed="selection"
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-from-group flex flex-row">
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Hợp đồng</div>
                                <div class="input-row-content">
                                    <DxTagBox
                                        :data-source="role"
                                        :value="userRole.RoleContract"
                                        display-expr="RoleName"
                                        value-expr="RoleCode"
                                        :placeholder="''"
                                        @item-click="clickRoleContract($event)"
                                        />
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
import DxTagBox from 'devextreme-vue/tag-box';
import BaseToast from "@/common/BaseToast.vue";
import ToolbarComponent from '@/common/ToolbarComponent.vue';
import data from '@/common/data.js';
import UserRoleAPI from '@/api/UserRoleAPI';
export default {
    name: 'UserRoleCreate',
    components:{
        ToolbarComponent,
        BaseToast,
        DxTagBox
    },
    data() {
        return {
            userRole: {
                UserRoleName: "",
                UserRoleDescription: "",
                RoleEmployee: [],
                RoleContract: []
            },
            isErrorName: false,
            errorName: 'Tên vai trò không được để trống',
            role: data.getListRole(),
            isErrorValidate: true
        }
    },
    methods: {
        backPage(){
            this.$router.push('/user-role');
        },
        saveUserRole(){
            var me = this;
            this.beforeSave();
            //Nếu đầu vào hợp lệ thì insert vào db
            if(!this.isErrorValidate){
                UserRoleAPI.insertUserRole(this.userRole).then(
                    () => {
                        //Toast lên thông báo thêm thành công
                        me.$emit('showToast', true, 'Thêm mới thành công', false);
                        //back lại trang danh sách
                        me.backPage();
                    },
                    (err) => {}
                ).catch(() => {
                    me.$emit('showToast', true, 'Có lỗi xảy ra', true);
                });
            }
        },
        //Validate dữ liệu trước khi insert
        validate(){
            if(!this.userRole.UserRoleName){
                this.isErrorName = true;
            }
        },
        beforeSave(){
            this.validate();
            if(this.isErrorName){
                this.isErrorValidate = true;
            }else{
                this.isErrorValidate = false;
            }
        },
        clickRoleEmployee(e){
            if(e){
                let role =  e?.itemData;
                let roleCodeEmployee = this.userRole.RoleEmployee?.map(x=> x.RoleCode);
                if(!roleCodeEmployee?.includes(role.RoleCode)){
                    this.userRole.RoleEmployee.push(role);
                }else{
                    this.userRole.RoleEmployee.splice(this.userRole.RoleEmployee?.findIndex(x => x.RoleCode == role.RoleCode), 1);
                }
            }
        },
        clickRoleContract(e){
            if(e){
                let role =  e?.itemData;
                let roleCodeEmployee = this.userRole.RoleContract?.map(x=> x.RoleCode);
                if(!roleCodeEmployee?.includes(role.RoleCode)){
                    this.userRole.RoleContract.push(role);
                }else{
                    this.userRole.RoleContract.splice(this.userRole.RoleContract?.findIndex(x => x.RoleCode == role.RoleCode), 1);
                }
            }
        },
        selection(e){
            console.log(e);
        }
    },
}
</script>
<style scoped>
.btn-cancel{
    height: 36px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    color: #1f1f20;
    cursor: pointer;
    min-width: 80px;
    margin-right: 16px;
}
.btn-cancel:hover{
    background-color: #eff1f6;
}
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
.title-form-group{
    font-size: 16px;
    font-weight: 700;
}
.organization-create-content{
    margin-bottom: 16px
}
.form-content{
    height: 100%;
    overflow-y: scroll;
}
.error-input .dx-texteditor.dx-editor-outlined{
    border-color: red;
}
</style>
<style>
.dx-dropdownlist-popup-wrapper .dx-popup-content {
    max-height: 300px !important;
}
.dx-state-disabled .dx-dropdowneditor-input-wrapper{
    background-color: #ebecf2;
}
</style>