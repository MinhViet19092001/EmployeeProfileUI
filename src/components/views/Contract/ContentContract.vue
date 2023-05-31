<template>
    <div class="content-organization-unit">
        <div class="container-org w-full h-full">
            <ToolbarGridBase 
                :widthInputSeach="320" 
                :placeHolderInputSearch="'Tìm kiếm'"
                @onSearch="onSearch"
            >
                <template #customfilter>
                    <DxSelectBox
                        tabindex="3"
                        :width="300"
                        class="select-box-status"
                        :search-enabled="true"
                        :search-mode="'contains'"
                        :search-expr="'OrganizationUnitName'"
                        :data-source="lstOrg"
                        :show-clear-button="true"
                        value-expr="OrganizationUnitID"
                        display-expr="OrganizationUnitName"
                        :placeholder="'Tất cả đơn vị'"
                        :noDataText="'Không có dữ liệu'"
                        @value-changed="valueChangeOrg($event)"
                    >
                    </DxSelectBox>
                </template>
            </ToolbarGridBase>
            <div class="grid-org">
                <LoadingPage v-if="isLoadingData"></LoadingPage>
                <div class="grid-data" v-if="!isLoadingData">
                    <DxDataGrid
                        id="paging-grid"
                        :data-source="dataSource"
                        key-expr="ContractID"
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
                          data-field="SignedDate"
                          caption="Ngày ký"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column"
                          width="120"
                          format="dd/MM/yyyy"
                          data-type="date"
                          :fixed="true"
                        />
                        <DxColumn
                          data-field="ContractNo"
                          caption="Số hợp đồng"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column"
                          width="200"
                          :fixed="true"
                        />
                        <DxColumn
                          data-field="FullName"
                          caption="Họ và tên NLĐ"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column"
                          width="200"
                          :fixed="true"
                          cell-template="cellTemplateName"
                        />
                        <template #cellTemplateName="{ data }">
                            <div>
                                <div class="flex align-center">
                                <div
                                    class="user-avatar flex align-center justify-center"
                                    style="margin-right: 8px;"
                                    v-bind:style="
                                    'background-color:' + bgAvatar(data.data.FullName)
                                    "
                                >
                                    <span
                                    style="
                                        color: #fff;
                                        font-size: 16px !important;
                                        font-weight: 700;
                                    "
                                    >
                                    {{ avatar(data.data.FullName) }}
                                    </span>
                                </div>
                                <div>{{ data.data.FullName }}</div>
                                </div>
                            </div>
                        </template>
                        <DxColumn
                          data-field="JobPositionName"
                          caption="Vị trí công việc"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column"
                          width="250"
                        />
                        <DxColumn
                          data-field="OrganizationUnitName"
                          caption="Đơn vị ký hợp đồng"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column"
                          width="250"
                        />
                        <DxColumn
                          data-field="ContractTypeName"
                          caption="Loại hợp đồng"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column"
                          width="200"
                        />
                        <DxColumn
                          data-field="ContractPeriodName"
                          caption="Thời hạn hợp đồng"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column"
                          width="200"
                        />
                        <DxColumn
                          data-field="StartDate"
                          caption="Ngày có hiệu lực"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column"
                          width="120"
                          format="dd/MM/yyyy"
                          data-type="date"
                        />
                        <DxColumn
                          data-field="EndDate"
                          caption="Ngày hết hạn"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column"
                          width="120"
                          format="dd/MM/yyyy"
                          data-type="date"
                        />
                        <DxColumn
                          data-field="SalaryBase"
                          caption="Lương thỏa thuận chính thức"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column custom-col-currency"
                          width="250"
                        />
                        <DxColumn
                          data-field="SalaryProbation"
                          caption="Lương thỏa thuận thử việc"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column custom-col-currency"
                          width="250"
                        />
                        <DxColumn
                          data-field="SalaryInsurance"
                          caption="Lương đóng bảo hiểm"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column custom-col-currency"
                          width="250"
                        />
                        <DxColumn
                            :visible="true"
                            css-class="column-function"
                            min-width="50"
                            cell-template="cellTemplateFunction"
                            text-align="left"
                            :fixed="true"
                            fixedPosition="right"
                            width="80"
                        />
                        <DxColumn
                          data-field="ContractStatusSignName"
                          caption="Trạng thái ký"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column"
                          width="200"
                        />
                        <DxColumn
                          data-field="ContractStatusName"
                          caption="Trạng thái ký"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column"
                          width="200"
                          cell-template="custom-column-status"
                        />
                        <DxScrolling
                            column-rendering-mode="virtual"
                            :use-native="false"
                            show-scrollbar="always"
                        />
                        <template #custom-column-status="{ data }">
                            <div
                            v-bind:style="
                                'color: ' + status(data.data.ContractStatusID)
                            "
                            >
                            {{ data.data.ContractStatusName }}

                            </div>
                        </template>
                        <template #cellTemplateFunction="{ data }">
                            <div
                                class="flex"
                                style="
                                margin-left: 8px !important;
                                height: 100%;
                                justify-content: flex-end !important;
                                "
                            >
                                <div class="style-button">
                                    <div
                                        title="Sửa"
                                        class="button-command-wrap btn-more"
                                    >
                                        <div class="icon-pencil" @click.stop="editItem(data.data.JobPositionID)"></div>
                                    </div>
                                </div>
                                <div class="style-button" v-if="data?.data?.EmailUserName ? false : true">
                                    <div
                                        title="Xoá"
                                        class="button-command-wrap btn-more"
                                    >
                                        <div class="icon-delete" @click.stop="deleteItem(data.data)"></div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <DxLoadPanel
                            message="Đang tải dữ liệu"
                            :position="position"
                            v-model:visible="isLoadingData"
                            :show-indicator="showIndicator"
                            :show-pane="showPane"
                            :shading="shading"
                            :hide-on-outside-click="hideOnOutsideClick"
                            shading-color="rgba(0,0,0,0.4)"
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
        <PopupNoticeBase 
               v-if="isShowPopupNoticeDelete" 
               :title="'Thông báo'" 
               @closePopup="isShowPopupNoticeDelete=false"
               :content-notice="contentNoticeDelete"
           >
               <template v-slot:custom-btn-footer>
                   <div class="btn-delete" @click="deleteContract">
                       <div class="title-delete">Xóa</div>
                   </div>
               </template>
           </PopupNoticeBase>
    </div>  
