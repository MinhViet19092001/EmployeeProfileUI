<template>
    <div class="side-bar-app" v-bind:style="{'width': widthSideBar}">
        <div class="sidebar-item-list">
            <div v-for="item in lstSidebar" :key="item.ID" class="sidebar-item" @click="selectTab($event)">
                <a class="link-wrapper" :href="item.Link">
                    <div class="item-float-active" v-bind:style="{'display': item.Display}"></div>
                    <div class="item-content">
                        <div class="icon" v-bind:class="item.Icon" v-bind:style="{'background-color': item.Display == 'block' ? '#fff' : '#869ab8'}"></div>
                        <div class="icon-text" v-bind:style="{'color': item.Display == 'block' ? '#fff' : '#869ab8', 'display': showText}">{{ item.Text }}</div>
                    </div>
                </a>
            </div>
        </div>
        <div class="sidebar-item setting-item" @click="hideSideBar()">
            <div class="item-float-active"></div>
            <div class="item-content">
                <div class="icon icon-caret-left" v-if="showText != 'none'"></div>
                <div v-else class="icon icon-caret-right"></div>
                <div class="icon-text" v-bind:style="{ 'display': showText}">Thu gọn</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "SideBarApp",
    components:{

    },
    data() {
        return {
            lstSidebar : [
                {
                    ID: 1,
                    Text: "Tổng quan",
                    Icon: "icon-overview",
                    Link: "./overview",
                    Display: 'none'
                },
                {
                    ID: 2,
                    Text: "Hồ sơ",
                    Icon: "icon-employee",
                    Link: "./employee",
                    Display: 'none'
                },
                {
                    ID: 3,
                    Text: "Hợp đồng",
                    Icon: "icon-contract",
                    Link: "./contract",
                    Display: 'none'
                },
                {
                    ID: 4,
                    Text: "Bổ nhiệm",
                    Icon: "icon-appoint",
                    Link: "./appoint",
                    Display: 'none'
                },
                {
                    ID: 5,
                    Text: "Miễn nhiệm",
                    Icon: "icon-dismiss",
                    Link: "./dismiss",
                    Display: 'none'
                },
                {
                    ID: 6,
                    Text: "Thuyên chuyển",
                    Icon: "icon-displacement",
                    Link: "./displacement",
                    Display: 'none'
                },
                {
                    ID: 7,
                    Text: "Nghỉ việc",
                    Icon: "icon-termination",
                    Link: "./termination",
                    Display: 'none'
                },
                {
                    ID: 8,
                    Text: "Báo cáo",
                    Icon: "icon-report",
                    Link: "./report",
                    Display: 'none'
                },
                {
                    ID: 9,
                    Text: "Thiết lập",
                    Icon: "icon-setting",
                    Link: "./setting",
                    Display: 'none'
                },
            ],
            widthSideBar: '210px',
            showText: 'block',
            isShowSideBar: true
        }
    },
    created() {
        //auto chọn vào form overview khi created
        this.lstSidebar.forEach(element => {
            if(element.ID == 1){
                element.Display = 'block';
            }
        });
    },
    watch:{
        isShowSideBar(){
            if(this.isShowSideBar){
                this.widthSideBar = '210px';
                this.showText = 'block';
            }
            else{
                this.widthSideBar = '70px';
                this.showText = 'none';
            }
        }
    },
    methods: {
        //Click chọn các phân hệ
        selectTab(e){
            if(e){
                this.lstSidebar.forEach(element => {
                    if(element.ID != e.ID){
                        element.Display = 'none';
                    }
                });
                e.Display = 'block';
            }
        },
        //Sự kiện ẩn thanh size bar
        hideSideBar(){
            this.isShowSideBar = !this.isShowSideBar;
            this.$emit('showSideBar',this.isShowSideBar);
        }
    }
}
</script>
<style scoped>
.side-bar-app{
    height: 100%;
    background-color: #041434;
    position: relative;
    display: flex;
    flex-direction: column;
}
.sidebar-item-list{
    flex-grow: 1;
    margin-top: 8px;
}
.sidebar-item{
    height: 48px;
    margin-top: 4px;
    cursor: pointer;
    position: relative;
}
.link-wrapper{
    text-decoration: none;
    color: inherit;
}
.item-float-active{
    display: none;
    background-color: #2566e9;
    border-radius: 4px;
    width: calc(100% - 22px);
    height: 100%;
    margin-left: 12px;
    opacity: .5;
    position: absolute;
}
.item-content{
    display: flex;
    flex-direction: unset;
    justify-content: normal;
    align-items: center;
    margin-left: 24px;
    height: 100%;
    color: #869ab8;
}
.icon-text{
    font-size: 14px;
    padding-left: 12px!important;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 500;
    z-index: 20;
    color: #869ab8;
}
.sidebar-item:hover .item-float-active{
    display: block !important;
    background-color: #2566e9;
    border-radius: 4px;
    width: calc(100% - 22px);
    height: 100%;
    margin-left: 12px;
    opacity: .24;
}
.setting-item{
    bottom: 0;
    left: 0;
    display: block;
    border-top: 1px solid #213553;
    width: 100%;
    height: 48px;
}
.setting-item .item-float-active{
    display: none;
    background-color: #2566e9;
    border-radius: 4px;
    width: calc(100% - 22px);
    height: 100%;
    margin-left: 0px;
    opacity: .5;
    position: absolute;
}
.setting-item:hover .item-float-active{
    display: block !important;
    background-color: #2566e9;
    border-radius: 4px;
    width: 100%;
    height: 100%;
    margin-left: 0px;
    opacity: .24;
}
.sidebar-item:hover .icon-text{
    color: #dadde4 !important;
}
</style>