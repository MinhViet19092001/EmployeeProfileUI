<template>
    <div class="layout-main">
        <div class="toolbar-app">
            <ToolbarApp/>
        </div>
        <div class="app-container flex">
            <Sidebar @showSideBar="showSideBarApp($event)"/>
            <div class="content-app" v-bind:style="{'width': widthContentApp}">
                <slot name="content-app">
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
import ToolbarApp from './ToolbarApp.vue';
import Sidebar from './Sidebar.vue';
export default {
    name: "BaseView",
    components:{
        ToolbarApp,
        Sidebar
    },
    data(){
        return {
            widthContentApp: 'calc(100% - 210px)',
        }
    },
    methods: {
        showSideBarApp(e){
            if(e){
                this.widthContentApp = 'calc(100% - 210px)';
            }
            else{
                this.widthContentApp = 'calc(100% - 70px)'
            }
        }
    },
    mounted() {
        
    },
    beforeUnmount() {
        //Xử lý khi bấm nút back lại sẽ reload lại url overview
        this.$router.push('/overview');
    },
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