<template>
    <div class="w-full">
        <div class="content-overview flex">
            <div class="flex overview-item">
                <div class="overview-item-content flex">
                    <div class="title-overview-content flex">
                        <div class="title-overview">Tổng số nhân viên</div>
                    </div>
                    <div class="flex align-center">
                        <div class="icon-human"></div>
                        <div class="total-employee total-emp" @click="showTotalEmployee()">{{ handleTotalEmployee() }}</div>
                    </div>
                </div>
            </div>
            <div class="flex overview-item">
                <div class="overview-item-content flex">
                    <div class="title-overview-content flex">
                        <div class="title-overview">Nhân viên mới</div>
                    </div>
                    <div class="flex align-center flex" style="padding: 8px;">
                            <div class="currentMonth total-emp">{{ totalNewEmployeeCurrentMonth }}</div>
                            <div class="flex align-center">
                                <div v-if="ratioNewEmployee > 0 && totalNewEmployeeCurrentMonth > totalNewEmployeeLastMonth" class="icon-ratio-up"></div>
                                <div v-if="ratioNewEmployee > 0 && totalNewEmployeeCurrentMonth < totalNewEmployeeLastMonth" class="icon-ratio-down"></div>
                                <div class="val-ratio" v-bind:style="{'color':  (totalNewEmployeeCurrentMonth - totalNewEmployeeLastMonth > 0) ? '#21c74e' : ((totalNewEmployeeCurrentMonth - totalNewEmployeeLastMonth < 0) ? '#FF8D8D' : '#6C757D')}">{{ ratioNewEmployee > 0 ? ratioNewEmployee : '0.0'}}%</div>
                            </div>
                    </div>
                    <div class="flex align-center last-month">
                        <div>Tháng trước: {{ totalNewEmployeeLastMonth }}</div>
                    </div>
                </div>
            </div>
            <div class="flex overview-item">
                <div class="overview-item-content flex">
                    <div class="title-overview-content flex">
                        <div class="title-overview">Thử việc thành công</div>
                    </div>
                    <div class="flex align-center flex" style="padding: 8px;">
                            <div class="currentMonth total-emp">{{ totalEmployeeStaffSuccessCurrentMonth }}</div>
                            <div class="flex align-center">
                                <div v-if="ratioEmployeeStaff > 0 && totalEmployeeStaffSuccessCurrentMonth > totalEmployeeStaffSuccessLastMonth" class="icon-ratio-up"></div>
                                <div v-if="ratioEmployeeStaff > 0 && totalEmployeeStaffSuccessCurrentMonth < totalEmployeeStaffSuccessLastMonth" class="icon-ratio-down"></div>
                                <div class="val-ratio" v-bind:style="{'color':  (totalEmployeeStaffSuccessCurrentMonth - totalEmployeeStaffSuccessLastMonth > 0) ? '#21c74e' : ((totalEmployeeStaffSuccessCurrentMonth - totalEmployeeStaffSuccessLastMonth < 0) ? '#FF8D8D' : '#6C757D')}">{{ ratioEmployeeStaff > 0 ? ratioEmployeeStaff : '0.0' }}%</div>
                            </div>
                    </div>
                    <div class="flex align-center last-month">
                        <div>Tháng trước: {{ totalEmployeeStaffSuccessLastMonth }}</div>
                    </div>
                </div>
            </div>
            <div class="flex overview-item">
                <div class="overview-item-content flex">
                    <div class="title-overview-content flex">
                        <div class="title-overview">Nghỉ việc</div>
                    </div>
                    <div class="flex align-center flex" style="padding: 8px;">
                            <div class="currentMonth total-emp">{{ totalEmployeeTerminationCurrentMonth }}</div>
                            <div class="flex align-center">
                                <div v-if="ratioEmployeeTermination > 0 && totalEmployeeTerminationCurrentMonth > totalEmployeeTerminationLastMonth" class="icon-ratio-up"></div>
                                <div v-if="ratioEmployeeTermination > 0 && totalEmployeeTerminationCurrentMonth < totalEmployeeTerminationLastMonth" class="icon-ratio-down"></div>
                                <div class="val-ratio" v-bind:style="{'color':  (totalEmployeeTerminationCurrentMonth - totalEmployeeTerminationLastMonth > 0) ? '#21c74e' : ((totalEmployeeTerminationCurrentMonth - totalEmployeeTerminationLastMonth < 0) ? '#FF8D8D' : '#6C757D')}">{{ ratioEmployeeTermination > 0 ? ratioEmployeeTermination : '0.0' }}%</div>
                            </div>
                    </div>
                    <div class="flex align-center last-month">
                        <div>Tháng trước: {{ totalEmployeeTerminationLastMonth }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-overview-chart flex">
            <DxChart
                id="chart"
                :data-source="populationData"
                title="Số lượng nhân sự theo quý trong năm"
            >
                <DxArgumentAxis :tick-interval="10">
                <DxLabel format="decimal"/>
                </DxArgumentAxis>
                <DxSeries type="bar"/>
                <DxLegend :visible="false"/>
            </DxChart>
        </div>
    </div>

    <PopupTotalEmployeeVue 
        v-if="isShowPopupTotalEmployee"
        @closePopup="isShowPopupTotalEmployee = $event"
        :dataSource="dataSourceTotalEmployee"
        :totalRecord="totalEmployee"
        :isLoadingData="isLoadingDataTotalEmployee"
    >
    </PopupTotalEmployeeVue>
</template>
<script>
import {
  DxChart,
  DxArgumentAxis,
  DxLegend,
  DxLabel,
  DxSeries,
} from 'devextreme-vue/chart';
import PopupTotalEmployeeVue from './PopupTotalEmployee.vue';
import EmployeeAPI from '@/api/EmployeeAPI';
export default {
    name: "ContentOverview",
    components:{
        PopupTotalEmployeeVue,
        DxChart,
        DxArgumentAxis,
        DxLegend,
        DxLabel,
        DxSeries,
    },
    data() {
        return {
            //Tổng số nhân viên đang làm việc
            totalEmployee: 1000,
            //Tổng số nhân viên mới tháng này
            totalNewEmployeeCurrentMonth: 5,
            //Tổng số nhân viên mới tháng trước
            totalNewEmployeeLastMonth: 3,
            //Tỷ lệ nhân viên mới 
            ratioNewEmployee: 0.0,
            //Nhân viên thử việc thành công tháng này
            totalEmployeeStaffSuccessCurrentMonth: 0,
            //Nhân viên thử việc thành công tháng trước
            totalEmployeeStaffSuccessLastMonth: 0,
            //Tỷ lệ nhân viên thử việc thành công
            ratioEmployeeStaff: 0.0,
            //Nhân viên nghỉ việc tháng này
            totalEmployeeTerminationCurrentMonth: 0,
            //Nhân viên nghỉ việc tháng trước
            totalEmployeeTerminationLastMonth: 1,
            //Tỉ lệ nhân viên nghỉ việc
            ratioEmployeeTermination: 0.0,
            //Biến showPopup show tổng số nhân viên
            isShowPopupTotalEmployee: false,
            //Biến showPopup show tổng số nhân viên mới
            isShowPopupTotalNewEmployee: false,
            //Biến showPopup show tổng số nhân viên thử việc thành công
            isShowPopupTotalEmployeeStaff: false,
            //Biến showPopup show tổng số nhân viên nghỉ việc tháng này
            isShowPopupTotalEmployeeTermination: false,
            dataSourceTotalEmployee: [],
            paramPaging: {
                pageNumber: 1,
                pageSize: 50,
                searchValue: "",
                organizationUnitID: 0,
                filterStatus: 0,
            },
            isLoadingDataTotalEmployee: true,
            populationData: [
                {
                    arg: 'Quý I',
                    val:  300,
                },
                {
                    arg: 'Quý II',
                    val:  400,
                },
                {
                    arg: 'Quý III',
                    val:  500,
                },
                {
                    arg: 'Quý IV',
                    val:  350,
                }
            ]
        }
    }, 
    created() {
        this.getDataTotalEmployee();
        this.handleRatioNewEmployee();
        this.handleRatioEmployeeStaff();
        this.handleRatioEmployeeTermination();
    },
    watch:{
    },
    computed:{
    },
    methods: {
        async getDataTotalEmployee(){
            var me = this;
            this.isLoadingDataTotalEmployee = true;
            //Lấy ra dataSource
            await EmployeeAPI.getDataPaging(this.paramPaging).then(
                (res) => {
                    if(res){
                        this.dataSourceTotalEmployee = res?.data;
                        this.totalEmployee = res?.total;
                        setTimeout(() => {
                            this.isLoadingDataTotalEmployee = false;
                        }, 200);
                    }
                },
                (err) => {
                    me.$emit('showToast', true, 'Có lỗi xảy ra', true);
                }
            );
        },
        //xử lý hiển thị tổng số nhân viên đang làm việc
        handleTotalEmployee(){
            return this.totalEmployee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        },
        //Xử lý hiển thị tổng số nhan viên mới
        handleRatioNewEmployee(){
            if(this.totalNewEmployeeLastMonth > 0){
                this.ratioNewEmployee = (Math.abs(1 - (this.totalNewEmployeeCurrentMonth / this.totalNewEmployeeLastMonth)) * 100).toFixed(2);
            }
            else{
                this.ratioNewEmployee = 0.0;
            }
        },
        //Xử lý hiển thị tổng số nhan viên mới
        handleRatioEmployeeStaff(){
            if(this.totalEmployeeStaffSuccessLastMonth > 0){
                this.ratioEmployeeStaff = (Math.abs(1 - (this.totalEmployeeStaffSuccessCurrentMonth / this.totalEmployeeStaffSuccessLastMonth)) * 100).toFixed(2);
            }
            else{
                this.ratioEmployeeStaff = 0.0;
            }
        },
        //Xử lý hiển thị tổng số nhan viên mới
        handleRatioEmployeeTermination(){
            if(this.totalEmployeeTerminationLastMonth > 0){
                this.ratioEmployeeTermination = (Math.abs( 1 - (this.totalEmployeeTerminationCurrentMonth / this.totalEmployeeTerminationLastMonth)) * 100).toFixed(2);
            }
            else{
                this.ratioEmployeeTermination = 0.0;
            }
        },
        //Hiển thị popup tổng số nhân viên
        showTotalEmployee(){
            this.isShowPopupTotalEmployee = true;
        }
    },
}
</script>
<style scoped>
.content-overview{
    height: 200px;
    /* /* padding: 0 16px; */
    max-width: 100%;
    width: 100%;
}
.content-overview .overview-item{
    padding: 0 8px;
    width: 25%;
}
.overview-item-content{
    width: 100%;
    margin-bottom: 16px;
    padding: 16px 16px 6px 16px;
    border-radius: 4px;
    background-color: #fff;
    min-height: 140px;
    flex-direction: column;
}
.title-overview-content{
    height: 40px;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    margin-bottom: 10px;
}
.title-overview{
    font-weight: 700;
}
.total-employee{
    font-size: 36px;
    font-weight: 600;
    margin-left: 20px;
}
.currentMonth{
    font-size: 36px;
    font-weight: 600;
    margin-left: 20px;
    margin: 0 16px 0 0;
}
.icon-ratio-up,.icon-ratio-down{
    margin: 0 8px 0 0;
}
.last-month{
    color: #65696e;
    font-size: 14px;
}
.total-emp:hover{
    cursor: pointer;
    color: #2566e9;
    text-decoration: underline;
}
.content-overview-chart{
    height: 600px;
    background-color: #fff;
    margin: 0px 8px;
}
#chart{
    width: 100%;
}
</style>
<style>
g.dxc-title text{  
  font-size: 24px !important;
  font-weight: 600 !important;
} 
</style>