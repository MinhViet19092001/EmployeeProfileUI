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
        <div class="form-content">
            <div class="organization-create-content flex flex-column" style="margin: 0 16px 16px !important;">
                <div class="form-group w-full">
                    <div class="title-form-group">Thông tin chung</div>
                    <div class="content-from-group flex flex-row">
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Tên vai trò</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ userRole.UserRoleName ?? '-' }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Mô tả</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ userRole.UserRoleDescription ?? '-' }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="organization-create-content flex flex-column" style="margin: 0 16px 16px !important;">
                <div class="form-group w-full">
                    <div class="title-form-group">Phân quyền phân hệ</div>
                    <div class="content-from-group flex flex-row">
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Hồ sơ</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ roleEmployee ?? '-' }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-from-group flex flex-row">
                        <div class="box-content flex flex-column">
                            <div class="input-row flex">
                                <div class="title-input-row">Hợp đồng</div>
                                <div class="input-row-data flex">
                                    <div class="value-show"> {{ roleContract ?? '-' }}</div>
                                </div>
                            </div>
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
import UserRoleAPI from '@/api/UserRoleAPI';
export default {
    name: 'UserRoleDetail',
    components: {
        ToolbarComponent
    },
    setup(){
        const route = useRoute();
        const userRoleID = route.params.id;
        return{
            userRoleID
        }
    },
    created() {
        var me = this;
        //get ra data từ id
        UserRoleAPI.getRoleDetail(this.userRoleID).then( 
            (res) => {
                me.userRole = res?.userRole[0];
                me.titleComponent = me.userRole.UserRoleName;
                if(res?.roleEmployee?.length > 0){
                    let arrRole = res?.roleEmployee?.map(x => x.RoleName);
                    me.roleEmployee = arrRole.join(', ');
                }
                else{
                    me.roleEmployee = '-';
                }
                if(res?.roleContract?.length > 0){
                    let arrRole = res?.roleContract?.map(x => x.RoleName);
                    me.roleContract = arrRole.join(', ');
                }
                else{
                    me.roleContract = '-';
                }
            },
            (error) => {

            }
        )
    },
    data() {
        return {
            titleComponent: "",
            userRole: {},
            roleEmployee: "",
            roleContract: ""
        }
    },
    methods: {
        backPage(){
            this.$router.push('/user-role');
        }
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
.form-content{
    height: 100%;
    overflow-y: scroll;
}
.title-form-group{
    font-size: 16px;
    font-weight: 700;
}
.title-input-row{
    font-size: 14px;
    color: #1f1f20!important;
    width: 200px;
    line-height: 36px;
    min-width: 140px;
}
.profile-info-avt{
    width: 240px;
}
.header-user{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 12px;
}
.header-user-avatar{
    width: 64px!important;
    height: 64px!important;
    text-align: center;
    line-height: 32px;
    border-radius: 50%;
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: #1f1f20;
}
.header-user-name{
    text-align: center;
    font-weight: 700;
    font-size: 20px;
}
.header-user-code{
    vertical-align: middle;
    text-align: center;
    font-size: 14px;
    opacity: .7;
    margin-top: 8px;
}
.profile-info-content{
    vertical-align: middle;
    font-size: 14px;
    justify-content: space-around;
}
</style>