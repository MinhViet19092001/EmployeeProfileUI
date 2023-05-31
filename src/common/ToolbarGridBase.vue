<template>
    <div class="toolbar-grid-base">
        <div class="content-toolbar-grid-base">
            <div class="toolbar-grid-base-left">
                <div class="input-search flex " v-bind:style="{'width': widthInputSeach + 'px'}">
                    <div class="icon-search"></div>
                    <input type="text" class="inputSearch" ref="textSearch" name="inputSearch" maxlength="255" id="" v-bind:placeholder="placeHolderInputSearch" @keyup="search">
                </div>
            </div>
            <div class="toolbar-grid-base-right flex">
                <slot name="customfilter"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ToolbarGridBase",
    components:{

    },
    props:{
        widthInputSeach:{
            type:Number,
            default: 240
        },
        placeHolderInputSearch:{
            type: String,
            default: 'Tìm kiếm'
        }
    },
    watch:{

    },
    data() {
        return {

        }
    },
    created() {
        
    },
    methods: {
        search(){
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                let textSearch = this.$refs.textSearch.value == undefined || this.$refs.textSearch.value == null ? ' ' : this.$refs.textSearch.value;
                this.$emit('onSearch', textSearch);
            }, 500);
        }
    },
}
</script>
<style scoped>
.toolbar-grid-base{
    height: 60px;
}
.content-toolbar-grid-base{
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.input-search{
    height: 34px;
    border: 1px solid #e0e1e4!important;
    border-radius: 4px;
}
.input-search input{
    width: 100%;
}
.input-search:hover{
    border-color: #1c80f2!important;
}
.input-search:focus-within{
    border-color: #1c80f2!important;
}
.inputSearch{
    padding-left: 20px!important;
}
.toolbar-grid-base-right{
    align-items: center;
}
</style>