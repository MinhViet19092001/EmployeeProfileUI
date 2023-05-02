<template>
    <PopupBase
        :title="'Tổng số nhân viên'"
        @closePopup="closePopup($event)"
    >
        <template v-slot:content-popup>
            <GridBase></GridBase>
        </template>
    </PopupBase>
</template>
<script>
import PopupBase from '@/common/PopupBase.vue';
import GridBase from '@/common/GridBase.vue';
export default {
    name: "PopupTotalEmployee",
    components:{
        PopupBase,
        GridBase
    },
    data(){
        return {

        }
    },
    created(){

    },
    methods: {
        //Ẩn popup
        closePopup(e){
            this.$emit('closePopup', false);
        }
    }
}
</script>
<style scoped>

</style>