<template>
    <div class="popup-base w-full h-full">
        <div class="popupbase-content flex">
            <div class="toolbar-popup flex">
                <div class="title-popup"> {{ title }}</div>
                <div class="flex icon-close-tooltip">
                    <div class="icon-close" @click="closePopup()" @mouseover="tooltipBtnClose = true" @mouseleave="tooltipBtnClose = false"></div>
                    <div v-if="tooltipBtnClose">
                        <DxTooltip
                            :visible="tooltipBtnClose"
                            :hide-on-outside-click="false"
                            target=".icon-close"
                            position="bottom"
                        >
                            <div class="custom-tooltip">
                                <div class="icon-align"></div>
                                <div>Đóng</div>
                            </div>
                        </DxTooltip>
                    </div>
                </div>
            </div>
            <div class="container-popup">
                <div class="content-popup w-full h-full">
                    <slot name="content-popup"></slot>
                </div>
            </div>
            <div class="footer-popup flex">
                <div class="btn footer-btn" @click="closePopup()">Đóng</div>
            </div>
        </div>
    </div>
</template>
<script>
import { DxTooltip } from "devextreme-vue/tooltip";
export default {
    name: "PopupBase",
    components:{
        DxTooltip
    },
    props:{
        title:{
            type: String,
        }
    },
    data(){
        return {
            //Ẩn hiện tooltip close
            tooltipBtnClose: false
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
    width: 1080px;
    height: 650px;
    z-index: 1501;
    position: relative;
    margin: auto;
    top: 40px;
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
    max-height: 48px;
    padding: 20px;
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
    border-top: 1px solid #e0e1e4;
    justify-content: flex-end;
}
.footer-btn{
    width: 48px;
    background-color: #2566e9;
    padding: 0 16px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
}
.footer-btn:hover{
    background-color: #205cd6;
}
.container-popup{
    padding: 0 20px;
    height: 500px;
    overflow: hidden;
    font-size: 14px;
}
.icon-close:hover{
    background-color: #dadce3;
    color: #1f1f20;
}
</style>