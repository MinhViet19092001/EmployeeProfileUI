<template>
    <div class="h-full w-full flex flex-column">
        <ToolbarComponent 
            :title-component="'Thêm vị trí công việc'" 
            :show-icon-back="true" 
            @backPage="backPage"
            :show-btn-add="false"
        >
            <template v-slot:custom-btn>
                <div class="btn-save" @click="saveJobPosition">
                    <div class="title-save">Lưu</div>
                </div>
            </template>
        </ToolbarComponent>
        <div class="organization-create-content flex flex-row">
            <div class="box-content flex flex-column">
                <div class="input-row flex">
                    <div class="title-input-row">Mã vị trí <span style="color: red;">*</span></div>
                    <div class="input-row-content">
                        <input type="text" class="field-row-input" ref="JobPositionCode" tabindex="1" :class="{'field-row-input-error': isErrorCode}" v-model="jobPosition.JobPositionCode">
                        <div v-if="isErrorCode" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorCode }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Tên vị trí <span style="color: red;">*</span></div>
                    <div class="input-row-content">
                        <input type="text" class="field-row-input" ref="JobPositonName" :class="{'field-row-input-error': isErrorName}" tabindex="2" v-model="jobPosition.JobPositionName">
                        <div v-if="isErrorName" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorName }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Nhóm vị trí</div>
                    <div class="input-row-content" style="width: calc(55% + 32px);">
                        <DxSelectBox
                            tabindex="3"
                            class="select-box-status"
                            :data-source="lstJobGroup"
                            :value="jobPosition.JobPositionGroupID"
                            value-expr="GroupID"
                            display-expr="GroupName"
                            placeholder="Lựa chọn"
                            @value-changed="valueChangedJobGroup($event)"
                            @open="open"
                        >
                        </DxSelectBox>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Chức danh</div>
                    <div class="input-row-content" style="width: calc(55% + 32px);">
                        <DxSelectBox
                            :tabindex="4"
                            class="select-box-status"
                            :data-source="lstJobTitle"
                            :value="jobPosition.JobTitleID"
                            value-expr="TitleID"
                            display-expr="TitleName"
                            placeholder="Lựa chọn"
                            @value-changed="valueChangedJobTitle($event)"
                        >
                        </DxSelectBox>
                    </div>
                </div>
            </div>
            <div class="box-content flex flex-column">
                <div class="input-row flex">
                    <div class="title-input-row">Đơn vị công tác <span style="color: red;">*</span></div>
                    <div class="input-row-content" v-bind:class="{'error-org': isErrorOrg === true}" style="width: calc(55% + 32px);">
                        <DxSelectBox
                            :tabindex="6"
                            class="select-box-status"
                            :data-source="lstOrg"
                            :value="jobPosition.OrganizationUnitID"
                            value-expr="organizationUnitID"
                            display-expr="organizationUnitName"
                            placeholder="Lựa chọn"
                            @value-changed="valueChangedOrg($event)"
                            @item-click="chooseOrg($event)"
                            :noDataText="'Không có dữ liệu'"
                            @opened="open"
                        >
                        </DxSelectBox>
                        <div v-if="isErrorOrg" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorOrg }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Trạng thái</div>
                    <div class="input-row-content" style="width: calc(55% + 32px);">
                        <DxSelectBox
                            ref="dropdownStatus"
                            :tabindex="8"
                            class="select-box-status"
                            :data-source="lstStatus"
                            :value="jobPosition.JobPositionStatusID"
                            value-expr="StatusID"
                            display-expr="StatusName"
                            placeholder="Lựa chọn"
                            @value-changed="valueChangedStatus($event)"
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
import 'devextreme/dist/css/dx.light.css';
import DxSelectBox from 'devextreme-vue/select-box';
import ToolbarComponent from '@/common/ToolbarComponent.vue';
import JobPositionAPI from '@/api/JobPositionAPI';
import OrganizationUnitAPI from "@/api/OrganizationUnitAPI";
import { formatInputCurrency } from "@/common/fomatInputCurrency"
export default {
    name: "JobPositionCreate",
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
            lstJobGroup: [
                {
                    GroupID: 1,
                    GroupName: 'Quản lý'
                },
                {
                    GroupID: 2,
                    GroupName: 'Nhân sự'
                },
                {
                    GroupID: 3,
                    GroupName: 'Thi công'
                },
                {
                    GroupID: 4,
                    GroupName: 'Khác'
                }
            ],
            lstUnit: [
                {
                    UnitID: 1,
                    UnitName: 'Khối kinh doanh',
                },
                {
                    UnitID: 2,
                    UnitName: 'Khối thi công',
                },
                {
                    UnitID: 3,
                    UnitName: 'Khối lãnh đạo',
                },
                {
                    UnitID: 4,
                    UnitName: 'Khối tuyển dụng',
                },
                {
                    UnitID: 5,
                    UnitName: 'Khối hỗ trợ',
                },
            ],
            lstJobTitle:[
                {
                    TitleID: 1,
                    TitleName: 'Tổng giám đốc'
                },
                {
                    TitleID: 2,
                    TitleName: 'Phó tổng giám đốc'
                },
                {
                    TitleID: 3,
                    TitleName: 'Giám đốc'
                },
                {
                    TitleID: 4,
                    TitleName: 'Phó giám đốc'
                },
                {
                    TitleID: 5,
                    TitleName: 'Trưởng phòng'
                },
                {
                    TitleID: 6,
                    TitleName: 'Phó phòng'
                },
                {
                    TitleID: 7,
                    TitleName: 'Nhân viên'
                },
            ],
            lstOrg: [],
            errorCode: 'Mã đơn vị không được để trống.',
            errorName: 'Tên đơn vị không được để trống',
            errorOrg: 'Đơn vị công tác không được để trống',
            jobPosition: {
                JobPositionCode: null,
                JobPositionName: null,
                JobPositionGroupID: null,
                JobPositionGroupName: null,
                JobTitleID: null,
                JobTitleName: null,
                OrganizationUnitID: null,
                OrganizationUnitName: null,
                JobPositionStatusID: 1,
                JobPositionStatusName: 'Đang theo dõi',
            },
            isErrorCode: false,
            isErrorName: false,
            isErrorOrg: false,
            isErrorValidate: true,
            toastMsg: {
                isShowToast: false, //ẩn hiện toast thông báo
                toastText: { type: String }, //Nội dung toast thông báo
                isShowToastError: false, //phân biệt toast thông báo có phải là thông báo lỗi không
            },
        }
    },
    updated() {
        
    },
    watch:{
        "jobPosition.JobPositionCode": function(){
                this.isErrorCode = false
        },
        "jobPosition.JobPositionName": function(){
                this.isErrorName = false
        }
    },
    mounted() {
        this.$refs.JobPositionCode.focus();
    },
    async created() {
        document.title= "Vị trí công việc | Thông tin nhân sự";
        await JobPositionAPI.getNewCode().then(
            (res) => {
                if(res){
                    this.jobPosition.JobPositionCode = res;
                }
            }
        )
    },
    methods: {
        backPage(){
            this.$router.push('/jobposition')
        },
        restartInputFocus(){
            this.$refs.organizationUnitCode.focus();
        },
        saveJobPosition(){
            var me = this;
            this.beforeSave();
            //Nếu đầu vào hợp lệ thì insert vào db
            if(!this.isErrorValidate){
                JobPositionAPI.insertOrg(me.jobPosition).then(
                    () => {
                        //Toast lên thông báo thêm thành công
                        me.$emit('showToast', true, 'Thêm mới thành công', false);
                        //back lại trang danh sách
                        me.backPage();
                    },
                    (err) => {
                        if(err?.response?.data && err?.response?.data?.data?.errors.length > 0){
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
            if(!this.jobPosition.JobPositionCode){
                this.isErrorCode = true;
            }
            if(!this.jobPosition.JobPositionName){
                this.isErrorName = true
            }
            if(!this.jobPosition.OrganizationUnitID){
                this.isErrorOrg = true
            }
        },
        beforeSave(){
            this.validate();
            if(this.isErrorCode || this.isErrorName || this.isErrorOrg){
                this.isErrorValidate = true;
            }else{
                this.isErrorValidate = false;
            }
        },
        valueChangedStatus(e){
            if(e){
                this.jobPosition.JobPositionStatusID = e?.value;
                this.lstStatus.forEach(status => {
                    if(status.StatusID == e?.value){
                        this.jobPosition.JobPositionStatusName = status.StatusName
                    }
                });
            }
        },
        valueChangedJobGroup(e){
            if(e){
                this.jobPosition.JobPositionGroupID = e?.value;
                this.lstJobGroup.forEach(jobGroup => {
                    if(jobGroup.GroupID == e?.value){
                        this.jobPosition.JobPositionGroupName = jobGroup.GroupName
                    }
                });
            }
        },
        valueChangedOrg(e){
            if(e){
                this.isErrorOrg = false;
            }
        },
        valueChangedJobTitle(e){
            if(e){
                this.jobPosition.JobTitleID = e?.value;
                this.lstJobTitle.forEach(title => {
                    if(title.TitleID == e?.value){
                        this.jobPosition.JobTitleName = title.TitleName
                    }
                });
            }
        },
        async open(){
            var me = this;
            await OrganizationUnitAPI.getAll().then(
                (response) => {
                    me.lstOrg = response;
                },
                (err) => {
                    me.lstOrg = []
                }
            )
        },
        chooseOrg(e){
            if(e){
                this.jobPosition.OrganizationUnitID = e?.itemData?.organizationUnitID;
                this.jobPosition.OrganizationUnitName = e?.itemData?.organizationUnitName;
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