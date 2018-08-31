<template>
  <div id="address">
    <ywBar :title="'编辑收货地址'" :operateTxt="'保存'" :isClick="canClick" :operateFuc="holdAddress" type="white"></ywBar>
    <div class="content" v-show="loadingFinish">
      <ul class="myInfo">
        <li>
          <input type="text" placeholder="收货人" v-model="addressMy.receiver">
        </li>
        <li>
          <input type="text" placeholder="联系电话" v-model="addressMy.phone">
        </li>
        <li>
          <p class="on" @click="popupShow=!popupShow" v-if="!isInit && (addressMy.provinceShow || addressMy.cityShow ||addressMy.countryShow)">{{addressMy.provinceShow}} {{addressMy.cityShow}} {{addressMy.countryShow}}</p>
          <p v-else @click="openAndChoose">所在地区</p>
        </li>
        <li>
          <input type="text" placeholder="详细地址" v-model="addressMy.address">
        </li>
      </ul>
      <div class="isDefault">
        <span>设为默认地址</span>
        <span :class="{'on':addressMy.isDefault=='1'}" class="icon_default" @click="defaultFuc"></span>
      </div>
    </div>

    <div class="popupBox" v-show="popupShow" @click="popupShow=!popupShow">
      <footer class="flexEnd" @click="stop">
        <mu-icon value="clear" class="iconBtn" @click="popupShow=!popupShow"></mu-icon>
        <h3>选择地区</h3>
        <div class="demo-picker-container">
          <mu-slide-picker :slots="addressSlots" :visible-item-count="7" @change="addressChange" :values="addressShow"></mu-slide-picker>
        </div>
      </footer>
    </div>

  </div>
</template>

