<template>
  <div id="staff_manage">
    <ywBar :title="'员工管理'" :isClick="canClick" :operateTxt="'新增'" :operateFuc="toStaffAdd" type="white"></ywBar>
    <div class="content">
      <ul>
        <!-- <template v-for="(item,index) in addressList"> -->
          <li class="my_staff" @click="toLook('1')">
            <div class="single_staff">
              <p class="one_line">萝北</p>
              <p class="one_line margin_top">15657193590 | 商家主管</p>
            </div>
          </li>
          <li class="my_staff"  @click="toLook('2')">
            <div class="single_staff">
              <p class="one_line">萝北</p>
              <p class="one_line margin_top">15657193590 | 商家主m管15657193590 | 商家主m管15657193590 | 商家主m管15657193590 | 商家主m管15657193590 | 商家主m管</p>
            </div>
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
      //去查看员工信息
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
  #staff_manage {
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

  .my_staff {
    width: 100%;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Farrow_right_gray.png') no-repeat right center/0.12rem;
    display: flex;
    align-items: center;
    height: 1.7rem;
    border-bottom: 1px solid #f5f6f6;
  }
    .my_staff:last-child{
    border: none;
  }
  .single_staff{
    width: 100%;
    min-height: 1rem;
    padding-left: 1.47rem;
    padding-right: 0.3rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Ficon_radio.png') no-repeat center left/1rem 1rem;
  }

  .one_line{
     white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }

  .margin_top{
    margin-top: 0.2rem;
  }

</style>
