<template>
  <div id="staff_manage">
    <ywBar :title="'员工管理'" :operateTxt="'新增'" :operateFuc="toStaffAdd" type="white"></ywBar>
    <div class="content" ref="bodyhtml">
      <div class="body" id="body_content">
        <ul>
          <template v-for="(item,index) in staffList">
            <li class="my_staff" :key="index" @click="toLook(item.id)">
              <div class="single_staff">
                <p class="one_line">{{item.userInfoVO.nickname || item.username}}</p>
                <p class="one_line margin_top">
                  <span v-if="item.userVO.mobile">{{item.userVO.mobile}} | </span>{{item.roleShow}}</p>
              </div>
            </li>
          </template>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
  import {
    shopUserQueryPage,
  } from '../api/api'
  export default {
    data() {
      return {
        staffList: [], //员工列表
        isLoading: false, //是否正在请求中
        pageInfo: {}, //页码，条数信息
        listData: {
          index: 1,
          pageSize: 10,
        }, //列表请求参数
      }
    },
    methods: {
      //分页查询员工列表
      getShopUserList(data) {
        shopUserQueryPage(data).then(res => {
          let $this = this;
          this.isLoading = true;
          this.ajaxResult(res, function () {
            $this.isLoading = false;
            $this.staffList = res.data.body.items;
            $this.pageInfo = res.data.body;
          });
        }).catch((err) => {
          this.axiosCatch(err, "on");
        });
      },
      //去新增员工
      toStaffAdd() {
        this.$router.push({
          path: '/staffAdd',
        });
      },
      //去查看员工信息
      toLook(id) {
        this.$router.push({
          path: '/staffInfo',
          query: {
            'id': id
          }
        });
      },
      //页面滚动事件
      handleScroll() {
        let scrollTop = this.$refs.bodyhtml.scrollTop;
        let bodyHeight = document.getElementById("body_content")
          .clientHeight;
        let windowHeight = document.getElementById("staff_manage").clientHeight;

        //滚动到底部加载
        if (scrollTop + windowHeight > bodyHeight - 5 && !this.isLoading) {
          this.load();
        }
        //保留离开的位置
        //sessionStorage.setItem("shopOnlineScrollTop", scrollTop);
      },
      //下拉加载
      load() {
        if (this.listData.index < parseInt(this.pageInfo.pages)) {
          this.listData.index += 1;
          this.getShopUserList(this.listData);
        }
      },
      //页面数据初始化
      dataInit() {
        this.staffList = [];
        this.isLoading = false;
        this.pageInfo = {};
        this.listData = {
          index: 1,
          pageSize: 10,
        };
      },
    },
    mounted() {

    },
    activated() {
      this.getShopUserList(this.listData);
      this.$refs.bodyhtml.addEventListener('scroll', this.handleScroll);
    },
  };

</script>

<style scoped>
  #staff_manage {
    background: #FAFAFA;
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0;
    text-align: justify;
    font-size: .28rem;
  }

  .body {
    padding: 1.1rem 0 0.2rem 0;
  }

  ul {
    padding: 0 0.3rem;
    background-color: #fff;
  }

  .my_staff {
    width: 100%;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Farrow_right_gray.png') no-repeat right center/0.12rem;
    display: flex;
    align-items: center;
    height: 1.7rem;
    border-bottom: 1px solid #f5f6f6;
  }

  .my_staff:last-child {
    border: none;
  }

  .single_staff {
    width: 100%;
    min-height: 1rem;
    padding-left: 1.47rem;
    padding-right: 0.3rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_person.png') no-repeat center left/1rem 1rem;
  }

  .one_line {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .margin_top {
    margin-top: 0.2rem;
  }

</style>
