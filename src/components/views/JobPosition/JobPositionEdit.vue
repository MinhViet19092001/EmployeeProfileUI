<template>
    <div class="h-full w-full flex flex-column">
           <ToolbarComponent 
               :title-component="'Sửa vị trí công việc'" 
               :show-icon-back="true" 
               @backPage="backPage"
               :show-btn-add="false"
           >
               <template v-slot:custom-btn>
                   <div class="flex align-center justify-center">
                       <div class="btn-cancel" @click="backPage">
                           <div class="tilte-cancel">Hủy</div>
                       </div>
                       <div class="btn-save" @click="saveJobPosition">
                           <div class="title-save">Lưu</div>
                       </div>
                   </div>
               </template>
           </ToolbarComponent>
           <div class="organization-create-content flex flex-row">
            <div class="box-content flex flex-column">
                <div class="input-row flex">
                    <div class="title-input-row">Mã vị trí <span style="color: red;">*</span></div>
                    <div class="input-row-content">
                        <input type="text" class="field-row-input" ref="JobPositionCode" tabindex="1" :class="{'field-row-input-error': isErrorCode}" v-model="jobPosition.jobPositionCode">
                        <div v-if="isErrorCode" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorCode }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Tên vị trí <span style="color: red;">*</span></div>
                    <div class="input-row-content">
                        <input type="text" class="field-row-input" ref="JobPositonName" :class="{'field-row-input-error': isErrorName}" tabindex="2" v-model="jobPosition.jobPositionName">
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
                            :value="jobPosition.jobPositionGroupID"
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
                            :value="jobPosition.jobTitleID"
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
                            :value="jobPosition.organizationUnitID"
                            value-expr="organizationUnitID"
                            display-expr="organizationUnitName"
                            placeholder="Lựa chọn"
                            @value-changed="valueChangedOrg($event)"
                            @item-click="chooseOrg($event)"
                            :noDataText="'Không có dữ liệu'"
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
                            :value="jobPosition.jobPositionStatusID"
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
           <PopupNoticeBase 
               v-if="isShowPopupNotice" 
               :title="'Thông báo'" 
               @closePopup="isShowPopupNotice=false"
               :content-notice="'Bạn có muốn lưu lại các thông tin vừa nhập không? '"
           >
               <template v-slot:custom-btn-footer>
                   <div class="btn-not-save" @click="notsaveJobPosition">
                       <div class="title-not-save">Không lưu</div>
                   </div>
                   <div class="btn-save" @click="saveJobPosition">
                       <div class="title-save">Lưu</div>
                   </div>
               </template>
           </PopupNoticeBase>
    </div>
   </template>
<script>
import PopupNoticeBase from "@/common/PopupNoticeBase.vue";
import ToolbarComponent from '@/common/ToolbarComponent.vue';
import {useRoute} from "vue-router";
import 'devextreme/dist/css/dx.light.css';
import DxSelectBox from 'devextreme-vue/select-box'
import JobPositionAPI from '@/api/JobPositionAPI';
import OrganizationUnitAPI from "@/api/OrganizationUnitAPI";
import { formatInputCurrency } from "@/common/fomatInputCurrency";
export default {
    name: "JobPositionEdit",
    components:{
        ToolbarComponent,
        DxSelectBox,
        PopupNoticeBase
    },
    setup(){
        const route = useRoute();
        const jobPositionID = route.params.id;
        return{
            jobPositionID
        }
    },
    created() {
        this.getObjectJobPosition();
        this.getlstOrg();
    },
    mounted() {
        this.$refs.JobPositionCode.focus();
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
            jobPosition: {},
            isErrorCode: false,
            isErrorName: false,
            isErrorOrg: false,
            isShowPopupNotice: false,
            isErrorValidate: true
        }
    },
    methods: {
        valueChanged(e){
            if(e){
                this.organizationUnit.statusID = e?.value;
                if(e?.value == 1){
                    this.organizationUnit.statusName = 'Đang theo dõi';
                }
                else{
                    this.organizationUnit.statusName = 'Ngừng theo dõi';
                }
            }
        },
        async getObjectJobPosition(){
            var me = this;
            //get ra data từ id
            await JobPositionAPI.getById(this.jobPositionID).then( 
                (res) => {
                    me.jobPosition = res;
                },
                (error) => {

                }
            )
        },
        saveJobPosition(){
            var me = this;
            this.beforeSave();
            if(!this.isErrorValidate){
                JobPositionAPI.updateById(this.jobPositionID, this.jobPosition).then(
                    (res) => {
                        this.$router.push('/jobposition');
                        this.$emit('showToast', true, 'Cập nhật vị trí công việc thành công');
                    },
                    (error) => {
                        this.$emit('showToast', true, 'Cập nhật vị trí công việc thất bại',true);
                    }
    
                )
            }
        },
        //Validate dữ liệu trước khi insert
        validate(){
            if(!this.jobPosition.jobPositionCode){
                this.isErrorCode = true;
            }
            if(!this.jobPosition.jobPositionName){
                this.isErrorName = true
            }
            if(!this.jobPosition.organizationUnitID){
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
        backPage(){
            this.isShowPopupNotice = true
        },
        notsaveJobPosition(){
            this.$router.push('/jobposition')
        },
        valueChangedStatus(e){
            if(e){
                this.jobPosition.jobPositionStatusID = e?.value;
                this.lstStatus.forEach(status => {
                    if(status.StatusID == e?.value){
                        this.jobPosition.jobPositionStatusName = status.StatusName
                    }
                });
            }
        },
        valueChangedJobGroup(e){
            if(e){
                this.jobPosition.jobPositionGroupID = e?.value;
                this.lstJobGroup.forEach(jobGroup => {
                    if(jobGroup.GroupID == e?.value){
                        this.jobPosition.jobPositionGroupName = jobGroup.GroupName
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
                this.jobPosition.jobTitleID = e?.value;
                this.lstJobTitle.forEach(title => {
                    if(title.TitleID == e?.value){
                        this.jobPosition.jobTitleName = title.TitleName
                    }
                });
            }
        },
        async getlstOrg(){
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
                this.jobPosition.organizationUnitID = e?.itemData?.organizationUnitID;
                this.jobPosition.organizationUnitName = e?.itemData?.organizationUnitName;
            }
        },
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
   .btn-not-save{
       height: 36px;
       border-radius: 4px;
       display: flex;
       align-items: center;
       justify-content: center;
       background-color: #e4edff;
       color: #2566e9;
       cursor: pointer;
       min-width: 80px;
       margin-right: 16px;
   }
   .btn-not-save:hover{
       background-color: #d1e0ff;
   }
   .title-save{
       font-size: 14px;
       padding: 0 16px;
   }
   .title-not-save{
       font-size: 14px;
       padding: 0 16px;
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