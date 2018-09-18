<template>
  <div id="finance_manage">
    <ywBar :title="'财务管理'" :operateTxt="'明细'" :operateFuc="toStaffAdd" type="white"></ywBar>
    <div class="content">
      <div class="conTop"></div>
      <ul class="financeList">
        <!-- <template v-for="(item,index) in addressList"> -->
          <li @click="toLook('1')">
            <p>转出到</p>
          </li>
          <li @click="toLook('2')">
            <p>我的银行卡</p>
          </li>
        <!-- </template> -->

      </ul>
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
        canClick: true, //按钮是否可点击
        staffList: [], //员工列表
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
            }else{
              sessionStorage.setItem("addressId", '');
            }
          });
        }).catch((err) => {
          this.axiosCatch(err);
        });
      },
      //去新增员工
      toStaffAdd() {
        this.$router.push({
          path: '/staffAdd',
        });
      },
      //去查看明细
      toLook(id){
        this.$router.push({
          path: '/staffInfo',
          query:{'id':id}
        });
      }
    },
    mounted() {

    },
    activated() {
      // this.getAddressInfo();
    },
  };

</script>

<style scoped>
  #finance_manage {
    background: #FAFAFA;
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0.9rem 0 0.2rem 0;
    text-align: justify;
    font-size: .28rem;
  }

  .conTop{
    width:100%;
height:3.60rem;
background:linear-gradient(32deg,rgba(251,104,89,1) 0%,rgba(254,61,54,1) 100%);
  }


   ul.financeList {
    list-style: none;
    background: #ffffff;
    padding: 0;
  }

  .financeList li {
      padding: 0 0.3rem;
    border-bottom: 1px solid #f5f6f6;
  }

  .financeList li p {
    line-height: 0.4rem;
    padding: 0.25rem 0;
    color: #000000;
    word-wrap: break-word;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/arrow_right_gray.png') no-repeat center right/.12rem;
  }

</style>
