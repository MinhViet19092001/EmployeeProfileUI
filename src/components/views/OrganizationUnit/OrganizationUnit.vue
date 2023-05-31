<template>
    <div class="h-full w-full flex flex-column">
        <ToolbarComponent 
            :title-component="'Tất cả đơn vị'" 
            @addData="addOrganizationUnit" 
            :showBtnAdd="true"
            :show-title-component="true"
        >
            <template v-slot:custom-btn>
                <div class="btn-export" @click="exportData">
                    <div class="icon-export"></div>
                    <div class="title-export">Xuất khẩu</div>
                </div>
            </template>
        </ToolbarComponent>
        <ContentOrganizationUnit @showToast="showToast"/>
    </div>
</template>
<script>
import ToolbarComponent from '@/common/ToolbarComponent.vue';
import ContentOrganizationUnit from './ContentOrganizationUnit.vue';
import OrganizationUnitAPI from '@/api/OrganizationUnitAPI';
export default {
    name: 'OrganizationUnit',
    components:{
        ToolbarComponent,
        ContentOrganizationUnit,
        OrganizationUnitAPI
    },
    data() {
        return {
            //Biến xác định load trang
            isLoadingPage: true
        }
    },
    created() {
        document.title= "Đơn vị | Thông tin nhân sự"
    },
    methods: {
        //Thêm mới đơn vị
        addOrganizationUnit(){
            this.$router.push('/organization/create')
        },
        showToast(isShowToast,toastText, isShowToastError){
            this.$emit('showToast', isShowToast, toastText, isShowToastError);
        },
        exportData(){
            this.$emit('showProcess', true, 'Trạng thái xuất khẩu', 'Đang thực hiện xuất khẩu vui lòng đợi trong giây lát')
            OrganizationUnitAPI.export().then(
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
                        link.setAttribute("download", `Danh sách đơn vị.xlsx`);
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