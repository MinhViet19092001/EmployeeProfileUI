<template>
    <div class="flex flex-column">
        <div class="iconLoading loadingPage"></div>
        <div class="content-loading">Đang tải dữ liệu</div>
    </div>
</template>
<script>
export default {
    name:"LoadingPage",
    data() {
        return {
        }
    },    
}
</script>
<style scoped>
.iconLoading{
    position: absolute;
    left: 50%;
    top: 50%;
}
.loadingPage{
  border: 8px solid #f3f3f3;
  border-radius: 50%;  
  border-top: 8px solid #3498db;
  width: 30px;
  height: 30px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  background-color: #fff;
}
.content-loading{
    width: fit-content;
    position: absolute;
    left: 48.5%;
    top: 55%;
}
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>