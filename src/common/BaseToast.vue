<template>
    <!--Begin Toast thông báo thêm mới thành công nhân viên-->
    <div
      class="ms-toast-box"
      v-bind:class="{ 'ms-toast-error': isShowToastError === true }"
    >
      <div class="ms-toast-msg">
        <div class="icon ms-toast-icon"></div>
        <div class="m-toast-text">{{ toastText }}</div>
        <div class="icon ms-toast-close" @click="closeToast"></div>
      </div>
    </div>
    <!--End Toast thông báo thêm mới thành công nhân viên -->
</template>
<script>
  export default {
    name: "BaseToast",
    components: {},
    data() {
      return {};
    },
    props: ["toastText", "isShowToastError"],
    methods: {
      /**
       * Phuơng thức ẩn toastMsg
       * Author: Dương Minh Việt (5/7/2022)
       */
      closeToast() {
        //truyền dữ liệu từ child (toast) -> parent (EmployeeList)
        this.$emit("closeToastMsg", false);
      },
    },
  };
</script>
<style scoped>

.ms-toast-box {
    height: 48px;
    border-radius: 4px;
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 7;
    background-color: #ffffff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 45%);
    display: flex;
    align-items: center;
}
.ms-toast-msg {
    padding: 0px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.ms-toast-icon {
    background: url("../assets/images/Sprites.64af8f61.svg") no-repeat -848px -308px;
    width: 24px;
    height: 24px;
}
.ms-toast-close {
    background: url("../assets/images/Sprites.64af8f61.svg") no-repeat -1178px -356px;
    width: 24px;
    height: 24px;
    margin-left: 16px;
    cursor: pointer;
}
.ms-toast-error .ms-toast-icon {
    background: url("../assets/images/Sprites.64af8f61.svg") no-repeat -1088px -309px;
    width: 24px;
    height: 24px;
}
</style>
  