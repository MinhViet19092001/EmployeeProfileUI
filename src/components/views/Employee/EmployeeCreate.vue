<template>
    <div class="h-full w-full flex flex-column">
        <ToolbarComponent
            :title-component="'Thêm hồ sơ'"
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
                                <div class="title-input-row">Mã nhân viên <span style="color: red;">*</span></div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" ref="employeeCode" disabled tabindex="1" :class="{'field-row-input-error': isErrorCode}" v-model="employee.EmployeeCode">
                                    <div v-if="isErrorCode" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorCode }}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Họ và đệm <span style="color: red;">*</span></div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" ref="firstName" :class="{'field-row-input-error': isErrorFirstName}" tabindex="2" v-model="employee.FirstName">
                                    <div v-if="isErrorFirstName" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorFirstName }}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Tên <span style="color: red;">*</span></div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" :class="{'field-row-input-error': isErrorName}" tabindex="3" v-model="employee.LastName">
                                    <div v-if="isErrorName" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorName }}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Họ và tên <span style="color: red;">*</span></div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" tabindex="4" disabled v-model="employee.FullName">
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Giới tính</div>
                                <div class="input-row-content" style="width: calc(55% + 32px);">
                                    <DxSelectBox
                                        tabindex="3"
                                        class="select-box-status"
                                        :data-source="lstSex"
                                        v-model="employee.SexID"
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
                                        v-model="employee.BirthDay"
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
                                    <input type="text" class="field-row-input" tabindex="4" v-model="employee.HomeTown">
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Nơi sinh</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" tabindex="4" v-model="employee.BirthPlace">
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">MST cá nhân</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" tabindex="4" v-model="employee.TaxPersonal">
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
                                        v-model="employee.TypeIdentificationID"
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
                                    <input type="text" class="field-row-input" tabindex="4" v-model="employee.NumberIdentification">
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Ngày cấp (CCCD/CMND)</div>
                                <div class="input-row-content" style="width: calc(55% + 32px);">
                                    <DxDateBox
                                        v-model="employee.DateIdentification"
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
                                        v-model="employee.PlaceIdentificationID"
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
                                        v-model="employee.EndDateIdentification"
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
                                        v-model="employee.OrganizationUnitID"
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
                                        :value="employee.JobPositionID"
                                        value-expr="JobPositionID"
                                        display-expr="JobPositionName"
                                        :placeholder="''"
                                        :noDataText="'Không có dữ liệu'"
                                        :disabled="isDisabledJobPostion"
                                        @opened="onOpenedOrgJobPosition"
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
                                        :value="employee.EmployeeStatusID"
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
                                        v-model="employee.EmployeeNatureID"
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
                                        v-model="employee.ProbationDate"
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
                                        v-model="employee.HireDate"
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
                                        v-model="employee.ReceiveDate"
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
                                    <input type="text" class="field-row-input" tabindex="4" v-model="employee.EmployeeTerminationReason" v-bind:disabled="isDisabledTerminationReason">
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Ngày nghỉ việc</div>
                                <div class="input-row-content" style="width: calc(55% + 32px);">
                                    <DxDateBox
                                        v-model="employee.TerminationDate"
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
                                    <input type="text" class="field-row-input" v-model="employee.SalaryBase" @keyup="formatCurrencySalaryBase" tabindex="7">
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Lương đóng bảo hiểm</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" v-model="employee.SalaryInsurance" @keyup="formatCurrencySalaryInsurance" tabindex="7">
                                </div>
                            </div>
                        </div>
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Lương thỏa thuận thử việc</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" v-model="employee.SalaryProbation" @keyup="formatCurrencySalaryProbation" tabindex="7">
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
                                        v-model="employee.BankID"
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
                                    <input type="text" class="field-row-input" v-model="employee.BankAccountNo" tabindex="7">
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
                                    <input type="text" class="field-row-input" v-model="employee.PhoneNumber" tabindex="7">
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Email cá nhân</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" v-model="employee.Email" tabindex="7">
                                </div>
                            </div>
                        </div>
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Facebook</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" v-model="employee.Facebook" tabindex="7">
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Zalo</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" v-model="employee.Zalo" tabindex="7">
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
                                        v-model="employee.NativeProvinceID"
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
                                        v-model="employee.NativeDistrictID"
                                        value-expr="DistrictID"
                                        display-expr="DistrictName"
                                        :placeholder="''"
                                        @opened="OnOpenDistrict(employee.NativeProvinceID)"
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
                                        v-model="employee.NativeWardID"
                                        value-expr="WardID"
                                        display-expr="WardName"
                                        :placeholder="''"
                                        @opened="OnOpenWard(employee.NativeDistrictID)"
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
                                    <input type="text" class="field-row-input" v-model="employee.NativeStreetHouseNumber" tabindex="7">
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Hộ khẩu thường trú</div>
                                <div class="input-row-content">
                                    <input type="text" class="field-row-input" v-model="employee.NativeAddress" disabled tabindex="7">
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
                                    <input type="text" class="field-row-input" v-model="employee.EmailUserName" tabindex="7">
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
import EmployeeAPI from '@/api/EmployeeAPI';
export default {
    name: 'EmployeeCreate',
    components:{
        ToolbarComponent,
        DxSelectBox,
        DxDateBox
    },
    created() {
        document.title = 'Hồ sơ | Thông tin nhân sự'
        this.employee.EmployeeCode = '';
        //Lấy ra danh sách tỉnh thành
        this.getProvince();
        //Lấy ra danh sách ngân hàng
        this.getBank();
        this.getNewEmployeeCode();
    },
    data() {
        return {
            //Đối tượng employee
            employee:{},
            //show lỗi input employeeCode
            isErrorCode: false,
            //text lỗi input employeeCode
            errorCode: 'Mã nhân viên không được để trống',
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
            lstCity: [],
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
            //Disable trường vị trí công việc
            isDisabledJobPostion: true,
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
            lstBank: [],
            lstDistrict: [],
            lstWard: [],
            isValiteDate: false
        }
    },
    watch:{
        "employee.FirstName": function(){
            this.getFullName();
        },
        "employee.LastName": function(){
            this.getFullName();
        },
        "employee.NativeStreetHouseNumber": function(){
            this.getNativeAddress();
        },
        "employee.NativeWardID": function(){
            this.getNativeAddress();
        },
        "employee.NativeDistrictID": function(){
            this.getNativeAddress();
        },
        "employee.NativeProvinceID": function(){
            this.getNativeAddress();
        },
        "employee.NativeCountryName": function(){
            this.getNativeAddress();
        }
    },
    mounted() {
        this.$refs.firstName.focus();
    },
    methods: {
        backPage(){
            this.$router.push('/employee');
        },
        getFullName: function(){
            this.employee.FullName = (this.employee.FirstName == undefined || this.employee.FirstName == null ? '' : this.employee.FirstName) + " " + (this.employee.LastName == undefined || this.employee.LastName == null ? '' : this.employee.LastName);
        },
        getNativeAddress: function(){
            this.employee.NativeAddress = (this.employee.NativeStreetHouseNumber == undefined || this.employee.NativeStreetHouseNumber == null ? '' : (this.employee.NativeStreetHouseNumber + ', ')) + (this.employee.NativeWardName == undefined || this.employee.NativeWardName == null ? '' : (this.employee.NativeWardName + ', ')) + (this.employee.NativeDistrictName == undefined || this.employee.NativeDistrictName == null ? '' : (this.employee.NativeDistrictName + ', ')) + (this.employee.NativeProvinceName == undefined || this.employee.NativeProvinceName == null ? '' : (this.employee.NativeProvinceName + ', ')) + (this.employee.NativeCountryName == undefined || this.employee.NativeCountryName == null ? '' : (this.employee.NativeCountryName))
        },
        getProvince(){
            ProvinceAPI.getProvince().then(
                (res) => {
                    if(res){
                        res.forEach(e => {
                            var city = {
                                CityID: e.code,
                                CityName: e.name
                            }
                            this.lstCity.push(city);
                        });
                    }
                }
            )
        },
        getBank(){
            BankAPI.getAllBank().then(
                (res) => {
                    if(res && res.data){
                        res.data.forEach(e => {
                            var bank = {
                                BankID: e?.id,
                                BankName: e?.code + " - " + e?.name
                            }
                            this.lstBank.push(bank);
                        })
                    }
                } 
            )
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
        chooseOrg(e){
            if(e){
                this.isDisabledJobPostion = false;
                this.employee.OrganizationUnitID = e?.itemData?.OrganizationUnitID;
                this.employee.OrganizationUnitName = e?.itemData?.OrganizationUnitName;
            }
        },
        onOpenedOrgJobPosition(){
            if(this.employee.OrganizationUnitID){
                JobPositionAPI.getJobPositionByOrg(this.employee.OrganizationUnitID).then(
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
                this.employee.EmployeeNatureID = e?.itemData?.EmployeeNatureID;
                this.employee.EmployeeNatureName = e?.itemData?.EmployeeNatureName;
            }
        },
        chooseNativeProvince(e){
            if(e){
                this.employee.NativeProvinceID = e?.itemData.CityID;
                this.employee.NativeProvinceName = e?.itemData.CityName;
            }
        },
        chooseNativeDistrict(e){
            if(e){
                this.employee.NativeDistrictID = e?.itemData.DistrictID;
                this.employee.NativeDistrictName = e?.itemData.DistrictName;
            }
        },
        chooseBank(e){
            if(e){
                this.employee.BankID = e?.itemData.BankID;
                this.employee.BankName = e?.itemData.BankName;
            }
        },
        choosePlaceIdentification(e){
            if(e){
                this.employee.PlaceIdentificationID = e?.itemData.CityID;
                this.employee.PlaceIdentificationName = e?.itemData.CityName; 
            }
        },
        chooseTypeIdentification(e){
            if(e){
                this.employee.TypeIdentificationID = e?.itemData.TypeIdentificationID;
                this.employee.TypeIdentificationName = e?.itemData.TypeIdentificationName
            }
        },
        chooseNativeWard(e){
            if(e){
                this.employee.NativeWardID = e?.itemData.WardID;
                this.employee.NativeWardName = e?.itemData.WardName;
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
                this.employee.EmployeeStatusID = e?.itemData?.EmployeeStatusID;
                this.employee.EmployeeStatusName = e?.itemData?.EmployeeStatusName;
            }
        },
        chooseSex(e){
            if(e){
                this.employee.SexID = e?.itemData.SexID;
                this.employee.SexName = e?.itemData.SexName;
            }
        },
        async OnOpenDistrict(provinceID){
            if(provinceID){
                var listDistrict = [];
                await ProvinceAPI.getDistrict(provinceID).then(
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
        async OnOpenWard(districID){
            if(districID){
                var listWard = [];
                await ProvinceAPI.getWard(districID).then(
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
        //Lưu nhân viên
        saveEmployee(){
            var me = this;
            this.validate();
            if(this.isValiteDate){
                EmployeeAPI.postEmployee(this.employee).then(
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
                ).catch(
                    () => {
                        me.$emit('showToast', true, 'Có lỗi xảy ra', true);
                    }
                )
            }
        },
        //validate dữ liệu trống
        validate(){
            if(!this.employee.EmployeeCode){
                this.isErrorCode = true;
            }
            if(!this.employee.FirstName){
                this.isErrorFirstName = true;
            }
            if(!this.employee.LastName){
                this.isErrorName = true;
            }
            if(!this.employee.OrganizationUnitID){
                this.isErrorOrg = true;
            }
            if(!this.employee.JobPositionID){
                this.isErrorJobPosition = true;
            }
            if(!this.employee.EmployeeStatusID){
                this.isErrorEmployeeStatus = true;
            }
            if(!this.employee.EmployeeNatureID){
                this.isErrorEmployeeNature = true;
            }
            if(this.isErrorCode || this.isErrorFirstName || this.isErrorName || this.isErrorOrg || this.isErrorJobPosition || this.isErrorEmployeeStatus || this.isErrorEmployeeNature){
                this.isValiteDate = false;
                this.$emit('showToast', true, 'Dữ liệu đầu vào chưa hợp lệ.Vui lòng kiểm tra lại', true);
            }else{
                this.isValiteDate = true;
            }
        },
        formatCurrencySalaryBase(){
            this.employee.SalaryBase = formatInputCurrency(this.employee.SalaryBase);
        },
        formatCurrencySalaryBasic(){
            this.employee.SalaryBasic = formatInputCurrency(this.employee.SalaryBasic);
        },
        formatCurrencySalaryBounty(){
            this.employee.SalaryBounty = formatInputCurrency(this.employee.SalaryBounty);
        },
        formatCurrencySalaryInsurance(){
            this.employee.SalaryInsurance = formatInputCurrency(this.employee.SalaryInsurance);
        },
        formatCurrencySalaryProbation(){
            this.employee.SalaryProbation = formatInputCurrency(this.employee.SalaryProbation);
        },
        formatCurrencySalaryProbationBase(){
            this.employee.SalaryProbationBase = formatInputCurrency(this.employee.SalaryProbationBase);
        },
        formatCurrencySalaryBountyProbation(){
            this.employee.SalaryBountyProbation = formatInputCurrency(this.employee.salaryBountyProbation);
        },
        async getNewEmployeeCode(){
            await EmployeeAPI.getNewCode().then(
                (res) => {
                    this.employee.EmployeeCode = res;
                }
            )
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