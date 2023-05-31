<template>
<div class="h-full w-full flex flex-column">
        <ToolbarComponent
            :title-component="'Sửa hồ sơ'"
            :show-btn-add="false"
        >
            <template v-slot:custom-btn>
                   <div class="flex align-center justify-center">
                       <div class="btn-cancel" @click="backPage">
                           <div class="tilte-cancel">Hủy</div>
                       </div>
                       <div class="btn-save" @click="saveEmployee">
                           <div class="title-save">Lưu</div>
                       </div>
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
                                <div class="title-input-row">Họ và đệm <span style="color: red;">*</span></div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" ref="firstName" :class="{'field-row-input-error': isErrorFirstName}" tabindex="2" v-model="employee.firstName">
                                    <div v-if="isErrorFirstName" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorFirstName }}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Tên <span style="color: red;">*</span></div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" :class="{'field-row-input-error': isErrorName}" tabindex="3" v-model="employee.lastName">
                                    <div v-if="isErrorName" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorName }}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Họ và tên <span style="color: red;">*</span></div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" tabindex="4" disabled v-model="employee.fullName">
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Giới tính</div>
                                <div class="input-row-content" style="width: calc(55% + 32px);">
                                    <DxSelectBox
                                        tabindex="3"
                                        class="select-box-status"
                                        :data-source="lstSex"
                                        v-model="employee.sexID"
                                        value-expr="SexID"
                                        display-expr="SexName"
                                        :placeholder="''"
                                        @item-click="chooseSex($event)"
                                    >
                                    </DxSelectBox>
                                </div>
                            </div>

                        </div>
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Ngày sinh</div>
                                <div class="input-row-content" style="width: calc(55% + 32px);">
                                    <DxDateBox
                                        v-model="employee.birthDay"
                                        type="date"
                                        :placeholder="'DD/MM/YYYY'"
                                        display-format="dd/MM/yyyy"
                                        :use-mask-behavior="true"
                                    />
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Nguyên quán</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" tabindex="4" v-model="employee.homeTown">
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Nơi sinh</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" tabindex="4" v-model="employee.birthPlace">
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">MST cá nhân</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" tabindex="4" v-model="employee.taxPersonal">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="organization-create-content flex flex-column" style="margin: 0 16px 16px !important;">
                <div class="form-group w-full">
                    <div class="title-form-group">CMND/Thẻ căn cước</div>
                    <div class="content-from-group flex flex-row">
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Loại giấy tờ</div>
                                <div class="input-row-content" style="width: calc(55% + 32px);">
                                    <DxSelectBox
                                        tabindex="3"
                                        class="select-box-status"
                                        :data-source="lstTypeIdentification"
                                        v-model="employee.typeIdentificationID"
                                        value-expr="TypeIdentificationID"
                                        display-expr="TypeIdentificationName"
                                        :placeholder="''"
                                        @item-click="chooseTypeIdentification($event)"
                                    >
                                    </DxSelectBox>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Số CCCD/CMND</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" tabindex="4" v-model="employee.numberIdentification">
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Ngày cấp (CCCD/CMND)</div>
                                <div class="input-row-content" style="width: calc(55% + 32px);">
                                    <DxDateBox
                                        v-model="employee.dateIdentification"
                                        type="date"
                                        :placeholder="'DD/MM/YYYY'"
                                        display-format="dd/MM/yyyy"
                                        :use-mask-behavior="true"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Nơi cấp (CCCD/CMND)</div>
                                <div class="input-row-content" style="width: calc(55% + 32px);">
                                    <DxSelectBox
                                        tabindex="3"
                                        class="select-box-status"
                                        :data-source="lstCity"
                                        v-model="employee.placeIdentificationID"
                                        value-expr="CityID"
                                        display-expr="CityName"
                                        :placeholder="''"
                                        @item-click="choosePlaceIdentification($event)"
                                    >
                                    </DxSelectBox>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Ngày hết hạn CCCD/CMND</div>
                                <div class="input-row-content" style="width: calc(55% + 32px);">
                                    <DxDateBox
                                        v-model="employee.endDateIdentification"
                                        type="date"
                                        :placeholder="'DD/MM/YYYY'"
                                        display-format="dd/MM/yyyy"
                                        :use-mask-behavior="true"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="organization-create-content flex flex-column" style="margin: 0 16px 16px !important;">
                <div class="form-group w-full">
                    <div class="title-form-group">Thông tin công việc</div>
                    <div class="content-from-group flex flex-row">
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Đơn vị công tác <span style="color: red;">*</span></div>
                                <div class="input-row-content" v-bind:class="{'error-input': isErrorOrg === true}" style="width: calc(55% + 32px);">
                                    <DxSelectBox
                                        tabindex="3"
                                        class="select-box-status"
                                        :search-enabled="true"
                                        :search-mode="'contains'"
                                        :search-expr="'OrganizationUnitName'"
                                        :data-source="lstOrg"
                                        v-model="employee.organizationUnitID"
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
                                        v-model="employee.jobPositionID"
                                        value-expr="JobPositionID"
                                        display-expr="JobPositionName"
                                        :placeholder="''"
                                        :noDataText="'Không có dữ liệu'"
                                        @item-click="chooseJobPosition"
                                    >
                                    </DxSelectBox>
                                    <div v-if="isErrorJobPosition" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorJobPosition }}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Trạng thái lao động <span style="color: red;">*</span></div>
                                <div class="input-row-content" v-bind:class="{'error-input': isErrorEmployeeStatus === true}" style="width: calc(55% + 32px);">
                                    <DxSelectBox
                                        tabindex="3"
                                        class="select-box-status"
                                        :search-enabled="true"
                                        :search-mode="'contains'"
                                        :search-expr="'EmployeeStatusName'"
                                        :data-source="lstEmployeeStatus"
                                        :value="employee.employeeStatusID"
                                        value-expr="EmployeeStatusID"
                                        display-expr="EmployeeStatusName"
                                        :placeholder="''"
                                        :noDataText="'Không có dữ liệu'"
                                        @item-click="chooseEmployeeStatus"
                                    >
                                    </DxSelectBox>
                                    <div v-if="isErrorEmployeeStatus" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorEmployeeStatus }}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Tính chất lao động <span style="color: red;">*</span></div>
                                <div class="input-row-content" v-bind:class="{'error-input': isErrorEmployeeNature === true}" style="width: calc(55% + 32px);">
                                    <DxSelectBox
                                        tabindex="3"
                                        class="select-box-status"
                                        :search-enabled="true"
                                        :search-mode="'contains'"
                                        :search-expr="'EmployeeNatureName'"
                                        :data-source="lstEmployeeNature"
                                        :value="employee.employeeNatureID"
                                        value-expr="EmployeeNatureID"
                                        display-expr="EmployeeNatureName"
                                        :placeholder="''"
                                        :noDataText="'Không có dữ liệu'"
                                        @item-click="clickEmployeeNature($event)"
                                    >
                                    </DxSelectBox>
                                    <div v-if="isErrorEmployeeNature" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorEmployeeNature }}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Địa điểm làm việc</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" tabindex="4" v-model="employee.EmployeeWorkPlace">
                                </div>
                            </div>
                        </div>
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Ngày học việc</div>
                                <div class="input-row-content" style="width: calc(55% + 32px);">
                                    <DxDateBox
                                        v-model="employee.probationDate"
                                        type="date"
                                        :placeholder="'DD/MM/YYYY'"
                                        display-format="dd/MM/yyyy"
                                        :use-mask-behavior="true"
                                    />
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Ngày thử việc</div>
                                <div class="input-row-content" style="width: calc(55% + 32px);">
                                    <DxDateBox
                                        v-model="employee.hireDate"
                                        type="date"
                                        :placeholder="'DD/MM/YYYY'"
                                        display-format="dd/MM/yyyy"
                                        :use-mask-behavior="true"
                                    />
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Ngày chính thức</div>
                                <div class="input-row-content" style="width: calc(55% + 32px);">
                                    <DxDateBox
                                        v-model="employee.receiveDate"
                                        type="date"
                                        :placeholder="'DD/MM/YYYY'"
                                        display-format="dd/MM/yyyy"
                                        :use-mask-behavior="true"
                                    />
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Lí do nghỉ</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" tabindex="4" v-model="employee.employeeTerminationReason" v-bind:disabled="isDisabledTerminationReason">
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Ngày nghỉ việc</div>
                                <div class="input-row-content" style="width: calc(55% + 32px);">
                                    <DxDateBox
                                        v-model="employee.terminationDate"
                                        type="date"
                                        :placeholder="'DD/MM/YYYY'"
                                        display-format="dd/MM/yyyy"
                                        :disabled="isDisabledTerminationDate"
                                        :use-mask-behavior="true"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="organization-create-content flex flex-column" style="margin: 0 16px 16px !important;">
                <div class="form-group w-full">
                    <div class="title-form-group">Thông tin lương</div>
                    <div class="content-from-group flex flex-row">
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Lương thỏa thuận chính thức</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" v-model="employee.salaryBase" @keyup="formatCurrencySalaryBase" tabindex="7">
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Lương đóng bảo hiểm</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" v-model="employee.salaryInsurance" @keyup="formatCurrencySalaryInsurance" tabindex="7">
                                </div>
                            </div>
                        </div>
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Lương thỏa thuận thử việc</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" v-model="employee.salaryProbation" @keyup="formatCurrencySalaryProbation" tabindex="7">
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Ngân hàng</div>
                                <div class="input-row-content" style="width: calc(55% + 32px);">
                                    <DxSelectBox
                                        tabindex="3"
                                        class="select-box-status"
                                        :search-enabled="true"
                                        :search-mode="'contains'"
                                        :search-expr="'BankName'"
                                        :data-source="lstBank"
                                        v-model="employee.bankID"
                                        value-expr="BankID"
                                        display-expr="BankName"
                                        :placeholder="''"
                                        :noDataText="'Không có dữ liệu'"
                                        @item-click="chooseBank($event)"
                                    >
                                    </DxSelectBox>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">TK ngân hàng</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" v-model="employee.bankAccountNo" tabindex="7">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="organization-create-content flex flex-column" style="margin: 0 16px 16px !important;">
                <div class="form-group w-full">
                    <div class="title-form-group">Số điện thoại/Email/Khác</div>
                    <div class="content-from-group flex flex-row">
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">ĐT di động</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" v-model="employee.phoneNumber" tabindex="7">
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Email cá nhân</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" v-model="employee.email" tabindex="7">
                                </div>
                            </div>
                        </div>
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Facebook</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" v-model="employee.facebook" tabindex="7">
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Zalo</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" v-model="employee.zalo" tabindex="7">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="organization-create-content flex flex-column" style="margin: 0 16px 16px !important;">
                <div class="form-group w-full">
                    <div class="title-form-group">Hộ khẩu thường trú</div>
                    <div class="content-from-group flex flex-row">
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Tỉnh thành phố (HKTT)</div>
                                <div class="input-row-content" style="width: calc(55% + 32px);">
                                    <DxSelectBox
                                        tabindex="3"
                                        class="select-box-status"
                                        :search-enabled="true"
                                        :search-mode="'contains'"
                                        :search-expr="'EducationDegreeName'"
                                        :data-source="lstCity"
                                        v-model="employee.nativeProvinceID"
                                        value-expr="CityID"
                                        display-expr="CityName"
                                        :placeholder="''"
                                        :noDataText="'Không có dữ liệu'"
                                        @item-click="chooseNativeProvince"
                                    >
                                    </DxSelectBox>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Quận huyện (HKTT)</div>
                                <div class="input-row-content" style="width: calc(55% + 32px);">
                                    <DxSelectBox
                                        tabindex="3"
                                        class="select-box-status"
                                        :search-enabled="true"
                                        :search-mode="'contains'"
                                        :search-expr="'DistrictName'"
                                        :data-source="lstDistrict"
                                        v-model="employee.nativeDistrictID"
                                        value-expr="DistrictID"
                                        display-expr="DistrictName"
                                        :placeholder="''"
                                        :noDataText="'Không có dữ liệu'"
                                        @item-click="chooseNativeDistrict"
                                    >
                                    </DxSelectBox>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Phường/Xã (HKTT)</div>
                                <div class="input-row-content" style="width: calc(55% + 32px);">
                                    <DxSelectBox
                                        tabindex="3"
                                        class="select-box-status"
                                        :search-enabled="true"
                                        :search-mode="'contains'"
                                        :search-expr="'WardName'"
                                        :data-source="lstWard"
                                        v-model="employee.nativeWardID"
                                        value-expr="WardID"
                                        display-expr="WardName"
                                        :placeholder="''"
                                        :noDataText="'Không có dữ liệu'"
                                        @item-click="chooseNativeWard"
                                    >
                                    </DxSelectBox>
                                </div>
                            </div>
                        </div>
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Số nhà, đường phố (HKTT)</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" v-model="employee.nativeStreetHouseNumber" tabindex="7">
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Hộ khẩu thường trú</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" v-model="employee.nativeAddress" disabled tabindex="7">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="organization-create-content flex flex-column" style="margin: 0 16px 16px !important;">
                <div class="form-group w-full">
                    <div class="title-form-group">Thông tin tài khoản</div>
                    <div class="content-from-group flex flex-row">
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Email tài khoản</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" v-model="employee.emailUserName" tabindex="7">
                                </div>
                            </div>
                        </div>
                        <div class="box-content flex flex-column">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {useRoute} from "vue-router";
