<template>
  <ul class="proList">
    <template v-for="(item,index) in items">
      <li :key="index" @click="jumpHref(item.id)">
        <div v-if="item.image=='http://youwatch.oss-cn-beijing.aliyuncs.com/null'" class="imgDiv" :style="{ 'background-image': 'url('+imgDefault+')'}"></div>
        <div v-else class="imgDiv" :style="{ 'background-image': 'url('+item.image+')'}"></div>
        <div class="infoBox">
          <p class="itName">{{item.name}}</p>
          <p class="itPrice">
            <span>￥</span>{{item.retailPriceShow}}</p>
          <p class="itShopName">{{item.shopCnName}}</p>
          <p v-if="isShare" class="shareIcon" @click="share(item.id)"></p>
        </div>
      </li>
    </template>

  </ul>
</template>
<script>
import imgDefault from '@/assets/imgs/img_default.png'
  export default {
    props: {
      items: {
        type: Array,
        default: function () {
          return []
        }
      },
      isShare:{
        type:Boolean,
        default: function(){
          return false
        }
      },
    },
    data(){
      return{
        imgDefault:imgDefault,
      }
    },
    methods: {
      jumpHref(id) {
        this.$emit('headCallBack', false);
        this.$router.push({
          path: '/shopDetail',
          query: {
            id: id
          }
        });
      },
      share(id){
        alert(id);
        event.stopPropagation(); 
      }
    },
    mounted() {
      // this.imgDefault = ;
    },
  }

</script>
<style scoped>
  ul.proList {
    width: 7.5rem;
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background: #fafafa;
  }

  ul.proList li {
    width: 3.73rem;
    padding: .22rem .2rem;
    background: #fff;
    margin-top: .04rem;
  }

  ul.proList li .imgDiv {
    height: 3.32rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  ul.proList li .infoBox {
    margin-top: .2rem;
    padding: 0.2rem 0.08rem 0.1rem 0.08rem;
    position: relative;
  }

  ul.proList li .itName {
    font-size: .24rem;
    line-height: .24rem;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ul.proList li .itPrice {
    margin-top: .3rem;
    font-family: DINAlternate-Bold;
    font-size: .24rem;
    color: #fe3d36;
    line-height: .24rem;
  }

  ul.proList li .itPrice span {
    font-size: .2rem;
  }

  ul.proList li .itShopName {
    color: #999;
    font-size: .24rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: none;
  }

  ul.proList li .shareIcon {
    background-image: linear-gradient(-77deg, #fb6455 14%, #fe3d36 100%);
    width: .48rem;
    height: .48rem;
    border-radius: 100%;
    position: absolute;
    right: .1rem;
    bottom: 0;
  }

</style>
<style>
  .container {
    max-width: 100% !important;
  }

</style>
