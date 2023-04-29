<template>
    <LoadingPage v-if="isLoadingPage"/>
    <BaseView v-if="!isLoadingPage">
        <template v-slot:content-app>
            <ToolbarOverview />
            <ContentOverview />
        </template>
    </BaseView>
</template>
<script>
import BaseView from '../../../common/BaseView.vue'
import LoadingPage from '@/common/LoadingPage.vue';
import ToolbarOverview from './ToolbarOverview.vue';
import ContentOverview from './ContentOverview.vue';
export default {  
    name: "Overview",
    components: {
        LoadingPage,
        BaseView,
        ToolbarOverview,
        ContentOverview
    },
    data(){
        return{
            //Biến xác định load trang
            isLoadingPage: true
        }
    },
    created() {
        //xét title cho page
        document.title= "Tổng quan | Thông tin nhân sự"
        //ẩn loading page
        setTimeout(() => {
            this.isLoadingPage = false;
        }, 2000);
    },
    methods(){
        
    }
}
</script>
<style scoped>
</style>