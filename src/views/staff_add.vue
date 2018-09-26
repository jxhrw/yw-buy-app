<template>
  <div id="staff_add">
    <ywBar :title="'基础信息'" type="white" :backFuc="sureBack" :hasBackFuc="true"></ywBar>
    <div class="content">
      <ul class="myInfo" v-if='loadingFinish'>
        <li>
          <input type="text" placeholder="昵称" v-model="staffInfo.nickName" v-on:input="changeFuc" maxlength="40">
        </li>
        <li>
          <p class="on" @click="popupShow=!popupShow" v-if="staffInfo.job[0]">{{staffInfo.job[0]}}</p>
          <p v-else @click="openAndChoose">职务</p>
        </li>
        <li>
          <input type="text" placeholder="手机号" v-model="staffInfo.mobile" v-on:input="changeFuc">
        </li>
        <li v-if="pageUrl == 'staffAdd'">
          <input type="text" placeholder="密码" v-model="staffInfo.password" v-on:input="changeFuc">
        </li>
        <li v-if="pageUrl == 'staffAdd'">
          <input type="text" placeholder="确认密码" v-model="staffInfo.passwordAgain" v-on:input="changeFuc">
        </li>
      </ul>
      <ywBtn :text="pageUrl == 'staffAdd'?'确认新增':'保存'" :class="['addSure',canClick?'':'no']" @click.native="addSureFuc"></ywBtn>
    </div>

    <div class="popupBox" v-if="popupShow" @click="popupShow=!popupShow">
      <footer class="flexEnd" @click="stop">
        <mu-icon value="clear" class="iconBtn" @click="popupShow=!popupShow"></mu-icon>
        <h3>选择职务</h3>
        <div class="demo-picker-container">
          <mu-slide-picker :slots="allListSlots" :visible-item-count="7" @change="selectChange" :values="staffInfo.job"></mu-slide-picker>
        </div>
      </footer>
    </div>

  </div>
</template>

