<template>
    <div v-bind:style="{'height': height}">
        <div class="flex toolbar-component">
            <div class="toolbar-component-left flex">
                <div class="icon-back" v-if="showIconBack" title="Quay lại" @click="backPage"></div>
                <div class="title-toolbar-component flex" v-if="showTitleComponent"> {{ titleComponent }}</div>
                <slot name="custom-title"></slot>
            </div>
            <div class="btn-toolbar-component flex">
                <slot name="custom-btn"></slot>
                <div class="btn-add" v-if="showBtnAdd" @click="btnAdd($event)">
                    <div class="icon-plus"></div>
                    <div class="title-plus">Thêm</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { DxTooltip } from "devextreme-vue/tooltip";
export default {
    name: "ToolbarComponent",
    components:{
        DxTooltip
    },
    props:{
        titleComponent:{
            type: String,
            default: ''
        },
        showIconBack:{
            type: Boolean,
            default: false
        },
        showBtnAdd:{
            type: Boolean,
            default: true
        },
        showTitleComponent:{
            type: Boolean,
            default: true
        },
        toolbarHeight: {
            type: String
        }
    },
    created() {
        
    },
    watch:{
    },
    data() {
        return {
            height: this.toolbarHeight ? this.toolbarHeight : '68px',
        }
    },
    methods: {
        btnAdd(e){
            this.$emit('addData');
        },
        backPage(){
            this.$emit('backPage');
        }
    },
}
</script>
<style scoped>
.toolbar-component{
    padding: 16px 24px;
    position: relative;
    align-items: center;
    justify-content: space-between;
}
.title-toolbar-component{
    font-size: 20px;
    font-weight: 700;
}
.btn-add{
    height: 36px;
    border-radius: 4px;
    padding: 0 16px 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2566e9;
    color: #fff;
    cursor: pointer;
}
.icon-back{
    margin-right: 10px;
    cursor: pointer;
}
.icon-plus{
    margin-right: 4px;
}
.title-plus{
    font-size: 14px;
}
</style>