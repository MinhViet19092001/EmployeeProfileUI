<template>
    <PopupBase
        :title="'Tổng số nhân viên'"
        @closePopup="closePopup($event)"
    >
        <template v-slot:content-popup>
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
                <div class="grid-org">
                    <LoadingPage v-if="isLoadingData"></LoadingPage>
                    <div class="grid-data" v-if="!isLoadingData">
                        <DxDataGrid
                            id="paging-grid"
                            :data-source="dataSource"
                            key-expr="EmployeeID"
                            :allow-column-resizing="true"
                            :show-borders="true"
                            :show-row-lines="true"
                            :column-auto-width="true"
                            :column-min-width="80"
                            :hover-state-enabled="true"
                            :allow-sorting="false"
                            :onRowClick="showInfoDetail"
                            :noDataText="'Không có dữ liệu'"
                        >
                            <DxSorting mode="none" />
                            <DxPager :visible="false" />
                            <DxPaging :enabled="false" />
                            <DxColumnFixing :enabled="true"/>
                            <DxColumn
                            data-field="EmployeeCode"
                            caption="Mã nhân viên"
                            alignment="left"
                            min-width="50"
                            css-class="custom-column"
                            width="120"
                            :fixed="true"
                            />
                            <DxColumn
                            data-field="FullName"
                            caption="Họ và tên"
                            alignment="left"
                            min-width="50"
                            css-class="custom-column"
                            width="220"
                            :fixed="true"
                            />
                            <DxColumn
                            data-field="OrganizationUnitName"
                            caption="Đơn vị công tác"
                            alignment="left"
                            min-width="50"
                            css-class="custom-column"
                            width="250"
                            />
                            <DxColumn
                            data-field="JobPositionName"
                            caption="Vị trí công việc"
                            alignment="left"
                            min-width="50"
                            css-class="custom-column"
                            width="250"
                            />
                            <DxColumn
                            data-field="EmployeeNatureName"
                            caption="Tính chất lao động"
                            alignment="left"
                            min-width="50"
                            css-class="custom-column"
                            width="250"
                            />
                            <DxColumn
                            data-field="HireDate"
                            caption="Ngày thử việc"
                            alignment="left"
                            min-width="50"
                            css-class="custom-column"
                            width="250"
                            format="dd/MM/yyyy"
                            data-type="date"
                            />
                            <DxColumn
                            data-field="ReceiveDate"
                            caption="Ngày chính thức"
                            alignment="left"
                            min-width="50"
                            css-class="custom-column"
                            width="250"
                            format="dd/MM/yyyy"
                            data-type="date"
                            />
                        </DxDataGrid>
                    </div>
                    <div class="pagingation">
                        <Paging 
                            :totalRecord="totalRecord"
                            @changePageSize="changePageSize"
                            @changePageNumber="changePageNumber"
                        >
                        </Paging>
                    </div>
                </div>
            </div>
        </template>
    </PopupBase>
</template>
<script>
import PopupBase from '@/common/PopupBase.vue';
import { DxDataGrid,DxSorting,DxPager,DxPaging,DxColumn,DxLoadPanel,DxScrolling,DxColumnFixing } from 'devextreme-vue/data-grid';
import Paging from '@/common/Paging.vue';
export default {
    name: "PopupTotalEmployee",
    components:{
        PopupBase,
        DxDataGrid,
        DxSorting,
        DxPager,
        DxPaging,
        DxColumn,
        DxLoadPanel,
        DxScrolling,
        DxColumnFixing,
        Paging,
    },
    props:{
        dataSource:{
            type: Array,
        },
        totalRecord: {
            type: Number,
            default: 0
        },
        isLoadingData:{
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
        }
    },
    created(){

    },
    methods: {
        //Ẩn popup
        closePopup(e){
            this.$emit('closePopup', false);
        }
    }
}
</script>
<style scoped>
@import url('../../../assets/style/baseGrid.css');
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
.input-search input{
    width: 100%;
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
.grid-org{
    height: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>