</template>
<script>
import LoadingPage from '@/common/LoadingPage.vue';
import PopupNoticeBase from '@/common/PopupNoticeBase.vue';
import 'devextreme/dist/css/dx.light.css';
import DxSelectBox from 'devextreme-vue/select-box';
import ToolbarGridBase from '@/common/ToolbarGridBase.vue';
import { DxDataGrid,DxSorting,DxPager,DxPaging,DxColumn,DxLoadPanel,DxScrolling,DxColumnFixing } from 'devextreme-vue/data-grid';
import Paging from '@/common/Paging.vue'
import ArrayStore from 'devextreme/data/array_store';
import OrganizationUnitAPI from '@/api/OrganizationUnitAPI';
import ContractAPI from '@/api/ContractAPI';
import { createAvatar, createBgAvatar } from "@/common/avatar.js";
export default {
    name: "ContentContract",
    components:{
        LoadingPage,
        PopupNoticeBase,
        DxSelectBox,
        ToolbarGridBase,
        DxDataGrid,
        DxSorting,
        DxPager,
        DxPaging,
        DxColumn,
        DxLoadPanel,
        DxScrolling,
        DxColumnFixing,
        Paging
    },
    props: {
        filter: {
            type: Number,
            default: 0
        },
        roleContract: {
            type: String,
            default: ""
        }
    },
    watch:{
        filter(){
            this.paramPaging.filterStatus = this.filter;
            this.getDataSource();
        }
    },
    data() {
        return {
            isLoadingData: true,
            lstOrg: new ArrayStore({
                data: this.getAllOrg(),
                key: 'OrganizationUnitID',
                paginate: true,
            }),
            dataSource:[],
            totalRecord: 0,
            paramPaging: {
                pageNumber: 1,
                pageSize: 50,
                searchValue: "",
                organizationUnitID: 0,
                filterStatus: 0,
            },
            isShowPopupNoticeDelete: false,
            contentNoticeDelete: '',
            contractDeleteID:0,
        }
    },
    created() {
        this.getDataSource();
    },
    methods: {
        onSearch(e){
            this.paramPaging.searchValue = e;
            this.getDataSource();
        },
        status(statusID){
            if(statusID == "1") return '#17a562';
            else return '#e61d1d'
        },
        //Tạo tên avatar
        avatar(name) {
            return createAvatar(name);
        },
        //Tạo màu cho background avatar
        bgAvatar(name) {
            return createBgAvatar(this.avatar(name));
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
        //get dataSource
        async getDataSource(){
            var me = this;
            this.isLoadingData = true;
            //Lấy ra dataSource
            await ContractAPI.getDataPaging(this.paramPaging).then(
                (res) => {
                    if(res){
                        this.dataSource = res?.data;
                        this.totalRecord = res?.total;
                        this.dataSource.forEach(data => {
                            if(!this.roleContract.includes("ViewSalary")){
                                data.SalaryBase = "0 VNĐ";
                                data.SalaryInsurance = "0 VNĐ";
                                data.SalaryProbation = "0 VNĐ";
                            }
                            else{
                                data.SalaryBase = data.SalaryBase ? data.SalaryBase + " VNĐ" : "0 VNĐ";
                                data.SalaryInsurance = data.SalaryInsurance ? data.SalaryInsurance + " VNĐ" : "0 VNĐ";
                                data.SalaryProbation = data.SalaryProbation ? data.SalaryProbation + " VNĐ" : "0 VNĐ";
                            }
                        })
                    }
                    setTimeout(() => {
                        this.isLoadingData = false;
                    }, 200);
                },
                (err) => {
                    setTimeout(() => {
                        this.isLoadingData = false;
                    }, 200);
                    me.$emit('showToast', true, 'Có lỗi xảy ra', true);
                }
            );
        },
        changePageSize(e){
            this.paramPaging.pageNumber = 1;
            this.paramPaging.pageSize = e;
            this.getDataSource();
        },
        changePageNumber(e){
            this.paramPaging.pageNumber = e;
            this.getDataSource();
        },
        valueChangeOrg(e){
            if(e?.value){
                this.paramPaging.organizationUnitID = e?.value;
                this.getDataSource();
            }
            else{
                this.paramPaging.organizationUnitID = 0;
                this.getDataSource();
            }
        },
        editItem(contract){
            if(this.roleContract.includes("Edit")){
            }
            else{
                this.$emit('showToast', true, 'Bạn không có quyền thực hiện chức năng này', true);
            }
        },
        deleteItem(contract){
            if(this.roleContract.includes("Delete")){
                this.contractDeleteID = contract?.ContractID;
                this.isShowPopupNoticeDelete = true;
                this.contentNoticeDelete = `Bạn có muốn xóa hợp đồng <b>${contract.ContractNo}</b> không?`;
            }
            else{
                this.$emit('showToast', true, 'Bạn không có quyền thực hiện chức năng này', true);
            }
        },
        deleteEmployee(){
            if(this.contractDeleteID > 0){
                ContractAPI.deleteContract(this.contractDeleteID).then(
                    (res) => {
                        this.$emit('showToast',true, 'Xóa hợp đồng thành công', false);
                        this.isShowPopupNoticeDelete = false;
                        this.getDataSource();
                    },
                    (error) => {
                        this.$emit('showToast',true, 'Có lỗi xảy ra', true);
                        this.isShowPopupNoticeDelete = false;
                    }
                )

            }
        },
        showInfoDetail(e){
            this.$router.push({ name: "contractDetail", params: { id: e?.data?.ContractID } });
        }
    },
}
</script>
<style scoped>
@import url('../../../assets/style/baseGrid.css');
.content-organization-unit{
    height: calc(100% - 68px);
    padding: 0 24px;
}
.container-org{
    background-color: #fff;
}
.dx-texteditor.dx-editor-outlined {
    background: #fff;
    border: 1px solid #e0e1e4;
    border-radius: 4px;
    cursor: pointer;
}
.dx-state-hover.dx-texteditor.dx-editor-outlined{
    border-color: #108cf2;
}
.grid-org{
    height: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.grid-data{
    height: calc(100% - 60px);
}
#paging-grid{
    height: 100%;
}

.btn-delete{
    height: 36px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e61d1d;
    color: #fff;
    cursor: pointer;
    min-width: 80px;
}
.btn-delete:hover{
    background-color: #d81010;
    color: #fff;
}
.title-delete{
    font-size: 14px;
}
</style>
<style>
.dx-texteditor-input {
    text-overflow: ellipsis;
    min-height: 34px;
    padding-left: 16px;
    padding-right: 16px!important;
    font-size: 14px;
}
</style>