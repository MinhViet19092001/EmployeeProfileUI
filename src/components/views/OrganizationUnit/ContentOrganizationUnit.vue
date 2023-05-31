<template>
    <div class="content-organization-unit">
        <div class="container-org w-full h-full">
            <ToolbarGridBase 
                :widthInputSeach="320" 
                :placeHolderInputSearch="'Tìm kiếm đơn vị, cơ cấu tổ chức'"
                @onSearch="onSearch"
            >
                <template #customfilter>
                    <DxSelectBox
                        class="select-box-status"
                        :data-source="lstStatus"
                        :value="lstStatus[0].StatusID"
                        value-expr="StatusID"
                        display-expr="StatusName"
                        placeholder="Lựa chọn"
                        @value-changed="valueChangeFilterStatus($event)"
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
                        key-expr="OrganizationUnitID"
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
                          data-field="OrganizationUnitCode"
                          caption="Mã đơn vị"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column"
                          width="250"
                          :fixed="true"
                        />
                        <DxColumn
                          data-field="OrganizationUnitName"
                          caption="Tên đơn vị"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column"
                          width="250"
                        />
                        <DxColumn
                          data-field="ShortCutName"
                          caption="Tên viết tắt"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column"
                          width="250"
                        />
                        <DxColumn
                          data-field="OrganizationUnitPlace"
                          caption="Địa chỉ"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column"
                        />
                        <DxColumn
                          data-field="StatusName"
                          caption="Trạng thái"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column"
                          cell-template="cellTemplateStatus"
                        />
                        <DxColumn
                            :visible="true"
                            css-class="column-function"
                            min-width="50"
                            cell-template="cellTemplateFunction"
                            text-align="left"
                            :fixed="true"
                            fixedPosition="right"
                        />
                        <DxScrolling
                            column-rendering-mode="virtual"
                            :use-native="false"
                            show-scrollbar="always"
                        />
                        <template #cellTemplateStatus="{ data }">
                            <div>
                                <div
                                style="padding-left: 16px; position: relative"
                                v-bind:style="
                                    'color: ' + status(data.data.StatusID)
                                "
                                >
                                {{ data.data.StatusName }}
                                <span
                                    class="dot"
                                    v-bind:style="
                                    'background-color:' +
                                     status(data.data.StatusID)
                                    "
                                ></span>
                                </div>
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
                                        <div class="icon-pencil" @click.stop="editItem(data.data.OrganizationUnitID)"></div>
                                    </div>
                                </div>
                                <!-- <div class="style-button">
                                    <div
                                        title="Xoá"
                                        class="button-command-wrap btn-more"
                                    >
                                        <div class="icon-delete icon-hidden" @click.stop="deleteItem(data.data.OrganizationUnitID)"></div>
                                    </div>
                                </div> -->
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
    </div>
</template>
<script>
import EmptyPage from '@/common/EmptyPage.vue';
import LoadingPage from '@/common/LoadingPage.vue';
import PopupNoticeBase from '@/common/PopupNoticeBase.vue';
import 'devextreme/dist/css/dx.light.css';
import DxSelectBox from 'devextreme-vue/select-box';
import ToolbarGridBase from '@/common/ToolbarGridBase.vue';
import { DxDataGrid,DxSorting,DxPager,DxPaging,DxColumn,DxLoadPanel,DxScrolling,DxColumnFixing } from 'devextreme-vue/data-grid';
import Paging from '@/common/Paging.vue';
import OrganizationUnitAPI from '@/api/OrganizationUnitAPI';
export default {
    name: "ContentOrganizationUnit",
    components:{
        ToolbarGridBase,
        DxSelectBox,
        DxDataGrid,
        DxSorting,
        DxPager,
        DxPaging,
        DxColumn,
        DxLoadPanel,
        DxScrolling,
        Paging,
        PopupNoticeBase,
        LoadingPage,
        EmptyPage,
        DxColumnFixing
    },
    data() {
        return {
            lstStatus: [
                {
                    StatusID: 0,
                    StatusName: "Tất cả"
                },
                {
                    StatusID: 1,
                    StatusName: "Đang theo dõi"
                },
                {
                    StatusID: 2,
                    StatusName: "Ngừng theo dõi"
                },
            ],
            paramPaging: {
                pageNumber: 1,
                pageSize: 50,
                searchValue: "",
                statusID: 0,
            },
            valueFilterStatus: {
                StatusID: 1,
                StatusName: "Đang theo dõi"
            },
            dataSource:[],
            totalRecord: 0,
            isLoadingData: true,
            position: { of: '#paging-grid' },
            showIndicator: true,
            shading: true,
            showPane: true,
            hideOnOutsideClick: false,
            firstLoad: true
        }
    },
    created() {
        this.getDataSource();
    },
    watch: {
    },
    methods: {
        //get dataSource
        async getDataSource(){
            var me = this;
            this.isLoadingData = true;
            //Lấy ra dataSource
            await OrganizationUnitAPI.getDataPaging(this.paramPaging).then(
                (res) => {
                    if(res){
                        this.dataSource = res?.data;
                        this.totalRecord = res?.total;
                        setTimeout(() => {
                            this.isLoadingData = false;
                        }, 200);
                    }
                },
                (err) => {
                    me.$emit('showToast', true, 'Có lỗi xảy ra', true);
                }
            );
        },
        //Thay đổi bộ lọc trạng thái
        valueChangeFilterStatus(e){
            this.paramPaging.statusID = e?.value;
            this.paramPaging.pageNumber = 1;
            this.getDataSource();
        },
        onSearch(e){
            this.paramPaging.searchValue = e;
            this.getDataSource();
        },
        showInfoDetail(e){
            this.$router.push({ name: "organizationDetail", params: { id: e?.data?.OrganizationUnitID } });
        },
        //xét style cho trạng thái đơn vị
        status(statusID){
            if(statusID == "1") return '#17a562';
            else return '#6c757d'
        },
        editItem(organizationUnitID){
            this.$router.push({ name: "organizationEdit", params: { id: organizationUnitID } });
        },
        changePageSize(e){
            this.paramPaging.pageNumber = 1;
            this.paramPaging.pageSize = e;
            this.getDataSource();
        },
        changePageNumber(e){
            this.paramPaging.pageNumber = e;
            this.getDataSource();
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