<script>
  import {
    loadShopUser,
    addOrModifyShopUser,
    shopUserJobs
  } from '../api/api'
  export default {
    data() {
      return {
        isChange: false, //是否修改
        canClick: true, //按钮是否可点击
        popupShow: false, //弹窗是否显示
        pageUrl: '', //页面地址
        loadingFinish: false, //数据请求完成
        staffInfo: { //员工信息
          nickName: '',
          job: [],
          mobile: '',
          password: '',
          passwordAgain: '',
        },
        allListCode: [], //所有allListSlots.values对应的code
        //多选的列表值
        allListSlots: [{
          width: '100%',
          textAlign: 'center',
          values: []
        }],
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
            $this.staffInfo.nickName = res.data.body.userInfoVO.nickname || '';
            $this.staffInfo.job = [res.data.body.roleShow || ''];
            $this.staffInfo.mobile = res.data.body.userVO.mobile || '';
          });
        }).catch((err) => {
          this.axiosCatch(err);
        });
      },
      //职务列表
      getRoleList(data) {
        if (this.pageUrl == 'staffAdd') {
          this.loadingFinish = true;
        } else {
          this.getShopUser({
            'id': this.$route.query.id
          });
        }
        shopUserJobs(data).then(res => {
          this.allListCode = [];
          // this.allListSlots[0].values = [];
          let $this = this;
          let arr = [];
          res.data.body.forEach(function (c) {
            $this.allListCode.push(c.code);
            arr.push(c.name);
          });
          $this.allListSlots[0].values = arr;
        }).catch((err) => {
          this.axiosCatch(err);
        });
      },
      //是否修改
      changeFuc() {
        this.isChange = true;
      },
      //打开地址选择，默认选中第一个
      openAndChoose() {
        this.popupShow = !this.popupShow;
        let value = this.allListSlots[0].values[0];
        this.staffInfo.job = this.staffInfo.job.length >= 1 ? this.staffInfo.job : [value];
      },
      //改变选中后触发
      selectChange(value, index) {
        this.changeFuc();
        switch (index) {
          case 0:
            this.staffInfo.job = [value];
            break;
        }
      },
      //新增/修改员工信息
      addSureFuc() {
        if ((this.pageUrl == 'staffAdd' && (!this.staffInfo.nickName || !this.staffInfo.job[0] || !this.staffInfo.mobile ||
            !this.staffInfo.password || !
            this.staffInfo.passwordAgain)) || (this.pageUrl == 'staffEdit' && (!this.staffInfo.nickName || !this.staffInfo
            .job[0] || !this.staffInfo.mobile))) {
          this.$alert({
            title: '',
            content: '信息不完整',
            btnText: '',
          });
          return false;
        }
        if (this.staffInfo.nickName.length>40) {
          this.$alert({
            title: '',
            content: '昵称过长',
            btnText: '',
          });
          return false;
        }
        let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!myreg.test(this.staffInfo.mobile)) {
          this.$alert({
            title: '',
            content: '手机号格式有误',
            btnText: '',
          });
          return false;
        }
        if (this.staffInfo.password != this.staffInfo.passwordAgain) {
          this.$alert({
            title: '',
            content: '密码不一致',
            btnText: '',
          });
          return false;
        }
        let obj = {};
        obj.nickName = this.staffInfo.nickName;
        obj.role = this.allListCode[this.allListSlots[0].values.indexOf(this.staffInfo.job[0])];
        obj.mobile = this.staffInfo.mobile;
        if (this.pageUrl == 'staffAdd') {
          obj.password = this.staffInfo.password;
          obj.passwordAgain = this.staffInfo.passwordAgain;
        } else {
          obj.id = this.$route.query.id;
        }
        // console.log(obj);
        this.canClick = false;
        addOrModifyShopUser(obj).then(res => {
          let $this = this;
          this.canClick = true;
          this.ajaxResult(res, function () {
            window.history.back();
          });
        }).catch((err) => {
          this.canClick = true;
          this.axiosCatch(err);
        });
      },
      //阻止冒泡
      stop(event) {
        event.stopPropagation();
      },
      //数据初始化
      dataInit() {
        this.isChange = false; //是否修改
        this.canClick = true; //按钮是否可点击
        this.popupShow = false; //弹窗是否显示
        this.loadingFinish = false;
        this.staffInfo = { //员工信息
          nickName: '',
          job: [],
          mobile: '',
          password: '',
          passwordAgain: '',
        };
      },
      //返回执行
      sureBack() {
        if (this.isChange) {
          this.$confirm({
            title: '',
            content: '退出后将丢失您当前编辑的信息，是否退出？',
            yesText: "退出",
            noText: '取消'
          }).then(res => {
            this.toBack();
          }).catch(err => {});
        } else {
          this.toBack();
        }
      },
      //返回
      toBack() {
        let device = this.whichDevice();
        let index = JSON.parse(window.sessionStorage.getItem("pageIndex"));
        //from是上一页，to是当前页
        if ((index.to == null && index.from == null) || (index.to == 1 && index.from > index.to)) {
          if (device == "androidApp") {
            window.Android.finish();
          } else if (device == "iosApp") {
            //ActionName：原生中对应的方法名；parameter：回传的参数
            // window.webkit.messageHandlers.ActionName.postMessage('parameter');
            window.webkit.messageHandlers.finish.postMessage('');
          } else {
            window.history.back();
          }
        } else {
          window.history.back();
        }
      },
    },
    mounted() {

    },
    activated() {
      let thisPageUrl = window.location.href;
      if (thisPageUrl.indexOf('staffAdd') > -1) {
        this.pageUrl = 'staffAdd';
      } else if (thisPageUrl.indexOf('staffEdit') > -1) {
        this.pageUrl = 'staffEdit';
      }
      this.dataInit();
      this.getRoleList();
    },
  };

</script>

<style scoped>
  #staff_add {
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

  ul {
    padding: 0 0.3rem;
    background-color: #fff;
  }

  .myInfo {
    list-style: none;
    background: #ffffff;
    padding: 0 0.3rem;
  }

  .myInfo li {
    border-bottom: 1px solid #f5f6f6;
  }

  .myInfo li input {
    height: 0.9rem;
    width: 100%;
    font-size: 0.28rem;
    border: none;
    outline: none;
    color: #000;
    padding: 0;
  }

  .myInfo li p {
    height: 0.9rem;
    line-height: 0.9rem;
    padding-right: 0.5rem;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/arrow_right_gray.png') no-repeat center right/.12rem;
  }

  .myInfo li p.on {
    color: #000;
  }

  input::-webkit-input-placeholder {
    color: #999999;
    opacity: 1;
  }


  .addSure {
    width: 6.90rem;
    height: .80rem;
    background: linear-gradient(32deg, rgba(251, 104, 89, 1) 0%, rgba(254, 61, 54, 1) 100%);
    border-radius: .44rem;
    color: #ffffff;
    margin: auto;
    margin-top: 1.2rem;
  }
  .addSure.no{
    pointer-events: none;
    opacity: 0.2;
  }

  /* 弹窗 */

  .popupBox {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: flex-end;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }

  .flexEnd {
    width: 100%;
    background: #ffffff;
    text-align: center;
    position: relative;
  }

  .flexEnd h3 {
    font-weight: normal;
    padding: 0.2rem;
  }

  .flexEnd .iconBtn {
    position: absolute;
    top: 0.14rem;
    right: 0.2rem;
    font-size: 0.6rem;
  }

</style>
<style>
  #staff_add .mu-slide-picker-item {
    font-size: .24rem;
  }

  #staff_add .mu-slide-picker-item.selected {
    font-size: .28rem;
  }

  .demo-picker-container {
    width: 100%;

  }

</style>
