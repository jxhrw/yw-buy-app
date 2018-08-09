<template>
  <div id="notice">
    <ywBar :title="title" :isFinish="true"></ywBar>
    <div class="content" ref="contentRef">
      <mu-paper class="demo-loadmore-wrap" id="demo-loadmore-wrap">
        <mu-container ref="container" class="demo-loadmore-content">
          <!-- @refresh="refresh"  -->
          <mu-load-more :refreshing="refreshing" :loading="loading" @load="load">
            <ul class="noticeUl">
              <template v-for="(item,index) in notices">
                <li @click="goDetail(item.id,index)" :key="index">
                  <template v-if="listData.category=='41'">
                    <div class="flex">
                      <h6>询价单通知<span v-if="item.isRead==0">（未读）</span></h6>
                      <span class="time">{{item.pastDateRelease}}</span>
                    </div>
                    <p>询价信息</p>
                    <p>询价用户：{{item.content}}</p>
                    <p>询价时间：{{item.content}}</p>
                    <p>商品名称：{{item.content}}</p>
                  </template>
                  <template v-else-if="listData.category=='51'">
                    <div class="flex">
                      <h6>询价答复单通知<span v-if="item.isRead==0">（未读）</span></h6>
                      <span class="time">{{item.pastDateRelease}}</span>
                    </div>
                    <p>报价信息</p>
                    <p>商品名称：{{item.desc}}</p>
                    <p>商品名称：{{item.desc}}</p>
                    <p>商品名称：{{item.desc}}</p>
                  </template>
                  <template v-else>
                    <div class="flex">
                      <h6>{{item.title}}<span v-if="item.isRead==0">（未读）</span></h6>
                      <span class="time">{{item.pastDateRelease}}</span>
                    </div>
                    <div class="p" v-html="item.briefIntro">{{item.briefIntro}}</div>
                    <div class="image" v-if="item.imageUrl" :style="{'background-image':'url('+item.imageUrl+')'}"></div>
                  </template>
                </li>
              </template>
            </ul>
          </mu-load-more>
        </mu-container>
      </mu-paper>
    </div>

  </div>

</template>
<script>
  import {
    queryAffichePage
  } from '../api/api'
  export default {
    data() {
      return {
        title: '', //页面标题
        notices: [], //消息列表
        listData: {
          category: 1, //公告分类：1-系统消息，2-交易动态，3-活动通知，4-询价，5-报价
          index: 1,
          pageSize: 100
        }, //请求
        isLoading: false, //是否正在请求中
        refreshing: false, //下拉loading
        loading: false, //底部loading
        pageInfo: {}, //分页信息
        fewTimes: 0, //页面第几次进入，刷新或第一次会在mounted里重置,其余次数获取scrollTop使页面回到离开位置
      }
    },
    methods: {
      requireda(data) {
        this.isLoading = true;
        // this.requesting = true;
        queryAffichePage(data).then(res => {
          let $this = this;
          this.ajaxResult(res, function () {
            $this.isLoading = false;
            $this.refreshing = false;
            $this.loading = false;
            $this.notices = res.data.body.items;
            $this.pageInfo = {
              'pageNum': res.data.body.pageNum,
              'pages': res.data.body.pages
            }
            if ($this.pageInfo.pageNum >= $this.pageInfo.pages) {
              document.getElementsByClassName("mu-infinite-scroll-text")[0].innerText = "没有更多了~";
              setTimeout(function () {
                document.getElementsByClassName("mu-infinite-scroll-text")[0].style.display = "block";
              });
            } else {
              document.getElementsByClassName("mu-infinite-scroll-text")[0].innerText = "正在加载...";
            }
          });
        }).catch((err)=>{
          this.toast(`HTTP ${err.response.status}`);
        });
      },
      goDetail(id,index) {
        this.notices[index].isRead = 1;//已读
        this.$router.push({
          path: '/noticeDetail',
          query: {
            id: id
          }
        });
      },
      //下拉加载
      load() {
        if (this.listData.index < parseInt(this.pageInfo.pages)) {
          this.loading = true;
          this.listData.index += 1;
          this.requireda(this.listData);
        }
      },
      //页面滚动事件
      handleScroll() {
        let scrollTop = this.$refs.bodyhtml.scrollTop;
        let bodyHeight = document.getElementById("demo-loadmore-wrap")
          .clientHeight;
        let windowHeight = document.getElementById("notice").clientHeight;
        //滚动到底部加载
        if (scrollTop + windowHeight > bodyHeight - 5 && !this.isLoading) {
          this.load();
        }
        //保留离开的位置
        sessionStorage.setItem("noticeScrollTop", scrollTop);
      },
    },
    mounted: function () {

    },
    activated() {
      this.fewTimes++;
      if (!this.$route.meta.isBack || this.fewTimes <= 1) {
        //数据初始化
        this.title = '';
        this.notices = [];
        this.listData = {
          category: 1,
          index: 1,
          pageSize: 100
        };

        this.listData.category = this.$route.query.id || "1";
        if (this.listData.category == "5") {
          this.title = '报价消息';
        } else if (this.listData.category == "4") {
          this.title = '询价消息';
        } else if (this.listData.category == "3") {
          this.title = '活动通知';
        } else if (this.listData.category == "2") {
          this.title = '交易动态';
        } else {
          this.title = '系统消息';
        }
        this.requireda(this.listData);
        this.$refs.contentRef.addEventListener('scroll', this.handleScroll);
        this.$refs.contentRef.scrollTop = 0;
      } else {
        if (this.fewTimes > 1) {
          this.$refs.contentRef.scrollTop = sessionStorage.getItem("noticeScrollTop");
        }
      }



    },
  }

</script>
<style scoped>
  #notice {
    height: 100%;
  }

  .mu-paper {
    background: #fafafa;
    padding-top: .9rem;
  }

  .content {
    overflow: auto;
    height: 100%;
    -webkit-overflow-scrolling: touch;
  }

  .noticeUl {
    padding: 0.2rem 0.3rem 0 0.3rem;
    list-style: none;
  }

  .noticeUl li {
    font-family: PingFangSC-Regular;
    margin-bottom: .2rem;
    padding: 0.35rem 0.34rem;
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
    border-radius: .06rem;
  }

  .noticeUl .flex {
    display: flex;
    justify-content: space-between;
    line-height: .3rem;
    padding-bottom: .15rem;
  }

  .noticeUl h6 {
    font-weight: normal;
    flex: 1;
    font-size: .28rem;
    color: #333333;

  }

  .noticeUl .time {
    margin: 0 0.15rem;
    font-size: .24rem;
    color: #999999;
  }

  .noticeUl p,.noticeUl .p {
    line-height: .38rem;
    font-size: .28rem;
    color: #999999;
  }

  .noticeUl .image {
    margin-top: .15rem;
    height: 2.28rem;
    background: url('') no-repeat center/cover;
  }

</style>
<style>
  #notice .mu-refresh-control {
    /* margin-top: 1rem; */
  }

  #notice .mu-refresh-control-hide {
    /* transform:translate3d(0,-1.8rem,0)!important; */
  }

  #notice .mu-infinite-scroll {
    background-color: #fafafa;
    height: .6rem;
    padding: .2rem 0 0.1rem 0;
  }

  #notice .mu-circle-wrapper {
    width: .24rem !important;
    height: .24rem !important;
  }

  #notice .mu-infinite-scroll-text {
    font-size: .24rem;
    color: #999;
  }

</style>
