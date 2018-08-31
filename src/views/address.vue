<template>
  <div id="address">
    <ywBar :title="'选择收货地址'" type="white"></ywBar>
    <footer>
      <ywBtn text="+ 添加收件地址" class="btn_add_address" @click.native="editAddress()"></ywBtn>
    </footer>
    <div class="content">
      <ul>
        <template v-for="(item,index) in addressList">
          <li :key="index" class="my_address">
            <div class="addressDetail" @click="selectPost(item.id)">
              <div class="address_name_mobile">
                <p class="address_name">{{suolve(item.person,13)}}
                  <span v-if="item.deft == '1'">默认</span>
                </p>
                <p class="address_mobile">{{item.phone}}</p>
              </div>
              <div class="address_location">{{item.provinceName}}{{item.cityName}}{{item.countryName}}{{item.address}}</div>
            </div>
            <div class="address_edit" @click="editAddress(item.id)"></div>
          </li>
        </template>

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
        addressList: [], //地址列表
        loadingFinish: false, //数据请求完成
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
      //截取字符串，汉字占2字符
      suolve(str, sub_length) {
        if (str == "" || str == null)
          return "";
        let temp1 = str.replace(/[^\x00-\xff]/g, "**"); //精髓   
        let temp2 = temp1.substring(0, sub_length);
        //找出有多少个*   
        let x_length = temp2.split("\*").length - 1;
        let hanzi_num = x_length / 2;
        sub_length = sub_length - hanzi_num; //实际需要sub的长度是总长度-汉字长度   
        let res = str.substring(0, sub_length);
        let end = '';
        if (sub_length < str.length) {
          end = res + "…";
        } else {
          end = res;
        }
        return end;
      },
      //选中新的收货地址
      selectPost(id) {
        sessionStorage.setItem("addressId", id);
        window.history.back();
      },
      //去编辑地址
      editAddress(id) {
        this.$router.push({
          path: '/arsChange',
          query: {
            'id': id
          }
        });
      }
    },
    mounted() {

    },
    activated() {
      this.getAddressInfo();
    },
  };

</script>

<style scoped>
  #address {
    background: #FAFAFA;
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 1.1rem 0.3rem 1rem 0.3rem;
    text-align: justify;
    font-size: .28rem;
  }

  ul {
    padding: 0;
  }

  .my_address {
    width: 100%;
    background: #ffffff url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/bottomLine.png') no-repeat bottom center/100%;
    box-shadow: 0rem 0.02rem 0.12rem 0rem rgba(0, 0, 0, 0.08);
    border-radius: 0.06rem;
    margin-bottom: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem;
  }

  .btn_add_address {
    width: 100%;
    height: 1rem;
    background: linear-gradient(45deg, rgba(251, 100, 85, 1) 0%, rgba(254, 61, 54, 1) 100%);
    font-size: 0.28rem;
    font-weight: normal;
    color: #ffffff;
  }

  .address_edit {
    width: 15%;
    height: 1rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_edit.png') no-repeat center right/0.4rem;
  }

  .addressDetail {
    width: 80%;
  }

  .address_name span {
    color: #EA3C3C;
    display: inline-block;
    margin-left: .2rem;
    font-size: .22rem;
    line-height: .22rem;
    padding: 0.02rem 0.04rem;
    border-radius: .04rem;
    border: 1px solid #EA3C3C;
  }

  .address_name_mobile {
    display: flex;
    justify-content: space-between;
    font-size: .28rem;
    color: #333333;
  }

  .address_location {
    font-size: .26rem;
    color: #999999;
    min-height: .7rem;
    line-height: 0.35rem;
    margin-top: 0.15rem;
    word-wrap: break-word;
    margin-bottom: -0.05rem;
  }

  footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: 15;
  }

</style>
