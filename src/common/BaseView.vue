<template>
    <div class="layout-main">
        <div class="toolbar-app">
            <ToolbarApp @back-overview="backOverview($event)"/>
        </div>
        <div class="app-container flex">
            <Sidebar @showSideBar="showSideBarApp($event)" :isBackOverview="isBackOverview"/>
            <div class="content-app h-full" v-bind:style="{'width': widthContentApp}">
                <router-view  @showToast="showToast" @showProcess="showProcess"></router-view>
            </div>
        </div>
        <!--Begin toast thông báo -->
        <BaseToast
            v-if="toastMsg.isShowToast"
            :toastText="toastMsg.toastText"
            :isShowToastError="toastMsg.isShowToastError"
            @closeToastMsg="toastMsg.isShowToast = $event"
        />
        <Process 
            v-if="isShowProcess" 
            :titleProcess="tilteProcess" 
            :textContent="textContent" 
            @closeProcess="isShowProcess = false"
            >
        </Process>
    </div>
</template>
<script>
import LoginAPI from "@/api/LoginAPI";
import Process from "./Process.vue";
import BaseToast from "@/common/BaseToast.vue";
import ToolbarApp from './ToolbarApp.vue';
import Sidebar from './Sidebar.vue';
export default {
    name: "BaseView",
    components:{
        ToolbarApp,
        Sidebar,
        BaseToast,
        Process
    },
    data(){
        return {
            widthContentApp: 'calc(100% - 210px)',
            isBackOverview: false,
            toastMsg: {
                isShowToast: false, //ẩn hiện toast thông báo
                toastText: { type: String }, //Nội dung toast thông báo
                isShowToastError: false, //phân biệt toast thông báo có phải là thông báo lỗi không
            },
            isShowProcess: false,
            tilteProcess: 'Trạng thái',
            textContent: 'Đang chạy tiến trình vui lòng chờ trong giây lát'
        }
    },
    watch:{
        "toastMsg.isShowToast": function(){
            setTimeout(() => {
                this.toastMsg.isShowToast = false;
            }, 2000);
        },
    },
    beforeCreate(){

    },
    methods: {
        showSideBarApp(e){
            if(e){
                this.widthContentApp = 'calc(100% - 210px)';
            }
            else{
                this.widthContentApp = 'calc(100% - 70px)'
            }
        },
        backOverview(e){
            if(e){
                this.isBackOverview = true;
            }
        },
        showToast(isShowToast,toastText, isShowToastError){
            this.toastMsg.isShowToast = isShowToast;
            this.toastMsg.isShowToastError = isShowToastError;
            this.toastMsg.toastText = toastText;
        },
        showProcess(isShowProcess, titleProcess, textContent){
            this.isShowProcess = isShowProcess,
            this.tilteProcess = titleProcess,
            this.textContent = textContent
        }
    },
    mounted() {
    },
    created() {
        //lấy ra quyền của người dùng
        var userID = localStorage.getItem('employeeID');
        if(userID){
            this.$store.commit('login', userID);
            LoginAPI.getUserRole(userID).then(
                (res) => {
                    this.$store.commit('roleEmployee', res?.roleEmployee?.map(x => x.RoleCode));
                    this.$store.commit('roleContract', res?.roleContract?.map(x => x.RoleCode));
                    this.$store.commit('roleUserRole', res?.roleUserRole?.map(x => x.RoleCode));
                    this.$store.commit('roleUserList', res?.roleUserList?.map(x => x.RoleCode));
                },
            )
        }
    },
    beforeUnmount() {

    }
}
</script>
<style scoped>
.layout-main{
    height: 100%;
    min-height: 100%;
}
.toolbar-app{
    height: 56px;
}
.main-toolbar{
    height: 100%;
    width: 100%;
    box-shadow: 0 0 4px rgba(0,0,0,.16);
    justify-content: space-between;
}
.app-container{
    height: calc(100% - 56px);
    overflow-y: scroll;
}
.side-bar-app{
    height: 100%;
    width: 210px;
    background-color: #041434;
    position: relative;
    display: flex;
    flex-direction: column;
}
.content-app{
    background: #eeeff1;
}
</style>