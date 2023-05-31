<template>
    <div class="h-full w-full flex flex-column">
        <ToolbarComponent 
            :title-component="'Sửa hồ sơ'" 
            :show-icon-back="true" 
            @backPage="backPage"
            :show-btn-add="false"
            :show-title-component="false"
            :toolbar-height="'auto'"
        >
            <template v-slot:custom-title>
                <div class="wrap-content-header flex w-full">
                    <div class="profile-info-avt flex flex-column align-center">
                        <div class="header-user">
                            <div class="header-user-avatar  flex align-center justify-center"  v-bind:style="'background-color: ' + bgAvatar(employee.fullName)">
                                <div class="bold" style="color: #fff; font-size: 30px">
                                    {{ avatar(employee.fullName) }}
                                </div>
                            </div>
                        </div>
                        <div class="header-user-name"> {{ employee.fullName }}</div>
                        <div class="header-user-code"> {{ employee.employeeCode }}</div>
                    </div>
                    <div class="profile-info-content flex">
                        <div class="flex h-full flex-column" style="justify-content: space-around; margin-right: 150px">
                            <div class="flex flex-column">
                                <div style="opacity: .7;">Đơn vị công tác</div>
                                <div class="header-user-org" style="font-weight: 700;">{{ employee.organizationUnitName ?? '-'}}</div>
                            </div>
                            <div class="flex flex-column">
                                <div style="opacity: .7;">Vị trí công việc</div>
                                <div class="header-user-org" style="font-weight: 700;">{{ employee.jobPositionName ?? '-' }}</div>
                            </div>
                            <div class="flex flex-column">
                                <div style="opacity: .7;">Chức danh</div>
                                <div class="header-user-org" style="font-weight: 700;">{{ employee.jobTitleName ?? '-' }}</div>
                            </div>
                        </div>
                        <div class="flex h-full flex-column" style="justify-content: space-around; margin-right: 150px">
                            <div class="flex flex-column">
                                <div style="opacity: .7;">Ngày học việc</div>
                                <div class="header-user-org" style="font-weight: 700;">{{ formatDate(employee.probationDate) ?? '-' }}</div>
                            </div>
                            <div class="flex flex-column">
                                <div style="opacity: .7;">Ngày thử việc</div>
                                <div class="header-user-org" style="font-weight: 700;">{{ formatDate(employee.hireDate) ?? '-'}}</div>
                            </div>
                            <div class="flex flex-column">
                                <div style="opacity: .7;">Ngày chính thức</div>
                                <div class="header-user-org" style="font-weight: 700;">{{ formatDate(employee.receiveDate) ?? '-' }}</div>
                            </div>
                        </div>
                        <div class="flex h-full flex-column" style="justify-content: space-around; margin-right: 150pxnp">
                            <div class="flex flex-column">
                                <div style="opacity: .7;">ĐT di động</div>
                                <div class="header-user-org" style="font-weight: 700;">{{ formatDate(employee.phoneNUmber) ?? '-' }}</div>
                            </div>
                            <div class="flex flex-column">
                                <div style="opacity: .7;">Email</div>
                                <div class="header-user-org" style="font-weight: 700;">{{ employee.email ?? '-'}}</div>
                            </div>
                            <div class="flex flex-column"></div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:custom-btn>
                <div class="btn-edit flex" @click="showFormEdit">
                    <div class="icon-pencil"></div>
                    <div class="title-edit">Sửa</div>
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
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.employeeCode ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Họ và đệm <span style="color: red;">*</span></div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.firstName ?? '-' }}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Tên <span style="color: red;">*</span></div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.lastName ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Họ và tên <span style="color: red;">*</span></div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.fullName ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Giới tính</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.sexName ?? '-'}}</div>
                                </div>
                            </div>

                        </div>
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Ngày sinh</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ formatDate(employee.birthDay) ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Nguyên quán</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.homeTown ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Nơi sinh</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.birthPlace ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">MST cá nhân</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.taxPersonal ?? '-'}}</div>
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
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.typeIdentificationName ?? '-' }}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Số CCCD/CMND</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.numberIdentification  ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Ngày cấp (CCCD/CMND)</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ formatDate(employee.dateIdentification) ?? '-'}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Nơi cấp (CCCD/CMND)</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.placeIdentificationName ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Ngày hết hạn (CCCD/CMND)</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ formatDate(employee.endDateIdentification) ?? '-'}}</div>
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
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.organizationUnitName ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Vị trí công việc <span style="color: red;">*</span></div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.jobPositionName ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Trạng thái lao động <span style="color: red;">*</span></div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.employeeStatusName ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Tính chất lao động <span style="color: red;">*</span></div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.employeeNatureName ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Địa điểm làm việc</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.employeeWorkPlace ?? '-'}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Ngày học việc</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ formatDate(employee.probationDate) ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Ngày thử việc</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ formatDate(employee.hireDate) ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Ngày chính thức</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ formatDate(employee.receiveDate) ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Lí do nghỉ</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ formatDate(employee.employeeTerminationReason) ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Ngày nghỉ việc</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ formatDate(employee.terminationDate) ?? '-'}}</div>
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
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.salaryBase }}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Lương đóng bảo hiểm</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.salaryInsurance}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Lương thỏa thuận thử việc</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.salaryProbation }}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Ngân hàng</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.bankName ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">TK ngân hàng</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.bankAccountNo ?? '-'}}</div>
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
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.phoneNumber ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Email cá nhân</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.email ?? '-'}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Facebook</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.facebook ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Zalo</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.zalo ?? '-'}}</div>
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
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.nativeProvinceName ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Quận huyện (HKTT)</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.nativeDistrictName ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Phường/Xã (HKTT)</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.wardName ?? '-'}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Số nhà, đường phố (HKTT)</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.nativeStreetHouseNumber ?? '-'}}</div>
                                </div>
                            </div>
                            <div class="input-row flex">
                                <div class="title-input-row">Hộ khẩu thường trú</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.nativeAddress }}</div>
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
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ employee.emailUserName ?? '-'}}</div>
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
import { createAvatar, createBgAvatar } from "@/common/avatar";
import ToolbarComponent from '@/common/ToolbarComponent.vue';
import {useRoute} from "vue-router";
import EmployeeAPI from '@/api/EmployeeAPI';
export default {
    name: "EmployeeDetail",
    components:{
        ToolbarComponent,
    },
    setup(){
        const route = useRoute();
        const employeeID = route.params.id;
        return{
            employeeID
        }
    },
    created() {
        this.roleEmployee = this.$store.state?.roleEmployee?.join(', ');
        var me = this;
        //get ra data từ id
        EmployeeAPI.getById(this.employeeID).then( 
            (res) => {
                me.employee = res;
                //Check quyền xem lương
                if(!this.roleEmployee.includes("ViewSalary")){
                    me.employee.salaryBase = "0 VNĐ";
                    me.employee.salaryInsurance = "0 VNĐ";
                    me.employee.salaryProbation = "0 VNĐ";
                }
                else{
                    me.employee.salaryBase = me.employee.salaryBase ? me.employee.salaryBase + " VNĐ" : "0 VNĐ";
                    me.employee.salaryInsurance = me.employee.salaryInsurance ? me.employee.salaryInsurance + " VNĐ" : "0 VNĐ";
                    me.employee.salaryProbation = me.employee.salaryProbation ? me.employee.salaryProbation + " VNĐ" : "0 VNĐ";
                }
            },
            (error) => {

            }
        )
    },
    data() {
        return {
            employee: {},
            roleEmployee:""
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
        backPage(){
            this.$router.push("/employee");
        },
        formatDate(date){
            if(date){
                var year = new Date(date).getFullYear();
                var valueMonth = new Date(date).getMonth() + 1;
                var valueDay = new Date(date).getDay();
                var displayMonth = valueMonth < 10 ? "0" + valueMonth : valueMonth;
                var displayDay = valueDay < 10 ? "0" + valueDay : valueDay;
                return displayDay + "/" + displayMonth + "/" + year;
            }
        },
        showFormEdit(){
            if(this.roleEmployee.includes("Edit")){
                this.$router.push({ name: "employeeEdit", params: { id: this.employeeID } });
            }
            else{
                this.$emit('showToast', true, 'Bạn không có quyền thực hiện chức năng này', true);
            }
        }
    },
}
</script>
<style scoped>
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
.input-row-data{
    width: 55%;
    border-bottom: 1px solid #e0e1e4;
}
.value-show{
    padding: 6px 10px;
    font-weight: 600;
    font-size: 14px;
}
.dot-status {
    width: 8px !important;
    height: 8px !important;
    border-radius: 50% !important;
    margin-right: 16px;
}
.btn-edit{
    height: 36px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    color: #1f1f20;
    cursor: pointer;
    min-width: 80px;
    font-size: 14px;
    border: 1px solid #dadce3;
}
.btn-edit:hover{
    background-color: #eff1f6;
}
.icon-pencil{
    margin-right: 4px;
}
.form-content{
    height: 100%;
    overflow-y: scroll;
}
.title-form-group{
    font-size: 16px;
    font-weight: 700;
}
.title-input-row{
    font-size: 14px;
    color: #1f1f20!important;
    width: 200px;
    line-height: 36px;
    min-width: 140px;
}
.profile-info-avt{
    width: 240px;
}
.header-user{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 12px;
}
.header-user-avatar{
    width: 64px!important;
    height: 64px!important;
    text-align: center;
    line-height: 32px;
    border-radius: 50%;
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: #1f1f20;
}
.header-user-name{
    text-align: center;
    font-weight: 700;
    font-size: 20px;
}
.header-user-code{
    vertical-align: middle;
    text-align: center;
    font-size: 14px;
    opacity: .7;
    margin-top: 8px;
}
.profile-info-content{
    vertical-align: middle;
    font-size: 14px;
    justify-content: space-around;
}
</style>