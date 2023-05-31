<template>
    <div class="paging flex">
        <div class="paging-left flex">
            <div>Tổng số bản ghi:   <b>{{ handleTotalEmployee() }}</b></div>
        </div>
        <div class="paging-right flex">
            <div class="dropdow-pagesize flex">
                <DxSelectBox
                    class="select-box-page"
                    :items="lstPageSize"
                    :value="pageSize"
                    placeholder="Lựa chọn"
                    @value-changed="valuePageSizeChange($event)"
                >
                </DxSelectBox>
            </div>
            <div class="start">
                Từ <b>{{ startPage }}</b> đến <b>{{ endPage }}</b>
            </div>
            <div class="next-page flex">
                <div class="icon-prev-page" :style="{'opacity': pageNumber <= 1 ? '0.5' : '1'}" @click="prevPage()"></div>
                <div class="icon-next-page" :style="{'opacity': pageNumber >= totaPage ? '0.5' : '1'}" @click="nextPage()"></div>
            </div>
        </div>
    </div>
</template>
<script>
import 'devextreme/dist/css/dx.light.css';
import DxSelectBox from 'devextreme-vue/select-box';
export default {
    name: "PagingBase",
    components:{
        DxSelectBox
    },
    props:{
        totalRecord:{
            type: Number,
            default: 0
        },
    },
    created() {
        
    },
    data() {
        const lstPageSize = [15, 25, 50, 100];
        return {
            lstPageSize,
            startPage: 1,
            endPage: 50,
            totaPage: 1,
            pageSize: lstPageSize[2],
            pageNumber: 1
        }
    },
    watch:{
        totalRecord(){
            if(this.pageSize > 0){
                this.totalPage = Math.ceil(this.totalRecord / this.pageSize);
            }
        }
    },
    methods: {
        //xử lý hiển thị tổng số nhân viên đang làm việc
        handleTotalEmployee(){
            return this.totalRecord.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        },
        valuePageSizeChange(e){
            this.pageSize = e?.value;
            this.$emit('changePageSize', e?.value);
        },
        nextPage(){
            if(this.pageNumber < this.totalPage){
                this.pageNumber += 1;
                this.$emit('changePageNumber', this.pageNumber);
            }
        },
        prevPage(){
            if(this.pageNumber > 1){
                this.pageNumber -= 1;
                this.$emit('changePageNumber', this.pageNumber);
            }
        }
    },
}
</script>
<style scoped>
.paging{
    padding: 10px 16px;
    background-color: #f5f6f8;
    height: 40px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    flex-direction: row!important;
    justify-content: space-between!important;
    font-size: 14px !important;
}
.paging-left{
    justify-content: center;
    align-items: center;
}
.paging-right{
    align-items: center;
}
.dropdow-pagesize{
    width: 100px;
    margin-right: 16px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    justify-content: space-between;
    align-items: center;
}
.dropdow-pagesize:hover{
    cursor: pointer;
    border-color:#1c80f2!important
}
.numberPageSize{
    padding: 7px 0px 8px 16px;
    display: flex;
}
.next-page{
    align-items: center;
}
.icon-prev-page{
    margin-left: 16px;
}
.select-box-page{
    width: 100px;
}
</style>