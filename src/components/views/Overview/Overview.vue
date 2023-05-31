<template>
    <LoadingPage v-if="isLoadingPage"/>
    <div class="h-full w-full" v-if="!isLoadingPage">
        <ToolbarOverview v-if="!isLoadingPage"/>
        <ContentOverview v-if="!isLoadingPage"/>
    </div>
</template>
<script>
import LoadingPage from '@/common/LoadingPage.vue';
import ToolbarOverview from './ToolbarOverview.vue';
import ContentOverview from './ContentOverview.vue';
export default {  
    name: "Overview",
    components: {
        ToolbarOverview,
        ContentOverview,
        LoadingPage
    },
    data(){
        return{
            //Biến xác định load trang
            isLoadingPage: true
        }
    },
    beforeCreate(){
    },
    created() {
        //xét title cho page
        document.title= "Tổng quan | Thông tin nhân sự"
        //ẩn loading page
        setTimeout(() => {
            this.isLoadingPage = false;
        }, 2000);
    },
    methods: {
        
    }
}
</script>
<style scoped>
</style>