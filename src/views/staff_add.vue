<template>
  <div id="staff_add">
    <ywBar :title="'基础信息'" type="white"></ywBar>
    <div class="content">
      <ul class="myInfo">
        <li>
          <input type="text" placeholder="昵称" v-model="staffInfo.nickName" v-on:input="changeFuc">
        </li>
        <li>
          <p class="on" @click="popupShow=!popupShow" v-if="staffInfo.job[0]">{{staffInfo.job[0]}}</p>
          <p v-else @click="openAndChoose">职务</p>
        </li>
        <li>
          <input type="text" placeholder="手机号" v-model="staffInfo.mobile" v-on:input="changeFuc">
        </li>
        <li>
          <input type="text" placeholder="密码" v-model="staffInfo.password" v-on:input="changeFuc">
        </li>
        <li>
          <input type="text" placeholder="确认密码" v-model="staffInfo.passwordAgain" v-on:input="changeFuc">
        </li>
      </ul>
      <ywBtn text="确认新增" class="addSure" @click.native="addSureFuc"></ywBtn>
    </div>

    <div class="popupBox" v-show="popupShow" @click="popupShow=!popupShow">
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
    listReceiverAddress,
  } from '../api/api'
  export default {
    data() {
      return {
        isChange: false, //是否修改
        canClick: true, //按钮是否可点击
        popupShow: false, //弹窗是否显示
        staffInfo: { //员工信息
          nickName: '',
          job: [],
          mobile: '',
          password: '',
          passwordAgain: '',
        },
        loadingFinish: false, //数据请求完成
        sendList: [{
            code: '1',
            name: '店员'
          },
          {
            code: '2',
            name: '店涨'
          },
        ],
        //多选的列表值
        allListSlots: [{
          width: '100%',
          textAlign: 'center',
          values: ['店员', '店涨']
        }],
      }
    },
    methods: {
      //地址信息
      getAddressInfo() {
        listReceiverAddress().then(res => {
          let $this = this;
          this.ajaxResult(res, function () {
            $this.addressList = res.data.body;
            if (res.data.body.length == 1) {
              sessionStorage.setItem("addressId", res.data.body[0].id);
            } else {
              sessionStorage.setItem("addressId", '');
            }
          });
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
        this.staffInfo.job = [value];
      },
      //改变选中后触发
      selectChange(value, index) {
        this.changeFuc();
        switch (index) {
          case 0:
            // this.staffInfo.job[0] = value;
            this.staffInfo.job = [value];
            break;
        }
      },
      //新增员工
      addSureFuc(){
          window.history.back();
      },
      //阻止冒泡
      stop(event) {
        event.stopPropagation();
      },
    },
    mounted() {

    },
    activated() {
      //   this.getAddressInfo();
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
