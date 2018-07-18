<template>
  <div id="test2">
    <a href="javascript:history.back()">上一页</a>
    <div style="height:500px"></div>
    <router-link to="/" tag="p">上一页</router-link>
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
    activated: function () {
      this.requireda({
        "pagecnt": 5,
        "pageno": 2,
        "tags": ["隐居"]
      });
    },
    mounted: function () {

    }
  }

</script>

<style scoped>
  p {
    text-align: center;
    color: #fff;
  }

  #test2 {
    background: url("../assets/timg.jpg");
    background-size: 100% 100%;
    width: 100%;
    height: 300%;
  }

</style>
