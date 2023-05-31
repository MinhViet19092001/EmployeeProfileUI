<template>
    <div class="flex flex-column h-full w-full">
        <div class="grid-toolbar flex">
            <div class="grid-toolbar-content flex align-center">
                <div class="grid-toolbar-left">
                    <div class="input-search flex">
                        <div class="icon-search"></div>
                        <input type="text" class="inputSearch" name="inputSearch" maxlength="255" id="" placeholder="Tìm kiếm">
                    </div>
                </div>
                <div class="grid-toolbar-right flex">
                    <div class="btn-export btn-icon flex align-center">
                        <div class="icon-btn-export"></div>
                        <div class="text-btn-export">Xuất khẩu</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-paging flex">
             <DxDataGrid
                id="gridContainer"
                :data-source="dataSource"
            >
                <template v-for="col in columns" :key="col">
                    <DxColumn
                        :visible="col.IsVisible"
                        :width="250"
                        :caption="col.Caption"
                        :data-field="col.FieldName"
                        :alignment="handleAlignment(col.DataType)"
                        :hover-state-enabled="true"
                    />
                </template>
            </DxDataGrid>
        </div>
        <div class="footer-paging"></div>
    </div>
</template>
<script>
import  { dataType }  from '../enum/enum'
import {DxDataGrid, DxColumn, DxSorting, DxPager, DxPaging} from 'devextreme-vue/data-grid';
export default {
    name:"GridBase",
    components:{
        DxDataGrid,
        DxColumn,
        DxSorting,
        DxPager,
        DxPaging
    },
    props:{
    },
    data(){
        return {
            noDataText: 'Không có dữ liệu',
            dataSource:  [
                {
                    EmployeeID: 1,
                    EmployeeCode: "MV001",
                    FullName: "Dương Minh Việt",
                    OrganizaitonUnitName: "Tổng công ty",
                    JobPositionName: "Lập trình viên",
                    EmployeeNatureName: "Chính thức",
                    HireDate: "19/09/2001",
                    ReceiveDate: "19/09/2001",
                    Status: "Đang hoạt động"
                },
                {
                    EmployeeID: 1,
                    EmployeeCode: "MV001",
                    FullName: "Dương Minh Việt",
                    OrganizaitonUnitName: "Tổng công ty",
                    JobPositionName: "Lập trình viên",
                    EmployeeNatureName: "Chính thức",
                    HireDate: "19/09/2001",
                    ReceiveDate: "19/09/2001",
                    Status: "Đang hoạt động"
                },
                {
                    EmployeeID: 1,
                    EmployeeCode: "MV001",
                    FullName: "Dương Minh Việt",
                    OrganizaitonUnitName: "Tổng công ty",
                    JobPositionName: "Lập trình viên",
                    EmployeeNatureName: "Chính thức",
                    HireDate: "19/09/2001",
                    ReceiveDate: "19/09/2001",
                    Status: "Đang hoạt động"
                },
                {
                    EmployeeID: 1,
                    EmployeeCode: "MV001",
                    FullName: "Dương Minh Việt",
                    OrganizaitonUnitName: "Tổng công ty",
                    JobPositionName: "Lập trình viên",
                    EmployeeNatureName: "Chính thức",
                    HireDate: "19/09/2001",
                    ReceiveDate: "19/09/2001",
                    Status: "Đang hoạt động"
                },
                {
                    EmployeeID: 1,
                    EmployeeCode: "MV001",
                    FullName: "Dương Minh Việt",
                    OrganizaitonUnitName: "Tổng công ty",
                    JobPositionName: "Lập trình viên",
                    EmployeeNatureName: "Chính thức",
                    HireDate: "19/09/2001",
                    ReceiveDate: "19/09/2001",
                    Status: "Đang hoạt động"
                },
                {
                    EmployeeID: 1,
                    EmployeeCode: "MV001",
                    FullName: "Dương Minh Việt",
                    OrganizaitonUnitName: "Tổng công ty",
                    JobPositionName: "Lập trình viên",
                    EmployeeNatureName: "Chính thức",
                    HireDate: "19/09/2001",
                    ReceiveDate: "19/09/2001",
                    Status: "Đang hoạt động"
                },
                {
                    EmployeeID: 1,
                    EmployeeCode: "MV001",
                    FullName: "Dương Minh Việt",
                    OrganizaitonUnitName: "Tổng công ty",
                    JobPositionName: "Lập trình viên",
                    EmployeeNatureName: "Chính thức",
                    HireDate: "19/09/2001",
                    ReceiveDate: "19/09/2001",
                    Status: "Đang hoạt động"
                },
                {
                    EmployeeID: 1,
                    EmployeeCode: "MV001",
                    FullName: "Dương Minh Việt",
                    OrganizaitonUnitName: "Tổng công ty",
                    JobPositionName: "Lập trình viên",
                    EmployeeNatureName: "Chính thức",
                    HireDate: "19/09/2001",
                    ReceiveDate: "19/09/2001",
                    Status: "Đang hoạt động"
                },
                {
                    EmployeeID: 1,
                    EmployeeCode: "MV001",
                    FullName: "Dương Minh Việt",
                    OrganizaitonUnitName: "Tổng công ty",
                    JobPositionName: "Lập trình viên",
                    EmployeeNatureName: "Chính thức",
                    HireDate: "19/09/2001",
                    ReceiveDate: "19/09/2001",
                    Status: "Đang hoạt động"
                },
                {
                    EmployeeID: 1,
                    EmployeeCode: "MV001",
                    FullName: "Dương Minh Việt",
                    OrganizaitonUnitName: "Tổng công ty",
                    JobPositionName: "Lập trình viên",
                    EmployeeNatureName: "Chính thức",
                    HireDate: "19/09/2001",
                    ReceiveDate: "19/09/2001",
                    Status: "Đang hoạt động"
                },
                {
                    EmployeeID: 1,
                    EmployeeCode: "MV001",
                    FullName: "Dương Minh Việt",
                    OrganizaitonUnitName: "Tổng công ty",
                    JobPositionName: "Lập trình viên",
                    EmployeeNatureName: "Chính thức",
                    HireDate: "19/09/2001",
                    ReceiveDate: "19/09/2001",
                    Status: "Đang hoạt động"
                },
                {
                    EmployeeID: 1,
                    EmployeeCode: "MV001",
                    FullName: "Dương Minh Việt",
                    OrganizaitonUnitName: "Tổng công ty",
                    JobPositionName: "Lập trình viên",
                    EmployeeNatureName: "Chính thức",
                    HireDate: "19/09/2001",
                    ReceiveDate: "19/09/2001",
                    Status: "Đang hoạt động"
                },
                {
                    EmployeeID: 1,
                    EmployeeCode: "MV001",
                    FullName: "Dương Minh Việt",
                    OrganizaitonUnitName: "Tổng công ty",
                    JobPositionName: "Lập trình viên",
                    EmployeeNatureName: "Chính thức",
                    HireDate: "19/09/2001",
                    ReceiveDate: "19/09/2001",
                    Status: "Đang hoạt động"
                }
            ],
            columns: [
                {
                    FieldName: 'EmployeeCode',
                    Caption: 'Mã nhân viên',
                    DataType: 0,
                    IsVisible: true
                },
                {
                    FieldName: 'FullName',
                    Caption: 'Họ và tên',
                    DataType: 0,
                    IsVisible: true
                },
                {
                    FieldName: 'OrganizaitonUnitName',
                    Caption: 'Đơn vị công tác',
                    DataType: 0,
                    IsVisible: true
                },
                {
                    FieldName: 'JobPositionName',
                    Caption: 'Vị trị công việc',
                    DataType: 0,
                    IsVisible: true
                },
                {
                    FieldName: 'EmployeeNatureName',
                    Caption: 'Tính chất công việc',
                    DataType: 0,
                    IsVisible: true
                },
                {
                    FieldName: 'HireDate',
                    Caption: 'Ngày thử việc',
                    DataType: 3,
                    IsVisible: true
                },
                {
                    FieldName: 'ReceiveDate',
                    Caption: 'Ngày chính thức',
                    DataType: 3,
                    IsVisible: true
                },
                {
                    FieldName: 'Status',
                    Caption: 'Trạng thái',
                    DataType: 0,
                    IsVisible: true
                }
            ]
        }
    },
    created(){
    },
    methods:{
        console(val)
        {
            console.log(val);
        },
        //Handel vị trí của text
        handleAlignment(type) {
            switch(type){
                case dataType.number:
                case dataType.currency:
                    return 'right';
                case dataType.date:
                    return 'center';
                default:
                    return 'left';
            }
        }
    }
}
</script>
<style scoped>
.grid-toolbar{
    border-bottom: 1px solid #e0e1e4;
    justify-content: space-between;
    width: 100%;
    height: 61px;
    background: #fff;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
}
.grid-toolbar-content{
    width:100%;
    padding: 12px 16px;
    justify-content: space-between;
}
.input-search{
    height: 34px;
    width: 240px;
    border: 1px solid #e0e1e4!important;
    border-radius: 4px;
}
.input-search:hover{
    border-color: #1c80f2!important;
}
.input-search:focus-within{
    border-color: #1c80f2!important;
}
.inputSearch{
    padding-left: 20px!important;
}
.btn-export{
    cursor: pointer;
    padding: 0px 16px 0px 8px;
}
.btn-export:hover{
    background-color: #eff1f6;
}
.btn-export:active{
    background-color: #e8eaef;
}
.text-btn-export{
    font-size: 14px;
    font-weight: 600;
}
.icon-btn-export{
    margin-right: 4px;
}
.content-paging{
    height: calc(100% - 62px);
}
#gridContainer{
    width: 100%;
    height: 100%;
}
</style>
<style>
@import url("../assets/style/baseGrid.css");
</style>