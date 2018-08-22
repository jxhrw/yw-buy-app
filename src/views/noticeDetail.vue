<template>
  <div id="noticeDetail">
    <ywBar :title="'详情'"></ywBar>
    <div class="content">
      <h1>{{info.title}}</h1>
      <div class="txt" v-html="info.content">{{info.content}}</div>
    </div>
  </div>
</template>

<script>
  import {
    queryAfficheDetail
  } from '../api/api'
  export default {
    data() {
      return {
        info: {}, //页面信息
      }
    },
    methods: {
      detailInfo(data) {
        queryAfficheDetail(data).then(res => {
          let $this = this;
          this.ajaxResult(res, function () {
            $this.info = res.data.body;
          });
        }).catch((err) => {
          this.axiosCatch(err);
        });
      },
      initData() {
        this.info = {};
      }
    },
    mounted() {

    },
    activated() {
      this.initData();
      let afficheId = this.$route.query.id;
      this.detailInfo({
        'afficheId': afficheId
      });
    },
  };

</script>

<style scoped>
  #noticeDetail {
    background: #fafafa;
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding-top: 1.5rem;
    padding-bottom: .3rem;
    padding: 1.2rem 0.62rem 0.5rem 0.62rem;
  }

  .content h1 {
    font-family: PingFangSC-Regular;
    font-size: .28rem;
    color: #333333;
    margin: 0;
    line-height: .4rem;
    font-weight: normal;
    padding-bottom: .15rem;
  }

  .content .txt {
    font-family: PingFangSC-Regular;
    font-size: .28rem;
    color: #999999;
    line-height: .38rem;
    /* text-align: justify; */
  }

</style>
<style>
  #noticeDetail img {
    height: auto !important;
    max-width: 100% !important;
  }
</style>