<script>
  import {
    loadReceiverAddress,
    queryDic,
    addReceiverAddress,
    editReceiverAddress
  } from '../api/api'
  export default {
    data() {
      return {
        isInit: true, //是否新增
        canClick: true, //按钮是否可点击
        popupShow: false, //弹窗是否显示
        loadingFinish: false, //数据请求完成
        addressMy: { //当前地址信息
          id: '', //收货地址id
          province: '', //省
          city: '', //市
          country: '', //区、县
          provinceShow: '',
          cityShow: '',
          countryShow: '',
          address: '', //详细地址
          post: '', //邮编
          receiver: '', //收货人
          phone: '', //收货人电话
          isDefault: '0', //是否设为默认地址：0否，1是
        },
        //多选的列表值
        addressSlots: [{
            width: '100%',
            textAlign: 'center',
            values: []
          },
          {
            width: '100%',
            textAlign: 'center',
            values: []
          }, {
            width: '100%',
            textAlign: 'center',
            values: []
          }
        ],
        //选中的值
        addressShow: [],
        //可选列表
        addressShowList: {
          code: {
            provinceCode: [],
            cityCode: [],
            countryCode: [],
          },
          show: {
            provinceShow: [],
            cityShow: [],
            countryShow: [],
          }
        }
      }
    },
    methods: {
      //地址信息
      getAddressInfo(data) {
        loadReceiverAddress(data).then(res => {
          let $this = this;
          this.loadingFinish = true;
          this.ajaxResult(res, function () {
            $this.addressMy.id = res.data.body.id;
            $this.addressMy.province = res.data.body.province;
            $this.addressMy.city = res.data.body.city;
            $this.addressMy.country = res.data.body.country;
            // $this.addressMy.provinceShow = res.data.body.provinceName;
            // $this.addressMy.cityShow = res.data.body.cityName;
            // $this.addressMy.countryShow = res.data.body.countryName;
            $this.addressMy.address = res.data.body.address;
            $this.addressMy.post = res.data.body.post;
            $this.addressMy.receiver = res.data.body.person;
            $this.addressMy.phone = res.data.body.phone;
            $this.addressMy.isDefault = res.data.body.deft;
            $this.myLevel("area", null, 0);
          });
        }).catch((err) => {
          this.axiosCatch(err);
        });
      },
      //地址保存
      holdAddress() {
        if (!this.addressMy.receiver || !this.addressMy.phone || !this.addressMy.province || !this.addressMy.city || !
          this.addressMy.country || !this.addressMy.address) {
          this.$alert({
            title: '',
            content: '信息不完整',
            btnText: '',
          });
          // this.$confirm({
          //   title: '',
          //   content: '开发商',
          //   yesText: "取消",
          //   noText: '确定'
          // });
          return false;
        }
        let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!myreg.test(this.addressMy.phone)) {
          this.$alert({
            title: '',
            content: '联系电话格式有误',
            btnText: '',
          });
          return false;
        }
        this.canClick = false;
        if (this.$route.query.id) {
          editReceiverAddress(this.addressMy).then(res => {
            let $this = this;
            this.canClick = true;
            this.ajaxResult(res, function () {
              window.history.back();
            });
          }).catch((err) => {
            this.canClick = true;
            this.axiosCatch(err);
          });
        } else {
          addReceiverAddress(this.addressMy).then(res => {
            let $this = this;
            this.canClick = true;
            this.ajaxResult(res, function () {
              window.history.back();
            });
          }).catch((err) => {
            this.canClick = true;
            this.axiosCatch(err);
          });
        }
      },
      //勾选取消默认
      defaultFuc() {
        this.addressMy.isDefault = this.addressMy.isDefault == '0' ? '1' : '0';
      },
      //阻止冒泡
      stop(event) {
        event.stopPropagation();
      },
      //打开地址选择，默认选中第一个
      openAndChoose() {
        this.isInit = false;
        this.popupShow = !this.popupShow;
        this.addressMy.province = this.addressShowList.code.provinceCode[0];
        this.addressMy.provinceShow = this.addressShowList.show.provinceShow[0];
        this.addressMy.city = this.addressShowList.code.cityCode[0];
        this.addressMy.cityShow = this.addressShowList.show.cityShow[0];
        this.addressMy.country = this.addressShowList.code.countryCode[0];
        this.addressMy.countryShow = this.addressShowList.show.countryShow[0];
      },
      //数据初始化
      dataInit() {
        this.isInit = true; //是否新增
        this.canClick = true; //按钮是否可点击
        this.popupShow = false; //弹窗是否显示
        this.loadingFinish = false;
        this.addressMy = { //当前地址信息
          id: '', //收货地址id
          province: '', //省
          city: '', //市
          country: '', //区、县
          provinceShow: '',
          cityShow: '',
          countryShow: '',
          address: '', //详细地址
          post: '', //邮编
          receiver: '', //收货人
          phone: '', //收货人电话
          isDefault: '0', //是否设为默认地址：0否，1是
        };
      },
      //改变选中后触发
      addressChange(value, index) {
        let myCode = '';
        this.isInit = false;
        switch (index) {
          case 0:
            myCode = this.addressShowList.code.provinceCode[this.addressShowList.show.provinceShow.indexOf(value)];
            this.addressMy.province = myCode;
            this.addressMy.provinceShow = value;
            this.addressMy.city = '';
            this.addressMy.cityShow = '';
            this.addressMy.country = '';
            this.addressMy.countryShow = '';
            this.myLevel("area", myCode, 1);
            break
          case 1:
            myCode = this.addressShowList.code.cityCode[this.addressShowList.show.cityShow.indexOf(value)];
            this.addressMy.city = myCode;
            this.addressMy.cityShow = value;
            this.addressMy.country = '';
            this.addressMy.countryShow = '';
            this.myLevel("area", myCode, 2);
            break
          case 2:
            myCode = this.addressShowList.code.countryCode[this.addressShowList.show.countryShow.indexOf(value)];
            this.addressMy.country = myCode;
            this.addressMy.countryShow = value;
            this.addressShow = [this.addressMy.provinceShow, this.addressMy.cityShow, this.addressMy.countryShow];
            break
        }
      },
      //将对象的某个key的value值组成数组
      getObjValues(array, name) {
        let arr = [];
        for (let j in array) {
          if (array[j].code.indexOf("1_") <= -1) { //过滤code有1_的数据
            arr.push(array[j][name]);
          }
        }
        return arr;
      },
      //查询省市区
      myLevel(type, code, index) {
        queryDic({
          'type': type,
          "parent": code
        }).then(res => {
          this.loadingFinish = true;
          if (index == 0) {
            this.addressShowList.code.provinceCode = this.getObjValues(res.data.body, 'code');
            this.addressShowList.show.provinceShow = this.getObjValues(res.data.body, 'name');
            this.addressSlots[0].values = this.addressShowList.show.provinceShow;
            if (this.addressMy.province) {
              let i = this.addressShowList.code.provinceCode.indexOf(this.addressMy.province);
              this.addressMy.provinceShow = this.addressShowList.show.provinceShow[i];
            } else {
              this.addressMy.province = this.addressShowList.code.provinceCode[0];
              this.addressMy.provinceShow = this.addressShowList.show.provinceShow[0];
            }
            this.addressShow = [
              this.addressMy.provinceShow || this.addressShowList.show.provinceShow[0],
              this.addressMy.cityShow || this.addressShowList.show.cityShow[0],
              this.addressMy.countryShow || this.addressShowList.show.countryShow[0]
            ];

            let useCode = this.addressMy.province || this.addressShowList.code.provinceCode[0];
            this.myLevel("area", useCode, 1);
          } else if (index == 1) {
            this.addressShowList.show.cityShow = this.getObjValues(res.data.body, 'name');
            this.addressShowList.code.cityCode = this.getObjValues(res.data.body, 'code');
            this.addressSlots[1].values = this.addressShowList.show.cityShow;
            if (this.addressMy.city) {
              let i = this.addressShowList.code.cityCode.indexOf(this.addressMy.city);
              this.addressMy.cityShow = this.addressShowList.show.cityShow[i];
            } else {
              this.addressMy.city = this.addressShowList.code.cityCode[0];
              this.addressMy.cityShow = this.addressShowList.show.cityShow[0];
            }
            this.addressShow = [
              this.addressMy.provinceShow || this.addressShowList.show.provinceShow[0],
              this.addressMy.cityShow || this.addressShowList.show.cityShow[0],
              this.addressMy.countryShow || this.addressShowList.show.countryShow[0]
            ];

            let useCode = this.addressMy.city || this.addressShowList.code.cityCode[0];
            this.myLevel("area", useCode, 2);
          } else if (index == 2) {
            this.addressShowList.show.countryShow = this.getObjValues(res.data.body, 'name');
            this.addressShowList.code.countryCode = this.getObjValues(res.data.body, 'code');
            this.addressSlots[2].values = this.addressShowList.show.countryShow;
            if (this.addressMy.country) {
              let i = this.addressShowList.code.countryCode.indexOf(this.addressMy.country);
              this.addressMy.countryShow = this.addressShowList.show.countryShow[i];
            } else {
              this.addressMy.country = this.addressShowList.code.countryCode[0];
              this.addressMy.countryShow = this.addressShowList.show.countryShow[0];
            }
            this.addressShow = [
              this.addressMy.provinceShow || this.addressShowList.show.provinceShow[0],
              this.addressMy.cityShow || this.addressShowList.show.cityShow[0],
              this.addressMy.countryShow || this.addressShowList.show.countryShow[0]
            ];
          }
        })
      },
    },
    mounted() {

    },
    activated() {
      this.dataInit();
      if (this.$route.query.id) {
        this.isInit = false;
        this.getAddressInfo({
          'id': this.$route.query.id
        });
      } else {
        this.isInit = true;
        this.myLevel("area", null, 0);
      }
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
    padding: 1.1rem 0.3rem 0.5rem 0.3rem;
    text-align: justify;
    font-size: .28rem;
  }

  ul {
    padding: 0;
  }

  .myInfo {
    list-style: none;
    border-bottom: 1px solid #f5f6f6;
    background: #ffffff;
    padding: 0 0.3rem;
  }

  .myInfo li {
    border-bottom: 1px solid #f5f6f6;
  }

  .myInfo li:last-child {
    border-bottom: none;
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
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/arrow_right_gray.png') no-repeat center right 0.3rem/.12rem;
  }

  .myInfo li p.on {
    color: #000;
  }

  input::-webkit-input-placeholder {
    color: #999999;
    opacity: 1;
  }

  .isDefault {
    height: 1rem;
    ;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.3rem;
    margin-top: 0.16rem;
  }

  .icon_default {
    display: inline-block;
    height: 0.57rem;
    width: 0.96rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_switch.png') no-repeat center/100% 100%;
  }

  .icon_default.on {
    background-image: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_switch_select.png');
  }

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
  #address .mu-slide-picker-item {
    font-size: .24rem;
  }

  #address .mu-slide-picker-item.selected {
    font-size: .28rem;
  }

  .demo-picker-container {
    width: 100%;

  }
</style>
