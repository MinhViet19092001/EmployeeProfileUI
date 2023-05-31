<template>
    <div class="h-full w-full flex flex-column">
        <ToolbarComponent 
            :title-component="'Vai trò người dùng'" 
            @addData="addUserRole" 
            :showBtnAdd="true"
            :show-title-component="true"
        >
        </ToolbarComponent>
        <ContentUserRoleVue :roleUserRole="roleUserRole" @showToast="showToast"/>
    </div>
</template>
<script>
import ToolbarComponent from '@/common/ToolbarComponent.vue';
import ContentUserRoleVue from './ContentUserRole.vue';
export default {
    name: 'UserRole',
    components:{
        ToolbarComponent,
        ContentUserRoleVue
    },
    created() {
        document.title= "Vai trò người dùng | Thông tin nhân sự"
        this.roleUserRole = this.$store.state?.roleUserRole?.join(', ');
    },
    data() {
        return {
            roleUserRole: ""
        }
    },
    methods: {
        showToast(isShowToast,toastText, isShowToastError){
            this.$emit('showToast', isShowToast, toastText, isShowToastError);
        },
        addUserRole(){
            if(this.roleUserRole?.includes("Add")){
                this.$router.push('/user-role/create');
            }
            else{
                this.$emit('showToast', true, 'Bạn không có quyền thực hiện chức năng này', true);
            }
        }
        
    },
}
</script>