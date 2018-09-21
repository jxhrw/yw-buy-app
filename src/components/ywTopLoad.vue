<template>
  <div id='ywTopLoad' class='appDown' v-if="isShow">
    <a class="appDownClose" href="javascript:;" @click="closeThis"></a>
    <a class="appToDown" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.youwatch.dealerapp"></a>
  </div>
</template>
<script>
  export default {
    props: {

    },
    data(){
        return {
            isShow:true,
        }
    },
    methods:{
        closeThis(){
            this.isShow = false;
        }
    }
  }

</script>

<style scoped>
  .appDown {
    width: 100%;
    height: 1.02rem;
    position: relative;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Ficon_topLoadApp.png') no-repeat center/100% 100%;
  }

  .appDownClose {
    float: left;
    display: block;
    width: 1rem;
    height: 100%;
  }

  .appToDown {
    float: right;
    display: block;
    width: 2rem;
    height: 100%;
  }

</style>
