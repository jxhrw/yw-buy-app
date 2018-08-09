<template>
  <div id="problem">
    <ywBar :title="'帮助中心'" :isFinish="true"></ywBar>
    <div class="content">
      <ul class="problemUl">
        <li v-for="(item,index) in proList" :key="index">
          <h6>{{item.title}}</h6>
          <div class="box">
            <div class="explain" v-html='item.content'>{{item.content}}</div>
          </div>
          <div style="padding:0.1rem 0;">
            <div class="arrowBx" :style="{'height':isDrop[index]?'auto':'0'}" @click="dropDown(index)">
              <mu-icon class="arrow" value="expand_more"></mu-icon>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <footer>
      <div class="gradient"></div>
      <div class="footer">
        <a class="footBtn" href="tel://15990319244">联系客服</a>
        <a class="footBtn" style="background-image:linear-gradient(-49deg, #fb6455 0%, #fe3d36 100%);color:#fff;margin-left:.5rem;" @click="popupShow=true">添加微信</a>
      </div>
    </footer>
    <!-- 弹窗 -->
    <div v-show="popupShow" class="popup">
      <div class="popupContent" @click="stop">
        <p class="txt">复制后黏贴到微信
          <br> 〈 youwatchyunying 〉
          <br> 添加客服微信
        </p>
        <p class="btn" @click="popupShow=false">关闭</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    helpCenterList
  } from '../api/api'
  export default {
    data() {
      return {
        defaultHeight: "0.8rem", //未展开的默认高度
        proList: [], //问题列表
        isOpen: [], //所有列表是否展开，默认全是false
        isDrop: [], //所有列表是否有下拉箭头
        popupShow: false, //弹窗是否展示
      }
    },
    methods: {
      problemInfo(data) {
        helpCenterList(data).then(res => {
          let $this = this;
          this.ajaxResult(res, function () {
            $this.proList = res.data.body;
          });
        }).then(() => {
          let $this = this;
          let $box = document.getElementsByClassName("box");
          let $exp = document.getElementsByClassName("explain");
          for (let i = 0; i < $exp.length; i++) {
            $this.isOpen.push(false);
            if ($exp[i].clientHeight > $box[i].clientHeight) {
              $this.isDrop.push(true);
            } else {
              $this.isDrop.push(false);
            }
          }
        }).catch((err)=>{
          this.toast(`HTTP ${err.response.status}`);
        });
      },
      initData() {
        this.proList = [];
        this.isOpen = [];
        this.isDrop = [];
      },
      dropDown(index) {
        let $box = document.getElementsByClassName("box");
        let $exp = document.getElementsByClassName("explain");
        let $arrow = document.getElementsByClassName("arrow");
        for (let i = 0; i < $box.length; i++) {
          if (i == index) {
            this.isOpen[i] = !this.isOpen[i];
          } else {
            this.isOpen[i] = false;
          }
          $box[i].style.height = this.isOpen[i] ? $exp[i].clientHeight + 'px' : this.defaultHeight;
          $arrow[i].style.transform = this.isOpen[i] ? 'rotateZ(180deg)' : 'rotateZ(0deg)';
          if ($exp[i].clientHeight > $box[i].clientHeight) {
            this.isDrop[i] = true;
          } else {
            this.isDrop[i] = false;
          }
        }
      },
      stop(event) {
        event.stopPropagation();
      }
    },
    mounted() {

    },
    activated() {
      this.initData();
      this.problemInfo();
    },
  };

</script>

<style scoped>
  #problem {
    background: #fafafa;
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0.9rem 0.3rem 1.5rem 0.3rem;
  }

  .problemUl {
    list-style: none;
    padding: 0;
  }

  .problemUl li {
    margin-top: .24rem;
    padding: .3rem 0.37rem 0 0.37rem;
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
    border-radius: 6px;
  }

  .problemUl li h6 {
    font-family: PingFangSC-Regular;
    font-size: .28rem;
    color: #333333;
    padding-bottom: .15rem;
    font-weight: normal;
  }

  .box {
    height: 0.8rem;
    overflow: hidden;
    transition: height 0.6s;
    min-height: 0.8rem;
    font-family: PingFangSC-Regular;
    font-size: .28rem;
    color: #999999;
    line-height: .38rem;
  }

  .explain {
    line-height: .4rem;
    height: auto;
    word-wrap: break-word;
  }

  .arrowBx {
    overflow: hidden;
  }

  .arrow {
    display: block;
    width: .5rem;
    height: .5rem;
    margin: auto;
    transform: rotateZ(0deg);
    transition: transform 0.3s;
    color: #999999;
  }

  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .gradient {
    opacity: 0.25;
    background-image: linear-gradient(-180deg, rgba(238, 238, 238, 0.00) 11%, rgba(181, 181, 181, 0.96) 100%);
    height: .31rem;
  }

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.2rem;
  }

  .footBtn {
    display: block;
    background: #feebec;
    border-radius: 45px;
    width: 2.5rem;
    height: .70rem;
    line-height: .70rem;
    text-align: center;
    font-family: PingFangSC-Medium;
    font-size: .28rem;
    color: #333333;
  }

  .popup {
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.50);
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popupContent {
    background: #fff;
    width: 5.17rem;
    height: 5.67rem;
    font-family: PingFangSC-Regular;
    font-size: .28rem;
    color: #333333;
    text-align: center;
    position: relative;
  }

  .popupContent .txt {
    padding-top: 1.24rem;
  }

  .popupContent .btn {
    position: absolute;
    width: 100%;
    bottom: 0.24rem;
  }

</style>
