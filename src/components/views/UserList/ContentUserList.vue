<template>
<div class="content-organization-unit">
        <div class="container-org w-full h-full">
            <ToolbarGridBase 
                :widthInputSeach="320" 
                :placeHolderInputSearch="'Tìm kiếm người dùng'"
                @onSearch="onSearch"
            >
            </ToolbarGridBase>
            <div class="grid-org">
                <LoadingPage v-if="isLoadingData"></LoadingPage>
                <div class="grid-data" v-if="!isLoadingData">
                    <DxDataGrid
                        id="paging-grid"
                        :data-source="dataSource"
                        key-expr="UserListID"
                        :allow-column-resizing="true"
                        :show-borders="true"
                        :show-row-lines="true"
                        :column-auto-width="true"
                        :column-min-width="80"
                        :hover-state-enabled="true"
                        :allow-sorting="false"
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
                          width="250"
                          :fixed="true"
                        />
                        <DxColumn
                          data-field="FullName"
                          caption="Họ và tên"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column"
                          width="250"
                          :fixed="true"
                        />
                        <DxColumn
                          data-field="UserRoleName"
                          caption="Tên vai trò"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column"
                          width="250"
                        />
                        <DxColumn
                          data-field="UserRoleDescription"
                          caption="Mô tả"
                          alignment="left"
                          min-width="50"
                          css-class="custom-column"
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
                        <DxScrolling
                            column-rendering-mode="virtual"
                            :use-native="false"
                            show-scrollbar="always"
                        />
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
                                        <div class="icon-pencil" @click.stop="editItem(data.data.UserRoleID)"></div>
                                    </div>
                                </div>
                                <div class="style-button" v-if="data.data.UserRoleID != 1">
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
import UserListAPI from '@/api/UserListAPI'
export default {
    name: "ContentUserList",
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
    created() {
        this.getDataSource();
    },
    data() {
        return {
            paramPaging: {
                pageNumber: 1,
                pageSize: 50,
                searchValue: "",
            },
            dataSource:[],
            totalRecord: 0,
            isLoadingData: true,
        }
    },
    props:{
        roleUserList:{
            type: String,
            default: ""
        }
    },
    methods: {
        //get dataSource
        async getDataSource(){
            var me = this;
            this.isLoadingData = true;
            //Lấy ra dataSource
            await UserListAPI.getDataPaging(this.paramPaging).then(
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
        onSearch(e){
            this.paramPaging.searchValue = e;
            this.getDataSource();
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
        editItem(userListID){
            if(this.roleUserList?.includes("Edit")){

            }
            else{
                this.$emit('showToast', true, 'Bạn không có quyền thực hiện chức năng này', true);
            }
        },
        deleteItem(userList){
            if(this.roleUserList?.includes("Delete")){

            }
            else{
                this.$emit('showToast', true, 'Bạn không có quyền thực hiện chức năng này', true);
            }
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