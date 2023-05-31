<template>
    <div class="h-full w-full flex flex-column">
        <ToolbarComponent 
            @addData="addContract" 
            :showBtnAdd="true"
            :show-title-component="false"
        >
            <template v-slot:custom-title>
                <div>
                    <DxSelectBox
                        class="select-box-filter-employee"
                        :data-source="lstFilter"
                        :value="lstFilter[0].FilterID"
                        value-expr="FilterID"
                        display-expr="FilterName"
                        drop-down-button-template="imageIcon"
                        @item-click="valueChangeFilterStatus($event)"
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
        <ContentContract  :filter="valueFilter" @showToast="showToast" :roleContract="roleContract"/>
    </div>
</template>
<script>
import 'devextreme/dist/css/dx.light.css';
import DxSelectBox from 'devextreme-vue/select-box';
import ToolbarComponent from '@/common/ToolbarComponent.vue';
import ContentContract from './ContentContract.vue';
import ContractAPI from '@/api/ContractAPI';
export default {
    name: "Contract",
    components:{
        ContentContract,
        ToolbarComponent,
        DxSelectBox
    },
    created() {
        document.title= "Hợp đồng | Thông tin nhân sự"
        this.roleContract = this.$store.state?.roleContract?.join(', ');
    },
    data() {
        const lstFilter =  [
                {
                    FilterID: 0,
                    FilterName: 'Tất cả hợp đồng'
                },
                {
                    FilterID: 1,
                    FilterName: 'Hợp đồng đang có hiệu lực'
                },
                {
                    FilterID: 2,
                    FilterName: 'Hợp đồng hết hiệu lực'
                },
                {
                    FilterID: 3,
                    FilterName: 'Hợp đồng hết hạn tháng này'
                },
            ];
        return {
            lstFilter,
            valueFilter: lstFilter[0],
            roleContract: ""
        }
    },
    methods: {
        //Thêm mới đơn vị
        addContract(){
            if(this.roleContract.includes("Add")){
                this.$router.push('/contract/create')
            }
            else{
                this.$emit('showToast', true, 'Bạn không có quyền thực hiện chức năng này', true);
            }
        },
        showToast(isShowToast,toastText, isShowToastError){
            this.$emit('showToast', isShowToast, toastText, isShowToastError);
        },
        valueChangeFilterStatus(e){
            this.valueFilter = e?.itemData?.FilterID;
        },
        exportData(){
            this.$emit('showProcess', true, 'Trạng thái xuất khẩu', 'Đang thực hiện xuất khẩu vui lòng đợi trong giây lát')
            ContractAPI.export().then(
                (response)=>{
                        //xây dựng một đối tượng blob để xử lý dữ liệu và đặt loại tệp
                        let blob = new Blob([response], {
                            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        });
                        //tạo một URL mới để đại diện cho đối tượng blob được chỉ định
                        var url = window.URL.createObjectURL(blob);
                        //Tạo một thẻ element <a></a>
                        const link = document.createElement("a");
                        //chỉ định liên kết tải xuống
                        link.href = url;
                        //Xét các thuộc tính cho đường dẫn là download, fileName: Danh sách nhân viên.xlsx
                        link.setAttribute("download", `Danh sách hợp đồng.xlsx`);
                        //Thêm đường dẫn vào document;
                        document.body.appendChild(link);
                        //Tự động download
                        link.click();
                        this.$emit('showProcess', false, '', '')
                }, 
                (err) => {

                }
            )
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
    width: 280px;
}
.select-box-filter-employee .dx-texteditor-buttons-container .dx-dropdowneditor-button{
    width: 24px;
    height: 24px;
}
</style>