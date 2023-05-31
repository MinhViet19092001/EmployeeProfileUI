<template>
    <div class="h-full w-full flex flex-column">
        <ToolbarComponent 
            :title-component="titleComponent" 
            :show-icon-back="true" 
            @backPage="backPage"
            :show-btn-add="false"
        >
            <template v-slot:custom-btn>
                <div class="btn-edit flex" @click="showFormEdit">
                    <div class="icon-pencil"></div>
                    <div class="title-edit">Sửa</div>
                </div>
            </template>
        </ToolbarComponent>
        <div class="organization-create-content flex flex-row">
            <div class="box-content flex flex-column">
                <div class="input-row flex">
                    <div class="title-input-row">Mã vị trí</div>
                    <div class="input-row-data flex">
                        <div class="value-show"> {{ jobPosition.jobPositionCode }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Tên vị trí</div>
                    <div class="input-row-data flex">
                        <div class="value-show"> {{ jobPosition.jobPositionName }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Nhóm vị trí</div>
                    <div class="input-row-data flex">
                        <div class="value-show"> {{ jobPosition.jobPositionGroupName }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Chức danh</div>
                    <div class="input-row-data flex">
                        <div class="value-show"> {{ jobPosition.jobTitleName }}</div>
                    </div>
                </div>
            </div>
            <div class="box-content flex flex-column">
                <div class="input-row flex">
                    <div class="title-input-row">Đơn vị công tác</div>
                    <div class="input-row-data flex">
                        <div class="value-show"> {{ jobPosition.organizationUnitName }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Trạng thái</div>
                    <div class="input-row-data flex">
                        <div class="value-show flex align-center">
                            <div class="dot-status" v-bind:style="'background-color: ' + status(jobPosition.jobPositionStatusID)"></div> 
                            <div v-bind:style="'color: ' + status(jobPosition.jobPositionStatusID)">{{ jobPosition.jobPositionStatusName }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ToolbarComponent from '@/common/ToolbarComponent.vue';
import {useRoute} from "vue-router";
import JobPositionAPI from '@/api/JobPositionAPI';
import { formatInputCurrency } from "@/common/fomatInputCurrency"
export default {
    name: 'JobPositionDetail',
    components:{
        ToolbarComponent
    },
    setup(){
        const route = useRoute();
        const jobPositionID = route.params.id;
        return{
            jobPositionID
        }
    },
    created() {
        var me = this;
        //get ra data từ id
        JobPositionAPI.getById(this.jobPositionID).then( 
            (res) => {
                me.jobPosition = res;
                me.titleComponent = res.jobPositionCode + " - " + res.jobPositionName;
            },
            (error) => {

            }
        )
    },
    data() {
        return {
            titleComponent: "",
            jobPosition: {}
        }
    },
    methods: {
        status(jobPositionID){
            if(jobPositionID == "1") return '#17a562';
            else return '#6c757d'
        },
        backPage(){
            this.$router.push('/jobposition')
        },
        showFormEdit(){
            this.$router.push({ name: "jobPositionEdit", params: { id: this.jobPositionID } });
        },
        format(salaryInsurance){
            return formatInputCurrency(salaryInsurance);
        }
    },
    mounted() {
    },
}
</script>    
<style scoped>
.organization-create-content{
    background-color: #fff;
    margin: 0 24px;
    border-radius: 4px;
    padding: 24px;
}
.organization-create-content .box-content{
    flex: 1;
    width: 50%;
}
.input-row{
    height: 36px;
    margin: 15px 10px;
    width: 100%;
}
.title-input-row{
    font-size: 14px;
    color: #1f1f20!important;
    width: 150px;
    line-height: 36px;
    min-width: 140px;
}
.input-row-data{
    width: 55%;
    border-bottom: 1px solid #e0e1e4;
}
.value-show{
    padding: 6px 10px;
    font-weight: 600;
    font-size: 14px;
}
.dot-status {
    width: 8px !important;
    height: 8px !important;
    border-radius: 50% !important;
    margin-right: 16px;
}
.btn-edit{
    height: 36px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    color: #1f1f20;
    cursor: pointer;
    min-width: 80px;
    font-size: 14px;
    border: 1px solid #dadce3;
}
.btn-edit:hover{
    background-color: #eff1f6;
}
.icon-pencil{
    margin-right: 4px;
}
</style>
