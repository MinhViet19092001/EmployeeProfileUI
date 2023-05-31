<template>
    <div class="process-base">
        <div class="process-header flex">
            <div class="process-header-left flex">
                <div class="title-process">{{ titleProcess }}</div>
            </div>
            <div class="process-header-right flex">
                <div class="icon-close" @click="closePopup()"></div>
            </div>
        </div>
        <div class="process-content flex">
            <div class="process-content-loading">
                <LoadingPage></LoadingPage>
            </div>
            <div class="process-content-text">{{ textContent }}</div>
        </div>
    </div>
</template>
<script>
import LoadingPage from './LoadingPage.vue';
export default {
    name: 'Process',
    components:{
        LoadingPage
    },
    props:{
        titleProcess:{
            type: String
        },
        textContent:{
            type: String
        }
    },
    watch:{
    },
    data() {
        return {
        }
    },
    methods: {
        closePopup(){
            this.$emit('closeProcess', false);
        }
    },
}
</script>
<style scoped>
.process-base{
    position: fixed;
    bottom: 24px;
    right: 24px;
    max-width: 400px;
    min-width: 300px;
    height: 140px;
    z-index: 9999;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,.16);
    border-radius: 4px;
}
.process-content-text{
    font-size: 14px;
    color: #1f1f20;
}
.process-header{
    display: flex;
    align-items: center;
    padding: 16px 16px 20px;
    justify-content: space-between;
}
.process-content{
    display: flex;
    align-items: center;
    padding: 0 16px 16px;
}
.title-process{
    margin-top: 4px;
    color: #1F1F20;
    font-size: 20px;
    font-weight: 600;
}
.icon-close:hover{
    background-color: #dadce3;
    color: #1f1f20;
    border-radius: 50%;
}
.img-loading{
    position: inherit;
}
.process-content-loading{
    margin-right: 16px;
}
</style>