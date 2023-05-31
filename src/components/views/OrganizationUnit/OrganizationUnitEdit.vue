<template>
 <div class="h-full w-full flex flex-column">
        <ToolbarComponent 
            :title-component="'Sửa cơ cấu tổ chức'" 
            :show-icon-back="true" 
            @backPage="backPage"
            :show-btn-add="false"
        >
            <template v-slot:custom-btn>
                <div class="flex align-center justify-center">
                    <div class="btn-cancel" @click="backPage">
                        <div class="tilte-cancel">Hủy</div>
                    </div>
                    <div class="btn-save" @click="saveOrganizationUnit">
                        <div class="title-save">Lưu</div>
                    </div>
                </div>
            </template>
        </ToolbarComponent>
        <div class="organization-create-content flex flex-row">
            <div class="box-content flex flex-column">
                <div class="input-row flex">
                    <div class="title-input-row">Mã đơn vị <span style="color: red;">*</span></div>
                    <div class="input-row-content">
                        <input type="text" class="field-row-input" ref="organizationUnitCode" tabindex="1" :class="{'field-row-input-error': isErrorCode}" v-model="organizationUnit.organizationUnitCode">
                        <div v-if="isErrorCode" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorCode }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Tên đơn vị <span style="color: red;">*</span></div>
                    <div class="input-row-content">
                        <input type="text" class="field-row-input" :class="{'field-row-input-error': isErrorName}" tabindex="2" v-model="organizationUnit.organizationUnitName">
                        <div v-if="isErrorName" style="color: red; font-size: 13px; margin-top: 10px; margin-bottom: 16px;">{{ errorName }}</div>
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Tên viết tắt</div>
                    <div class="input-row-content">
                        <input type="text" class="field-row-input" v-model="organizationUnit.shortCutName" tabindex="3">
                    </div>
                </div>
            </div>
            <div class="box-content flex flex-column">
                <div class="input-row flex">
                    <div class="title-input-row">Địa chỉ</div>
                    <div class="input-row-content">
                        <input type="text" class="field-row-input" v-model="organizationUnit.organizationUnitPlace" tabindex="4" @blur="focusToDropdown">
                    </div>
                </div>
                <div class="input-row flex">
                    <div class="title-input-row">Trạng thái</div>
                    <div class="input-row-content" style="width: calc(55% + 32px);">
                        <DxSelectBox
                            ref="dropdownStatus"
                            class="select-box-status"
                            :data-source="lstStatus"
                            :value="organizationUnit.statusID"
                            value-expr="StatusID"
                            display-expr="StatusName"
                            placeholder="Lựa chọn"
                            @value-changed="valueChanged($event)"
                        >
                        </DxSelectBox>
                    </div>
                </div>
            </div>
        </div>
        <PopupNoticeBase 
            v-if="isShowPopupNotice" 
            :title="'Thông báo'" 
            @closePopup="isShowPopupNotice=false"
            :content-notice="'Bạn có muốn lưu lại các thông tin vừa nhập không? '"
        >
            <template v-slot:custom-btn-footer>
                <div class="btn-not-save" @click="notSaveOrganizationUnit">
                    <div class="title-not-save">Không lưu</div>
                </div>
                <div class="btn-save" @click="saveOrganizationUnit">
                    <div class="title-save">Lưu</div>
                </div>
            </template>
        </PopupNoticeBase>
    </div>
</template>
<script>
import PopupNoticeBase from "@/common/PopupNoticeBase.vue";
import ToolbarComponent from '@/common/ToolbarComponent.vue';
import {useRoute} from "vue-router";
import OrganizationUnitAPI from '@/api/OrganizationUnitAPI';
import 'devextreme/dist/css/dx.light.css';
import DxSelectBox from 'devextreme-vue/select-box'
export default {
    name: "OrganizationUnitEdit",
    components:{
        ToolbarComponent,
        DxSelectBox,
        PopupNoticeBase
    },
    setup(){
        const route = useRoute();
        const organizationUnitID = route.params.id;
        return{
            organizationUnitID
        }
    },
    created() {
        this.getObjectOrganizationUnit();
    },
    mounted() {
        this.$refs.organizationUnitCode.focus();
    },
    data() {
        return {
            lstStatus: [
                {
                    StatusID: 1,
                    StatusName: 'Đang theo dõi'
                },
                {
                    StatusID: 2,
                    StatusName: 'Ngừng theo dõi'
                },
            ],
            organizationUnit: {},
            isShowPopupNotice: false
        }
    },
    methods: {
        valueChanged(e){
            if(e){
                this.organizationUnit.statusID = e?.value;
                if(e?.value == 1){
                    this.organizationUnit.statusName = 'Đang theo dõi';
                }
                else{
                    this.organizationUnit.statusName = 'Ngừng theo dõi';
                }
            }
        },
        async getObjectOrganizationUnit(){
            var me = this;
            //get ra data từ id
            await OrganizationUnitAPI.getById(this.organizationUnitID).then( 
                (res) => {
                    me.organizationUnit = res;
                },
                (error) => {

                }
            )
        },
        saveOrganizationUnit(){
            var me = this;
            OrganizationUnitAPI.updateById(this.organizationUnitID, this.organizationUnit).then(
                (res) => {
                    this.$router.push('/organization');
                    this.$emit('showToast', true, 'Cập nhật đơn vị thành công');
                },
                (error) => {
                    this.$emit('showToast', true, 'Cập nhật đơn vị thất bại');
                }

            )
        },
        backPage(){
            this.isShowPopupNotice = true
        },
        notSaveOrganizationUnit(){
            this.$router.push('/organization')
        }
    },
}
</script>
<style scoped>
.btn-cancel{
    height: 36px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    color: #1f1f20;
    cursor: pointer;
    min-width: 80px;
    margin-right: 16px;
}
.btn-cancel:hover{
    background-color: #eff1f6;
}
.btn-save{
    height: 36px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2566e9;
    color: #fff;
    cursor: pointer;
    min-width: 80px;
}
.btn-not-save{
    height: 36px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e4edff;
    color: #2566e9;
    cursor: pointer;
    min-width: 80px;
    margin-right: 16px;
}
.btn-not-save:hover{
    background-color: #d1e0ff;
}
.title-save{
    font-size: 14px;
    padding: 0 16px;
}
.title-not-save{
    font-size: 14px;
    padding: 0 16px;
}
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
.input-row-content{
    width: 55%;
}
.field-row-input{
    height: 34px;
    width: 100%;
    padding: 0 16px;
    color: #1f1f20;
    font-size: 14px!important;
    border-radius: 4px;
    -moz-background-clip: padding;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid #e0e1e4;
}
.field-row-input:hover{
    border-color: #1c80f2;
}
.field-row-input:focus-within{
    border-color: #1c80f2;
}
.field-row-input-error{
    border-color: red !important;
}
.dx-texteditor.dx-state-hover{
    border-color: #1c80f2;
}
</style>