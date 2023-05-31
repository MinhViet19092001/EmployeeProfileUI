<template>
    <div class="h-full w-full flex flex-column">
        <ToolbarComponent 
            :title-component="'Thêm hợp đồng'" 
            :show-icon-back="true" 
            @backPage="backPage"
            :show-btn-add="false"
        >
            <template v-slot:custom-btn>
                <div class="btn-save" @click="saveContract">
                    <div class="title-save">Lưu</div>
                </div>
            </template>
        </ToolbarComponent>
        <div class="organization-create-content flex flex-row">
            <div class="box-content flex flex-column">
                <div class="input-row flex">
                    <div class="title-input-row">Họ và tên NLĐ: <span style="color: red;">*</span></div>
                    <div class="input-row-content" v-bind:class="{'error-input': isErrorEmployeeID === true}" style="width: calc(55% + 32px);">
                        <DxSelectBox
                            tabindex="3"
                            class="select-box-status"
                            :search-enabled="true"
                            :search-mode="'contains'"
                            :search-expr="'FullName'"
                            :data-source="lstEmployee"
                            v-model="contract.EmployeeID"
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
                <div class="input-row flex">
                    <div class="title-input-row">Đơn vị ký hợp đồng: <span style="color: red;">*</span></div>
                    <div class="input-row-content" v-bind:class="{'error-input': isErrorOrg === true}" style="width: calc(55% + 32px);">
                        <DxSelectBox
                            tabindex="3"
                            class="select-box-status"
                            :search-enabled="true"
                            :search-mode="'contains'"
                            :search-expr="'OrganizationUnitName'"
                            :data-source="lstOrg"
                            v-model="contract.OrganizationUnitID"
                            value-expr="OrganizationUnitID"
                            display-expr="OrganizationUnitName"
                            :placeholder="''"
                            :noDataText="'Không có dữ liệu'"
                            @item-click="chooseOrg($event)"
                        >
                        </DxSelectBox>
                        <div v-if="isErrorOrg" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorOrg }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Vị trí công việc <span style="color: red;">*</span></div>
                    <div class="input-row-content" v-bind:class="{'error-input': isErrorJobPosition === true}" style="width: calc(55% + 32px);">
                        <DxSelectBox
                            tabindex="3"
                            class="select-box-status"
                            :search-enabled="true"
                            :search-mode="'contains'"
                            :search-expr="'JobPositionName'"
                            :data-source="lstJobPosition"
                            :value="contract.JobPositionID"
                            value-expr="JobPositionID"
                            display-expr="JobPositionName"
                            :placeholder="''"
                            :noDataText="'Không có dữ liệu'"
                            :disabled="isDisabledJobPostion"
                            @opened="onOpenedOrgJobPosition"
                            @item-click="chooseJobPosition($event)"
                        >
                        </DxSelectBox>
                        <div v-if="isErrorJobPosition" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorJobPosition }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Số hợp đồng: <span style="color: red;">*</span></div>
                    <div class="input-row-content">
                        <input type="text" class="field-row-input" ref="ContractNo" disabled tabindex="1" :class="{'field-row-input-error': isErrorContractNo}" v-model="contract.ContractNo" @keyup="isErrorContractNo=false">
                        <div v-if="isErrorContractNo" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorContractNo }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Tên hợp đồng:</div>
                    <div class="input-row-content">
                        <input type="text" class="field-row-input" ref="ContractName" v-model="contract.ContractName" tabindex="3">
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Loại hợp đồng: <span style="color: red;">*</span></div>
                    <div class="input-row-content" v-bind:class="{'error-input': isErrorContractType === true}" style="width: calc(55% + 32px);">
                        <DxSelectBox
                            tabindex="3"
                            class="select-box-status"
                            :search-enabled="true"
                            :search-mode="'contains'"
                            :search-expr="'ContractTypeName'"
                            :data-source="lstContractType"
                            v-model="contract.ContractTypeID"
                            value-expr="ContractTypeID"
                            display-expr="ContractTypeName"
                            :placeholder="''"
                            :noDataText="'Không có dữ liệu'"
                            @item-click="chooseContractType($event)"
                        >
                        </DxSelectBox>
                        <div v-if="isErrorContractType" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorContractType }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Thời hạn hợp đồng: <span style="color: red;">*</span></div>
                    <div class="input-row-content" v-bind:class="{'error-input': isErrorContractPeriod === true}" style="width: calc(55% + 32px);">
                        <DxSelectBox
                            tabindex="3"
                            class="select-box-status"
                            :search-enabled="true"
                            :search-mode="'contains'"
                            :search-expr="'ContractPeriodName'"
                            :data-source="lstContractPeriod"
                            v-model="contract.ContractPeriodID"
                            value-expr="ContractPeriodID"
                            display-expr="ContractPeriodName"
                            :placeholder="''"
                            :noDataText="'Không có dữ liệu'"
                            @item-click="chooseContractPeriod($event)"
                            @value-changed="valueChangePeriod"
                        >
                        </DxSelectBox>
                        <div v-if="isErrorContractPeriod" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorContractPeriod }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Lương thỏa thuận chính thức:</div>
                    <div class="input-row-content">
                        <input type="text" class="field-row-input" v-model="contract.SalaryBase" @keyup="formatCurrencySalaryBase" tabindex="7">
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Lương đóng bảo hiểm:</div>
                    <div class="input-row-content">
                        <input type="text" class="field-row-input" v-model="contract.SalaryInsurance" @keyup="formatCurrencySalaryInsurance" tabindex="7">
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Lương thỏa thuận thử việc:</div>
                    <div class="input-row-content">
                        <input type="text" class="field-row-input" v-model="contract.SalaryProbation" @keyup="formatCurrencySalaryProbation" tabindex="7">
                    </div>
                </div>
            </div>  
            <div class="box-content flex flex-column">
                <div class="input-row flex">
                    <div class="title-input-row">Mã nhân viên:</div>
                    <div class="input-row-content">
                        <input type="text" class="field-row-input" v-model="contract.EmployeeCode" disabled tabindex="3">
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Hình thức làm việc: </div>
                    <div class="input-row-content" style="width: calc(55% + 32px);">
                        <DxSelectBox
                            tabindex="3"
                            class="select-box-status"
                            :search-enabled="true"
                            :search-mode="'contains'"
                            :search-expr="'WorkTypeName'"
                            :data-source="lstWorkType"
                            v-model="contract.WorkTypeID"
                            value-expr="WorkTypeID"
                            display-expr="WorkTypeName"
                            :placeholder="''"
                            :noDataText="'Không có dữ liệu'"
                            @item-click="chooseWorkType($event)"
                        >
                        </DxSelectBox>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Ngày ký: <span style="color: red;">*</span></div>
                    <div class="input-row-content"  v-bind:class="{'error-input': isErrorSignedDate === true}" style="width: calc(55% + 32px);">
                        <DxDateBox
                            v-model="contract.SignedDate"
                            type="date"
                            :placeholder="'DD/MM/YYYY'"
                            display-format="dd/MM/yyyy"
                            :use-mask-behavior="true"
                        />
                        <div v-if="isErrorSignedDate" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorSignedDate }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Ngày có hiệu lực: <span style="color: red;">*</span></div>
                    <div class="input-row-content"  v-bind:class="{'error-input': isErrorStartDate === true}" style="width: calc(55% + 32px);">
                        <DxDateBox
                            v-model="contract.StartDate"
                            type="date"
                            :placeholder="'DD/MM/YYYY'"
                            display-format="dd/MM/yyyy"
                            :use-mask-behavior="true"
                        />
                        <div v-if="isErrorStartDate" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorStartDate }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Ngày hết hạn: <span style="color: red;">*</span></div>
                    <div class="input-row-content"  v-bind:class="{'error-input': isErrorEndDate === true}" style="width: calc(55% + 32px);">
                        <DxDateBox
                            v-model="contract.EndDate"
                            type="date"
                            :placeholder="'DD/MM/YYYY'"
                            display-format="dd/MM/yyyy"
                            :use-mask-behavior="true"
                        />
                        <div v-if="isErrorEndDate" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorEndDate }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Người đại diện công ty ký:</div>
                    <div class="input-row-content" style="width: calc(55% + 32px);">
                        <DxSelectBox
                            tabindex="3"
                            class="select-box-status"
                            :search-enabled="true"
                            :search-mode="'contains'"
                            :search-expr="'FullName'"
                            :data-source="lstEmployeeSigned"
                            v-model="contract.OnBehalfOfEmployeeID"
                            value-expr="EmployeeID"
                            display-expr="FullName"
                            :placeholder="''"
                            :noDataText="'Không có dữ liệu'"
                            @opened="onOpenedListEmployeeSign"
                            @item-click="chooseEmployeeSigned($event)"
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
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Chức danh người đại diện ký:</div>
                    <div class="input-row-content">
                        <input type="text" class="field-row-input" v-model="contract.TitleNameOfEmployeeSign" disabled tabindex="3">
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Trạng thái ký: <span style="color: red;">*</span></div>
                    <div class="input-row-content"  v-bind:class="{'error-input': isErrorContractStatusSign === true}" style="width: calc(55% + 32px);">
                        <DxSelectBox
                            tabindex="3"
                            class="select-box-status"
                            :search-enabled="true"
                            :search-mode="'contains'"
                            :search-expr="'ContractStatusSignName'"
                            :data-source="lstContractStatusSignID"
                            v-model="contract.ContractStatusSignID"
                            value-expr="ContractStatusSignID"
                            display-expr="ContractStatusSignName"
                            :placeholder="''"
                            :noDataText="'Không có dữ liệu'"
                            @item-click="chooseContractStatusSigned($event)"
                        >
                        </DxSelectBox>
                        <div v-if="isErrorContractStatusSign" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorContractStatusSign }}</div>
                    </div>
                </div>
            </div>  
        </div>
    </div>  
