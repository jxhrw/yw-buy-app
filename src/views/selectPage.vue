<template>
  <div id="selectPage">
    <header>
      <mu-icon value="chevron_left" right class="iconBtn" @click="closePageToggle()"></mu-icon>
      <h1>{{openPageInfo.title}}</h1>
      <span class="resetBtn"></span>
    </header>
    <ul class="pageList">
      <li @click="defaultInit()" :class="{'focus':defaultBtn}">
        <div class="pageLiName">默认</div>
        <mu-icon value="done" right class="doneIcon"></mu-icon>
      </li>
      <template v-for="(item,index) in downShow">
        <li @click="searchKey(item.code,item.type!='category'?item.type:'brand')" :class="{'focus':''==item.code||item.code == listData[item.type!='category'?item.type:'brand']}"
          :key="index">
          <div class="pageLiName">{{item.name}}</div>
          <mu-icon value="done" right class="doneIcon"></mu-icon>
        </li>
      </template>
    </ul>
  </div>
  <!-- 筛选的条件 -->
  <!-- <mu-drawer :open.sync="open" :docked="false" right="right" class="shop_page_drawer this_page_drawer">
      <header>筛选</header>
      <ul class="selectBox">
        <template v-for="(item,index) in searchConditions">
          <li v-if="item.code != 'new_old_level'" :key="index">
            <h6>{{item.label}}</h6>
            <div class="boxs">
              <template v-for="(list,index) in item.list">
                <ywBtn :text="list.name" :class="{'focus':list.code == listData[list.type]}" @click.native="searchKey(list.code,list.type)"
                  :key="index"></ywBtn>
              </template>
            </div>
          </li>
        </template>
      </ul>
      <footer>
        <ywBtn text="重置" @click.native="searchInit()"></ywBtn>
        <ywBtn text="确定" @click.native="selectOpen()"></ywBtn>
      </footer>
    </mu-drawer> -->
</template>

<script>
  export default {
    data() {
      return {
        openPageInfo: {
          'open': false,
          'title': '',
          'type': ''
        }, //当前筛选条件打开的信息
        // open: false,
        // openPageInfo: {
        //   'open': false,
        //   'title': '',
        //   'type': ''
        // }, //当前筛选条件打开的信息
        // defaultBtn: false, //当前展示筛选条件是否选中
        // defaultStatus: {
        //   'brand': false,
        //   'watch_price': false,
        //   'new_old_level': false
        // }, //品牌，价格区间，新旧的默认按钮的展示方式
      }
    },
    methods: {

    }
  }

</script>

<style scoped>
  /* 右侧弹出层的样式--start */

  .shop_page_drawer header,
  .shop_page_drawer footer {
    position: absolute;
    right: 0;
    width: 100%;
    text-align: center;
  }

  .shop_page_drawer header {
    top: 0;
    height: 0.9rem;
    background: #fff;
    border-bottom: 1px solid #fafafa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .3rem;
    border-bottom: 1px solid #e6e6e6;
  }

  .shop_page_drawer header span {
    display: block;
    width: .6rem;
    font-family: PingFangSC-Medium;
    font-size: .28rem;
    color: #fe3d36;
    text-align: center;
  }

  .shop_page_drawer header .iconBtn {
    font-size: .5rem;
    color: #000;
  }

  .shop_page_drawer header h1 {
    font-family: PingFangSC-Medium;
    font-size: .33rem;
    color: #333333;
    letter-spacing: -0.8px;
    text-align: center;
    width: 50%;
  }


  .this_page_drawer {
    width: 80%;
  }

  .this_page_drawer footer {
    bottom: 0;
    height: 0.8rem;
    display: flex;
  }

  .selectBox {
    padding: 1rem 0.2rem 1rem 0.2rem;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .selectBox h6 {
    /* height: 1rem; */
  }

  .selectBox li {
    list-style-type: none;
  }

  .selectBox li .boxs {
    display: flex;
    flex-wrap: wrap;
  }

  .selectBox li .boxs button {
    width: 30%;
    margin-right: .08rem;
    margin-top: .08rem;
    background: #bdbdbd;
  }

  .selectBox li .boxs button.focus {
    background: #eaa6a1;
  }

  .next_page_drawer {
    width: 100%;
  }

  .pageList {
    padding: 0.9rem 0 0 0;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    list-style: none;
  }

  .pageList li {
    font-family: PingFangSC-Regular;
    font-size: .28rem;
    color: #333333;
    border-bottom: 1px solid #e6e6e6;
    height: .88rem;
    padding: 0 0.3rem 0 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pageList li .pageLiName {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pageList li .doneIcon {
    font-size: 0.48rem;
    color: #fff;
  }

  .pageList li.focus .pageLiName,
  .pageList li.focus .doneIcon {
    color: #ea3c3c;
  }

  /* 右侧弹出层的样式--end */

</style>
