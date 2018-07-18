<template>
  <div id="test1">
    <router-link to="/test2" tag="p">下一页</router-link>
    <div style="height:500px"></div>
    <router-link :to="{path:'/test2', query:{id:1}}" tag="p">下一页</router-link>
  </div>
</template>

<script>
  import {
    liunst
  } from '../api/api'
  export default {
    data() {
      return {}
    },
    components: {},
    computed: {},
    watch: {},
    created() {

    },
    methods: {
      requireda(data) {
        liunst(JSON.stringify(data)).then(res => {

        })
      }
    },
    mounted: function () {
      this.requireda({
        "pagecnt": 5,
        "pageno": 1,
        "tags": ["隐居"]
      });
    },
    updated() {
      this.$nextTick(function () {
        let position = this.$store.state.position //返回页面取出来
        window.scroll(0, position);
      })
    }
  }

</script>

<style scoped>
  p {
    text-align: center;
    color: #fff;
  }

  #test1 {
    background: url("../assets/20120606175552_YGMsQ.thumb.700_0.jpeg");
    background-size: 100% 100%;
    width: 80%;
    height: 300%;
  }

</style>
