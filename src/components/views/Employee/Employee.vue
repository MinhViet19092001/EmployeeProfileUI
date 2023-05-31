<template>
    <div class="h-full w-full flex flex-column">
        <ToolbarComponent
            @addData="addEmployee" 
            :showBtnAdd="true"
            :show-title-component="false"
        >
            <template v-slot:custom-title>
                <div>
                    <DxSelectBox
                        class="select-box-filter-employee"
                        :data-source="lstFilter"
                        :value="valueFilter.FilterID"
                        value-expr="FilterID"
                        display-expr="FilterName"
                        drop-down-button-template="imageIcon"
                        @value-changed="valueChangeFilterStatus($event)"
                        :placeholder="''"
                    >
                        <template #imageIcon="{}">
                            <div class="icon-dropdown"></div>
                        </template>
                    </DxSelectBox>
                </div>
            </template>
            <template v-slot:custom-btn>
                <div class="btn-export" @click="exportData">
                    <div class="icon-export"></div>
                    <div class="title-export">Xuất khẩu</div>
                </div>
            </template>
        </ToolbarComponent>
        <ContentEmployee :filter="valueFilter" @showToast="showToast" :roleEmployee="roleEmployee" ></ContentEmployee>
    </div>
</template>
<script>
import 'devextreme/dist/css/dx.light.css';
import DxSelectBox from 'devextreme-vue/select-box';
import ToolbarComponent from '@/common/ToolbarComponent.vue';
import ContentEmployee from './ContentEmployee.vue';
export default {
    name: 'Employee',
    components: {
        ToolbarComponent,
        DxSelectBox,
        ContentEmployee
    },
    created() {
        document.title = 'Hồ sơ | Thông tin nhân sự' 
        this.roleEmployee = this.$store.state?.roleEmployee?.join(', ');
    },
    data() {
        const lstFilter =  [
                {
                    FilterID: 0,
                    FilterName: 'Tất cả nhân viên'
                },
                {
                    FilterID: 1,
                    FilterName: 'Đang làm việc'
                },
                {
                    FilterID: 2,
                    FilterName: 'Đã nghỉ việc'
                },
            ];
        return {
            lstFilter,
            valueFilter: lstFilter[0]
        }
    },
    methods: {
        addEmployee(){
            if(this.roleEmployee.includes("Add")){
                this.$router.push('/employee/create');
            }
            else{
                this.$emit('showToast', true, 'Bạn không có quyền thực hiện chức năng này', true);
            }
        },
        showToast(isShowToast, textToast, isShowToastError){
            this.$emit('showToast',isShowToast, textToast, isShowToastError);
        },
        valueChangeFilterStatus(e){
            this.valueFilter = e?.value;
        }
    },
}
</script>
<style scoped>
.select-box-filter-employee.dx-texteditor.dx-editor-outlined{
    background-color: #eeeff1;
    border: none;
}

.select-box-filter-employee .icon-dropdown{
    -webkit-mask-position: -70px -25px;
}
.btn-export{
    height: 36px;
    border-radius: 4px;
    padding: 0 16px 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    color: #1f1f20;
    cursor: pointer;
    margin-right: 16px;
    border: 1px solid #dadce3;
}
.btn-export:hover{
    background-color: #eff1f6;
}
.icon-export{
    margin-right: 4px;
}
.title-export{
    font-size:  14px;
}
</style>
<style>
.select-box-filter-employee .dx-texteditor-input-container .dx-texteditor-input{
    font-size: 20px;
    font-weight: 700;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    padding: 0px !important;
    width: 150px;
}
.select-box-filter-employee .dx-texteditor-buttons-container .dx-dropdowneditor-button{
    width: 24px;
    height: 24px;
}
</style>