</template>
<script>
import { createAvatar, createBgAvatar } from "@/common/avatar";
import BaseToast from "@/common/BaseToast.vue";
import 'devextreme/dist/css/dx.light.css';
import DxSelectBox from 'devextreme-vue/select-box';
import DxDateBox from 'devextreme-vue/date-box';
import ToolbarComponent from '@/common/ToolbarComponent.vue';
import JobPositionAPI from '@/api/JobPositionAPI';
import ArrayStore from 'devextreme/data/array_store';
import data from '@/common/data.js';
import OrganizationUnitAPI from "@/api/OrganizationUnitAPI";
import { formatInputCurrency } from "@/common/fomatInputCurrency";
import ContractAPI from '@/api/ContractAPI';
export default {
    name: "ContractCreate",
    components:{
        BaseToast,
        DxSelectBox,
        ToolbarComponent,
        OrganizationUnitAPI,
        JobPositionAPI,
        DxDateBox
    },
    created() {
        this.getNewContractNo();
        this.contract.StartDate = new Date();
        this.contract.SignedDate = new Date();
    },
    mounted() {
        this.$refs.ContractName.focus();
    },
    data() {
        return {
            contract: {},
            isErrorEmployeeID: false,
            errorEmployeeID: "Họ và tên NLĐ không được để trống",
            //show lỗi input đơn vị công tác
            isErrorOrg: false,
            //text lỗi input đơn vị công tác
            errorOrg: 'Đơn vị công tác không được để trống',
            lstOrg: new ArrayStore({
                data: this.getAllOrg(),
                key: 'OrganizationUnitID',
                paginate: true,
            }),
            isErrorEndDate: false,
            errorEndDate: 'Ngày hết hạn không được để trống',
            isErrorStartDate: false,
            errorStartDate: 'Ngày có hiệu lực không được để trống',
            isErrorSignedDate: false,
            errorSignedDate: 'Ngày ký không được để trống',
            isErrorContractNo: false,
            errorContractNo: 'Số hợp đồng không được để trống',
            lstContractType: data.getListContractType(),
            isErrorContractType: false,
            errorContractType: 'Loại hợp đồng không được để trống',
            lstContractPeriod: data.getListContractPeriod(),
            isErrorContractPeriod: false,
            errorContractPeriod: 'Thời hạn hợp đồng không được dể trống',
            lstWorkType: data.getListWorkType(),
            lstEmployeeSigned: [],
            lstEmployee: [],
            lstContractStatusSignID: data.getListContractStatusSign(),
            isErrorContractStatusSign: false,
            errorContractStatusSign: "Trạng thái ký không được để trống",
            isDisabledJobPostion: true,
            lstJobPosition: [],
            isErrorJobPosition: false,
            errorJobPosition: 'Vị trí công việc không được để trống'
        }
    },
    methods: {
        //tạo tên avatar
        avatar(name) {
            return createAvatar(name);
        },
        //tạo bg cho avatar
        bgAvatar(name) {
            return createBgAvatar(this.avatar(name));
        },
        getNewContractNo(){
            ContractAPI.getNewContractNo().then(
                (res) => {
                    this.contract.ContractNo = res;
                },
                (err) => {

                }
            )
        },
        backPage(){
            this.$router.push('/contract');
        },
        getAllOrg(){
            var listOrg = [];
            OrganizationUnitAPI.getAll().then(
                (response) => {
                    response.forEach(res => {
                        var org = {
                            OrganizationUnitID: res.organizationUnitID,
                            OrganizationUnitName: res.organizationUnitName
                        }
                        listOrg.push(org);
                    });
                }
            )
            return listOrg;
        },
        formatCurrencySalaryBase(){
            this.contract.SalaryBase = formatInputCurrency(this.contract.SalaryBase);
        },
        formatCurrencySalaryInsurance(){
            this.contract.SalaryInsurance = formatInputCurrency(this.contract.SalaryInsurance);
        },
        formatCurrencySalaryProbation(){
            this.contract.SalaryProbation = formatInputCurrency(this.contract.SalaryProbation);
        },
        onOpenedOrgJobPosition(){
            if(this.contract.OrganizationUnitID){
                JobPositionAPI.getJobPositionByOrg(this.contract.OrganizationUnitID).then(
                    (res) => {
                        this.lstJobPosition = res;
                    },
                    (err) => {

                    }
                )
            }
        },
        async onOpenedListEmployee(){
            await ContractAPI.getEmployee().then(
                (res) => {
                    this.lstEmployee = res;
                },
                (err) => {
                    
                }
            )
        },
        async onOpenedListEmployeeSign(){
            await ContractAPI.getEmployeeSign().then(
                (res) => {
                    this.lstEmployeeSigned = res;
                },
                (err) => {
                    
                }
            )
        },
        chooseOrg(e){
            if(e){
                this.isDisabledJobPostion = false;
                this.contract.OrganizationUnitID = e?.itemData?.OrganizationUnitID;
                this.contract.OrganizationUnitName = e?.itemData?.OrganizationUnitName;
            }
        },
        chooseJobPosition(e){
            if(e){
                this.isErrorJobPosition = false;
                this.contract.JobPositionID = e?.itemData?.JobPositionID;
                this.contract.JobPositionName = e?.itemData?.JobPositionName;
            }
        },
        chooseContractType(e){
            if(e){
                this.isErrorContractType = false;
                this.contract.ContractTypeID = e?.itemData?.ContractTypeID;
                this.contract.ContractTypeName = e?.itemData?.ContractTypeName;
            }
        },
        chooseContractPeriod(e){
            if(e){
                this.isErrorContractPeriod = false;
                this.contract.ContractPeriodID = e?.itemData?.ContractPeriodID;
                this.contract.ContractPeriodName = e?.itemData?.ContractPeriodName;
            }
        },
        chooseWorkType(e){
            if(e){
                this.contract.WorkTypeID = e?.itemData?.WorkTypeID;
                this.contract.WorkTypeName = e?.itemData?.WorkTypeName;
            }
        },
        chooseEmployee(e){
            if(e){
                this.contract.EmployeeCode = e?.itemData?.EmployeeCode;
                this.contract.SalaryBase = e?.itemData?.SalaryBase;
                this.contract.SalaryInsurance = e?.itemData?.SalaryInsurance;
                this.contract.SalaryProbation = e?.itemData?.SalaryProbation;
            }
        },
        chooseEmployeeSigned(e){

        },
        chooseContractStatusSigned(e){
            if(e){
                this.isErrorContractStatusSign = false;
                this.contract.ContractStatusSignID = e?.itemData?.ContractStatusSignID;
                this.contract.ContractStatusSignName = e?.itemData?.ContractStatusSignName;
            }
        },
         //Lưu nhân viên
         saveContract(){
            var me = this;
            this.validate();
            if(this.isValiteDate){
                ContractAPI.postContract(this.contract).then(
                    () => {
                        //Toast lên thông báo thêm thành công
                        me.$emit('showToast', true, 'Thêm mới thành công', false);
                        //back lại trang danh sách
                        me.backPage();
                    },
                    (err) => {
                        if(err?.response?.data && err?.response?.data?.data?.errors.length > 0){
                            this.isErrorContractNo = true;
                            this.errorContractNo = err?.response?.data?.data?.errors[0];
                        }
                    }
                ).catch(
                    () => {
                        me.$emit('showToast', true, 'Có lỗi xảy ra', true);
                    }
                )
            }
        },
        //validate dữ liệu trống
        validate(){
            if(!this.contract.EmployeeID){
                this.isErrorEmployeeID = true;
            }
            if(!this.contract.OrganizationUnitID){
                this.isErrorOrg = true;
            }
            if(!this.contract.JobPositionID){
                this.isErrorJobPosition = true;
            }
            if(!this.contract.ContractNo){
                this.isErrorContractNo = true;
            }
            if(!this.contract.ContractTypeID){
                this.isErrorContractType = true;
            }
            if(!this.contract.ContractPeriodID){
                this.isErrorContractPeriod = true;
            }
            if(!this.contract.SignedDate){
                this.isErrorSignedDate = true;
            }
            if(!this.contract.StartDate){
                this.isErrorStartDate = true;
            }
            if(!this.contract.EndDate){
                this.isErrorEndDate = true;
            }
            if(!this.contract.ContractStatusSignID){
                this.isErrorContractStatusSign = true
            }
            if(this.isErrorEmployeeID || this.isErrorOrg || this.isErrorJobPosition || this.isErrorContractNo || this.isErrorContractType || this.isErrorContractPeriod || this.isErrorSignedDate || this.isErrorStartDate || this.isErrorEndDate || this.isErrorContractStatusSign){
                this.isValiteDate = false;
                this.$emit('showToast', true, 'Dữ liệu đầu vào chưa hợp lệ.Vui lòng kiểm tra lại', true);
            }else{
                this.isValiteDate = true;
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