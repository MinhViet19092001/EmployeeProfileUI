<template>
    <div class="popup-base w-full h-full">
        <div class="popupbase-content flex">
            <div class="toolbar-popup flex">
                <div class="title-popup"> {{ title }}</div>
                <div class="icon-title">
                    <div class="icon-close" @click="closePopup()"></div>
                </div>
            </div>
            <div class="container-popup">
                <div class="content-popup w-full h-full" v-html="contentNotice">
                </div>
            </div>
            <div class="footer-popup flex">
                <div class="btn footer-btn-cancel" @click="closePopup()">Hủy</div>
                <slot name="custom-btn-footer"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "PopupNoticeBase",
    components:{
    },
    props:{
        title:{
            type: String,
        },
        contentNotice:{
            type: String
        }
    },
    data(){
        return {
        }
    },
    created(){

    },
    methods: {
        //Ẩn popup
        closePopup(){
            this.$emit('closePopup', false);
        }
    }
}
</script>
<style scoped>
.popup-base{
    z-index: 1501;
    position: absolute;
    left: 0px;
    top: 0px;
    transform: translate(0px, 0px);
    transition: all 0s ease 0s;
    background-color: rgba(0,0,0,.45);
}
.popupbase-content{
    width: 500px;
    height: auto;
    z-index: 1501;
    position: relative;
    margin: auto;
    top: 30%;
    transition: none 0s ease 0s;
    opacity: 1;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    background-color: #fff;
    justify-content: space-between;
}
.toolbar-popup{
    display: flex;
    height: auto;
    padding: 16px 16px 20px;
    justify-content: space-between;
    align-items: center;
}
.title-popup{
    margin-top: 4px;
    color: #1F1F20;
    font-size: 20px;
    font-weight: 600;
}
.icon-align{
    background-color: #000;
    right: 21px;
}
.footer-popup{
    margin-top: 16px;
    padding: 12px 20px;
    justify-content: flex-end;
}
.footer-btn-cancel{
    width: 48px;
    background-color: #e8eaef;
    padding: 0 16px;
    color: #1f1f20;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 16px;
}
.footer-btn-cancel:hover{
    background-color: #dadce3;
    color: #1f1f20;
}
.container-popup{
    padding: 0 20px;
    font-size: 14px;
}
.icon-title{
    border-radius: 50%;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.icon-title:hover{
    cursor: pointer;
    border-radius: 50%;
    background-color: #eff1f6 ;
}
</style>