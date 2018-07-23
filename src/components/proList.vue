<template>
  <ul class="proList">
    <template v-for="(item,index) in items">
      <li :key="index" @click="jumpHref(item.id)">
        <div class="imgDiv" :style="{ 'background-image': 'url('+item.image+')'}"></div>
        <div>
          <p class="itName">{{item.name}}</p>
          <p class="itPrice">￥{{item.retailPriceShow}}</p>
          <p class="itShopName">{{item.shopCnName}}</p>
        </div>
      </li>
    </template>

  </ul>
</template>
<script>
  export default {
    props: {
      items: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    methods: {
      jumpHref(id) {
        this.$router.push({
          path: '/shopDetail',
          query: {
            id: id
          }
        });
      }
    }
  }

</script>
<style scoped>
  ul.proList {
    list-style: none;
    padding: 0 0.3rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  ul.proList li {
    width: 48%;
    padding-top: .16rem;
  }

  ul.proList li .imgDiv {
    height: 4rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  ul.proList li .itName {
    font-size: .26rem;
    line-height: .3rem;
    height: .6rem;
    color: #000;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  ul.proList li .itPrice {
    color: #fb8400;
    font-size: .24rem;
  }

  ul.proList li .itShopName {
    color: #999;
    font-size: .24rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

</style>
