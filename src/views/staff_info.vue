<template>
  <div id="staff_info">
    <ywBar :title="'员工信息'" type="white"></ywBar>
    <footer>
      <div class="shadow"></div>
      <div class="btnBox">
        <ywBtn :text="userEnable=='1'?'禁用':'启用'" :class="['btn_footer_staff', canClick?'':'no']" @click.native="enableFuc"></ywBtn>
        <!-- <ywBtn text="删除" class="btn_footer_staff" @click.native="deleteFuc"></ywBtn> -->
        <ywBtn text="编辑" :class="['btn_footer_staff', canClick?'':'no']" @click.native="editFuc"></ywBtn>
      </div>
    </footer>
    <div class="content">
      <ul class="myInfo" v-if='loadingFinish'>
        <li>
          <p>{{staffInfo.nickName}}</p>
        </li>
        <li>
          <p>{{staffInfo.job}}</p>
        </li>
        <li>
          <p>{{staffInfo.mobile}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    loadShopUser,
    startOrStopUse
  } from '../api/api'
  export default {
    data() {
      return {
        canClick: true, //按钮是否可点击
        userEnable:'1',//0禁用，1启用
        staffInfo: { //员工信息
          nickName: '',
          job: '',
          mobile: '',
        },
        loadingFinish: false, //数据请求完成
      }
    },
    methods: {
      //查询店铺员工
      getShopUser(data) {
        this.loadingFinish = false;
        loadShopUser(data).then(res => {
          let $this = this;
          this.loadingFinish = true;
          this.ajaxResult(res, function () {
            $this.staffInfo.nickName = res.data.body.userInfoVO.nickname || '—';
            $this.staffInfo.job = res.data.body.roleShow || '—';
            $this.staffInfo.mobile = res.data.body.userInfoVO.phone || '—';
            $this.userEnable = res.data.body.userVO.userEnable;
          });
        }).catch((err) => {
          this.axiosCatch(err);
        });
      },
      //是否修改
      changeFuc() {
        this.isChange = true;
      },
      //启用
      enableFuc() {
        let isUserEnable = this.userEnable=='1'?'0':'1';
        let obj = {'id':this.$route.query.id,'userEnable':isUserEnable}
        this.canClick = false;
        startOrStopUse(obj).then(res => {
          let $this = this;
          $this.canClick = true;
          this.ajaxResult(res, function () {
             $this.userEnable = isUserEnable;
          });
        }).catch((err) => {
          this.canClick = true;
          this.axiosCatch(err);
        });
      },
      //删除
      deleteFuc() {
        // this.isChange = true;
      },
      //编辑
      editFuc() {
        this.$router.push({
          path: '/staffEdit',
          query: {
            'id': this.$route.query.id
          }
        });
      },
      //页面数据初始化
      dataInit() {
        this.canClick = true;
        this.userEnable = '1';
        this.staffInfo = {
          nickName: '',
          job: '',
          mobile: '',
        };
        this.loadingFinish = false;
      },
    },
    mounted() {

    },
    activated() {
      this.dataInit();
      this.getShopUser({
        'id': this.$route.query.id
      });
    },
  };

</script>

<style scoped>
  #staff_info {
    background: #FAFAFA;
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 1.1rem 0 0.2rem 0;
    text-align: justify;
    font-size: .28rem;
  }

  ul.myInfo {
    list-style: none;
    background: #ffffff;
    padding: 0 0.3rem;
  }

  .myInfo li {
    border-bottom: 1px solid #f5f6f6;
  }

  .myInfo li p {
    line-height: 0.4rem;
    padding: 0.25rem 0;
    color: #000000;
    word-wrap: break-word;
  }


  /* 底部 */

  footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: 15;
  }

  footer .shadow {
    opacity: .25;
    background-image: linear-gradient(-180deg, hsla(0, 0%, 93%, 0) 11%, hsla(0, 0%, 71%, .96));
    height: .31rem;
  }

  footer .btnBox {
    height: 1rem;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn_footer_staff {
    width: 1.40rem;
    height: .60rem;
    border-radius: 1rem;
    border: 1px solid rgba(51, 51, 51, 1);
    color: rgba(51, 51, 51, 1);
    margin-right: 0.2rem;
  }

  .btn_footer_staff:last-child {
    margin-right: 0;
  }

  .btn_footer_staff.no {
    pointer-events: none;
    opacity: 0.2;
  }

</style>