import EmployeeAPI from '@/api/EmployeeAPI';
import DxDateBox from 'devextreme-vue/date-box';
import 'devextreme/dist/css/dx.light.css';
import DxSelectBox from 'devextreme-vue/select-box';
import ToolbarComponent from '@/common/ToolbarComponent.vue';
import data from '@/common/data.js';
import ProvinceAPI from '@/api/ProvinceAPI';
import ArrayStore from 'devextreme/data/array_store';
import OrganizationUnitAPI from '@/api/OrganizationUnitAPI';
import JobPositionAPI from '@/api/JobPositionAPI';
import BankAPI from '@/api/BankAPI';
import { formatInputCurrency } from "@/common/fomatInputCurrency";
export default {
    name: 'EmployeeEdit',
    components:{
        DxDateBox,
        DxSelectBox,
        ToolbarComponent,
        ProvinceAPI
    },
    setup(){
        const route = useRoute();
        const employeeID = route.params.id;
        return{
            employeeID
        }
    },
    data() {
        return {
            employee: {},
            //show lỗi input họ và đệm
            isErrorFirstName: false,
            //text lỗi input firstName
            errorFirstName: 'Họ và đệm không được để trống',
            //show lỗi input tên,
            isErrorName: false,
            //show lỗi input tên
            errorName: 'Tên không được để trống',
            //danh sách giới tính
            lstSex: data.getListSex(),
            //Danh sách loại giấy tờ
            lstTypeIdentification: data.getListTypeIdentification(),
            //Danh sách tỉnh, thành phố
            lstCity: new ArrayStore({
                data: this.getProvince(),
                key: 'CityID',
                paginate: true,
            }),
            //Xếp loại
            lstEducationDegree: data.getListEducationDegree(),
            //show lỗi input đơn vị công tác
            isErrorOrg: false,
            //text lỗi input đơn vị công tác
            errorOrg: 'Đơn vị công tác không được để trống',
            lstOrg: new ArrayStore({
                data: this.getAllOrg(),
                key: 'OrganizationUnitID',
                paginate: true,
            }),
            //show lỗi input vị trí công việc
            isErrorJobPosition: false,
            //show lỗi input trạng thái lao động
            isErrorEmployeeStatus: false,
            //text lỗi input trạng thái lao đông
            errorEmployeeStatus: 'Trạng thái lao động không được để trống',
            errorJobPosition: 'Vị trí công việc không được để trống',
            lstJobPosition: [],
            lstEmployeeStatus: data.getListEmployeeStatus(),
            lstEmployeeNature: data.getListEmployeeNature(),
            //show lỗi input tính chất lao động
            isErrorEmployeeNature: false,
            //text lỗi input tính chất lao động
            errorEmployeeNature: 'Tính chất lao động không được để trống',
            isDisabledTerminationReason: true,
            isDisabledTerminationDate: true,
            lstBank: new ArrayStore({
                data: this.getBank(),
                key: 'BankID',
                paginate: true,
            }),
            lstDistrict: [],
            lstWard: [],
            isValiteDate: false
        }
    },
    created() {
        this.getInfoEmployee();
    },
    mounted() {
        this.$refs.firstName.focus();
    },
    watch: {
        "employee.firstName": function(){
            this.isErrorFirstName = false;
            this.getFullName();
        },
        "employee.lastName": function(){
            this.isErrorName = false;
            this.getFullName();
        },
        "employee.nativeStreetHouseNumber": function(){
            this.getNativeAddress();
        },
        "employee.nativeWardID": function(){
            this.getNativeAddress();
        },
        "employee.nativeDistrictID": function(){
            this.getNativeAddress();
            this.getWard(this.employee.nativeDistrictID);
        },
        "employee.nativeProvinceID": function(){
            this.getNativeAddress();
            this.getDistrict(this.employee.nativeProvinceID);
        },
        "employee.nativeCountryName": function(){
            this.getNativeAddress();
        },
        "employee.organizationUnitID": function(){
            this.isErrorOrg = false;
            this.getJobPosition();
        },
        "employee.jobPositionID": function(){
            this.isErrorJobPosition = false;
        },
        "employee.employeeStatusID": function(){
            this.isErrorEmployeeStatus = false;
        },
        "employee.employeeNatureID": function(){
            this.isErrorEmployeeNature = false;
        },
    },
    methods: {
        backPage(){
            this.$router.push('/employee');
        },
        saveEmployee(){
            var me = this;
            this.validate();
            if(this.isValiteDate){
                EmployeeAPI.putEmployee(this.employee.employeeID, this.employee).then(
                    (res) => {
                        this.$router.push('/jobposition');
                        this.$emit('showToast', true, 'Cập nhật hồ sơ thành công');
                    },
                    (error) => {
                        this.$emit('showToast', true, 'Cập nhật hồ sơ thất bại',true);
                    }
    
                )
            }
        },
         //Validate dữ liệu trước khi insert
         validate(){
            if(!this.employee.firstName){
                this.isErrorFirstName = true;
            }
            if(!this.employee.lastName){
                this.isErrorName = true;
            }
            if(!this.employee.organizationUnitID){
                this.isErrorOrg = true;
            }
            if(!this.employee.jobPositionID){
                this.isErrorJobPosition = true;
            }
            if(!this.employee.employeeStatusID){
                this.isErrorEmployeeStatus = true;
            }
            if(!this.employee.employeeNatureID){
                this.isErrorEmployeeNature = true;
            }
            if(this.isErrorFirstName || this.isErrorName || this.isErrorOrg || this.isErrorJobPosition || this.isErrorEmployeeStatus || this.isErrorEmployeeNature){
                this.isValiteDate = false;
                this.$emit('showToast', true, 'Dữ liệu đầu vào chưa hợp lệ.Vui lòng kiểm tra lại', true);
            }else{
                this.isValiteDate = true;
            }
        },
        async getInfoEmployee(){
            var me = this;
            await EmployeeAPI.getById(this.employeeID).then(
                (res) => {
                    me.employee = res;
                },
                (error) => {

                }
            )
        },
        getFullName: function(){
            this.employee.fullName = (this.employee.firstName == undefined || this.employee.firstName == null ? '' : this.employee.firstName) + " " + (this.employee.lastName == undefined || this.employee.lastName == null ? '' : this.employee.lastName);
        },
        getNativeAddress: function(){
            this.employee.nativeAddress = (this.employee.nativeStreetHouseNumber == undefined || this.employee.nativeStreetHouseNumber == null ? '' : (this.employee.nativeStreetHouseNumber + ', ')) + (this.employee.nativeWardName == undefined || this.employee.nativeWardName == null ? '' : (this.employee.nativeWardName + ', ')) + (this.employee.nativeDistrictName == undefined || this.employee.nativeDistrictName == null ? '' : (this.employee.nativeDistrictName + ', ')) + (this.employee.nativeProvinceName == undefined || this.employee.nativeProvinceName == null ? '' : (this.employee.nativeProvinceName + ', ')) + (this.employee.nativeCountryName == undefined || this.employee.nativeCountryName == null ? '' : (this.employee.nativeCountryName))
        },
        getProvince(){
            var listProvince = []
            ProvinceAPI.getProvince().then(
                (res) => {
                    if(res){
                        res.forEach(e => {
                            var city = {
                                CityID: e.code,
                                CityName: e.name
                            }
                            listProvince.push(city);
                        });
                    }
                }
            )
            return listProvince;
        },
        getBank(){
            var listBank = []
            BankAPI.getAllBank().then(
                (res) => {
                    if(res && res.data){
                        res.data.forEach(e => {
                            var bank = {
                                BankID: e?.id,
                                BankName: e?.code + " - " + e?.name
                            }
                            listBank.push(bank);
                        })
                    }
                } 
            )
            return listBank;
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
        getDistrict(provinceID){
            if(provinceID){
                var listDistrict = [];
                ProvinceAPI.getDistrict(provinceID).then(
                    (res) => {
                        if(res && res.districts){
                            res.districts.forEach(e => {
                                let district = {
                                    DistrictID: e?.code,
                                    DistrictName: e?.name
                                }
                                listDistrict.push(district);
                            });
                            this.lstDistrict = listDistrict
                        }
                    }
                )
            }
        },
        getWard(districID){
            if(districID){
                var listWard = [];
                ProvinceAPI.getWard(districID).then(
                    (res) => {
                        if(res && res.wards){
                            res.wards.forEach(e => {
                                let ward = {
                                    WardID: e?.code,
                                    WardName: e?.name
                                }
                                listWard.push(ward);
                            });
                            this.lstWard = listWard
                        }
                    }
                )
            }
        },
        getJobPosition(){
            if(this.employee.organizationUnitID){
                JobPositionAPI.getJobPositionByOrg(this.employee.organizationUnitID).then(
                    (res) => {
                        this.lstJobPosition = res;
                    },
                    (err) => {

                    }
                )
            }
        },
        clickEmployeeNature(e){
            if(e){
                if(e?.itemData.EmployeeNatureID == 4 || e?.itemData.EmployeeNatureID == 5){
                    this.isDisabledTerminationReason = false;
                    this.isDisabledTerminationDate = false;
                }else{
                    this.isDisabledTerminationReason = true;
                    this.isDisabledTerminationDate = true;
                }
                this.employee.employeeNatureID = e?.itemData?.EmployeeNatureID;
                this.employee.employeeNatureName = e?.itemData?.EmployeeNatureName;
            }
        },
        chooseNativeProvince(e){
            if(e){
                this.employee.nativeProvinceID = e?.itemData.CityID;
                this.employee.nativeProvinceName = e?.itemData.CityName;
            }
        },
        chooseNativeDistrict(e){
            if(e){
                this.employee.nativeDistrictID = e?.itemData.DistrictID;
                this.employee.nativeDistrictName = e?.itemData.DistrictName;
            }
        },
        chooseBank(e){
            if(e){
                this.employee.bankID = e?.itemData.BankID;
                this.employee.bankName = e?.itemData.BankName;
            }
        },
        choosePlaceIdentification(e){
            if(e){
                this.employee.placeIdentificationID = e?.itemData.CityID;
                this.employee.placeIdentificationName = e?.itemData.CityName; 
            }
        },
        chooseTypeIdentification(e){
            if(e){
                this.employee.typeIdentificationID = e?.itemData.TypeIdentificationID;
                this.employee.typeIdentificationName = e?.itemData.TypeIdentificationName
            }
        },
        chooseNativeWard(e){
            if(e){
                this.employee.nativeWardID = e?.itemData.WardID;
                this.employee.nativeWardName = e?.itemData.WardName;
            }
        },
        chooseJobPosition(e){
            if(e){
                this.isErrorJobPosition = false;
                this.employee.JobPositionID = e?.itemData?.JobPositionID;
                this.employee.JobPositionName = e?.itemData?.JobPositionName;
            }
        },
        chooseEmployeeStatus(e){
            if(e){
                this.isErrorEmployeeStatus = false;
                this.employee.employeeStatusID = e?.itemData?.EmployeeStatusID;
                this.employee.employeeStatusName = e?.itemData?.EmployeeStatusName;
            }
        },
        chooseSex(e){
            if(e){
                this.employee.sexID = e?.itemData.SexID;
                this.employee.sexName = e?.itemData.SexName;
            }
        },
        formatCurrencySalaryBase(){
            this.employee.salaryBase = formatInputCurrency(this.employee.salaryBase);
        },
        formatCurrencySalaryBasic(){
            this.employee.salaryBasic = formatInputCurrency(this.employee.salaryBasic);
        },
        formatCurrencySalaryBounty(){
            this.employee.salaryBounty = formatInputCurrency(this.employee.salaryBounty);
        },
        formatCurrencySalaryInsurance(){
            this.employee.salaryInsurance = formatInputCurrency(this.employee.salaryInsurance);
        },
        formatCurrencySalaryProbation(){
            this.employee.salaryProbation = formatInputCurrency(this.employee.salaryProbation);
        },
        formatCurrencySalaryProbationBase(){
            this.employee.salaryProbationBase = formatInputCurrency(this.employee.salaryProbationBase);
        },
        formatCurrencySalaryBountyProbation(){
            this.employee.salaryBountyProbation = formatInputCurrency(this.employee.salaryBountyProbation);
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