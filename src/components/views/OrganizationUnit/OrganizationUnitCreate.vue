<template>
    <div class="h-full w-full flex flex-column">
        <ToolbarComponent 
            :title-component="'Thêm cơ cấu tổ chức'" 
            :show-icon-back="true" 
            @backPage="backPage"
            :show-btn-add="false"
        >
            <template v-slot:custom-btn>
                <div class="btn-save" @click="saveOrganizationUnit">
                    <div class="title-save">Lưu</div>
                </div>
            </template>
        </ToolbarComponent>
        <div class="organization-create-content flex flex-row">
            <div class="box-content flex flex-column">
                <div class="input-row flex">
                    <div class="title-input-row">Mã đơn vị <span style="color: red;">*</span></div>
                    <div class="input-row-content">
                        <input type="text" class="field-row-input" ref="organizationUnitCode" tabindex="1" :class="{'field-row-input-error': isErrorCode}" v-model="organizationUnit.OrganizationUnitCode">
                        <div v-if="isErrorCode" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorCode }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Tên đơn vị <span style="color: red;">*</span></div>
                    <div class="input-row-content">
                        <input type="text" class="field-row-input" :class="{'field-row-input-error': isErrorName}" tabindex="2" v-model="organizationUnit.OrganizationUnitName">
                        <div v-if="isErrorName" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorName }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Tên viết tắt</div>
                    <div class="input-row-content">
                        <input type="text" class="field-row-input" v-model="organizationUnit.ShortCutName" tabindex="3">
                    </div>
                </div>
            </div>
            <div class="box-content flex flex-column">
                <div class="input-row flex">
                    <div class="title-input-row">Địa chỉ</div>
                    <div class="input-row-content">
                        <input type="text" class="field-row-input" v-model="organizationUnit.OrganizationUnitPlace" tabindex="4" @blur="focusToDropdown">
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Trạng thái</div>
                    <div class="input-row-content" style="width: calc(55% + 32px);">
                        <DxSelectBox
                            ref="dropdownStatus"
                            class="select-box-status"
                            :data-source="lstStatus"
                            :value="organizationUnit.StatusID"
                            value-expr="StatusID"
                            display-expr="StatusName"
                            placeholder="Lựa chọn"
                            @value-changed="valueChanged($event)"
                            @focusOut="restartInputFocus"
                        >
                        </DxSelectBox>
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
import OrganizationUnitAPI from '@/api/OrganizationUnitAPI';
import 'devextreme/dist/css/dx.light.css';
import DxSelectBox from 'devextreme-vue/select-box';
import ToolbarComponent from '@/common/ToolbarComponent.vue';
export default {
    name: "OrganizationUnitCreate",
    components:{
        ToolbarComponent,
        DxSelectBox,
        BaseToast
    },
    data() {
        return {
            lstStatus: [
                {
                    StatusID: 1,
                    StatusName: 'Đang theo dõi'
                },
                {
                    StatusID: 2,
                    StatusName: 'Ngừng theo dõi'
                },
            ],
            errorCode: 'Mã đơn vị không được để trống.',
            errorName: 'Tên đơn vị không được để trống',
            organizationUnit:{
                OrganizationUnitCode: null,
                OrganizationUnitName: null,
                OrganizationUnitPlace: null,
                ShortCutName: null,
                StatusID: 1,
                StatusName: 'Đang theo dõi'
            },
            isErrorCode: false,
            isErrorName: false,
            isErrorValidate: true,
            toastMsg: {
                isShowToast: false, //ẩn hiện toast thông báo
                toastText: { type: String }, //Nội dung toast thông báo
                isShowToastError: false, //phân biệt toast thông báo có phải là thông báo lỗi không
            },
        }
    },
    watch:{
        "organizationUnit.OrganizationUnitCode": function(){
                this.isErrorCode = false
        },
        "organizationUnit.OrganizationUnitName": function(){
                this.isErrorName = false
        }
    },
    mounted() {
        this.$refs.organizationUnitCode.focus();
    },
    created() {
        document.title= "Đơn vị | Thông tin nhân sự";
    },
    methods: {
        backPage(){
            this.$router.push('/organization')
        },
        focusToDropdown(){
            this.$refs.dropdownStatus.instance.focus();
        },
        restartInputFocus(){
            this.$refs.organizationUnitCode.focus();
        },
        saveOrganizationUnit(){
            var me = this;
            this.beforeSave();
            //Nếu đầu vào hợp lệ thì insert vào db
            if(!this.isErrorValidate){
                OrganizationUnitAPI.insertOrg(me.organizationUnit).then(
                    () => {
                        //Toast lên thông báo thêm thành công
                        me.$emit('showToast', true, 'Thêm mới thành công', false);
                        //back lại trang danh sách
                        me.backPage();
                    },
                    (err) => {
                        if(err?.response?.data){
                            this.isErrorCode = true;
                            this.errorCode = err?.response?.data?.data?.errors[0];
                        }
                    }
                ).catch(() => {
                    me.$emit('showToast', true, 'Có lỗi xảy ra', true);
                });
            }
        },
        showToast(isShowToast, toastText, isShowToastError){
            this.toastMsg.isShowToast = isShowToast;
            this.toastMsg.isShowToastError = isShowToastError;
            this.toastMsg.toastText = toastText;
        },
        //Validate dữ liệu trước khi insert
        validate(){
            if(!this.organizationUnit.OrganizationUnitCode){
                this.isErrorCode = true;
            }
            if(!this.organizationUnit.OrganizationUnitName){
                this.isErrorName = true
            }
        },
        beforeSave(){
            this.validate();
            if(this.isErrorCode || this.isErrorName){
                this.isErrorValidate = true;
            }else{
                this.isErrorValidate = false;
            }
        },
        valueChanged(e){
            if(e){
                this.organizationUnit.StatusID = e?.value;
                if(e?.value == 1){
                    this.organizationUnit.StatusName = 'Đang theo dõi';
                }
                else{
                    this.organizationUnit.StatusName = 'Ngừng theo dõi';
                }
            }
        }
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
    width: 150px;
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
</style>