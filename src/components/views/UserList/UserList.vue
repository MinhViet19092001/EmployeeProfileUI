<template>
<div class="h-full w-full flex flex-column">
        <ToolbarComponent 
            :title-component="'Tất cả người dùng'" 
            @addData="addUserList" 
            :showBtnAdd="true"
            :show-title-component="true"
        >
        </ToolbarComponent>
        <ContentUserList @showToast="showToast" :roleUserList="roleUserList"/>
    </div>
</template>
<script>
import ToolbarComponent from '@/common/ToolbarComponent.vue';
import ContentUserList from './ContentUserList.vue';
export default {
    name: 'UserList',
    components:{
        ToolbarComponent,
        ContentUserList
    },
    created() {
        document.title= "Quản lý người dùng | Thông tin nhân sự"
        this.roleUserList = this.$store.state?.roleUserList?.join(', ');
    },
    data() {
        return {
            roleUserList: ""
        }
    },
    methods: {
        //Thêm mới đơn vị
        addUserList(){
            if(this.roleUserList?.includes("Add")){
                this.$router.push('/user-list/create')
            }
            else{
                this.$emit('showToast', true, 'Bạn không có quyền thực hiện chức năng này', true);
            }
        },
        showToast(isShowToast,toastText, isShowToastError){
            this.$emit('showToast', isShowToast, toastText, isShowToastError);
        },
    },
}
</script>