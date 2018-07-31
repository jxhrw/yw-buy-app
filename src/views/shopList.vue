<template>
  <div id="shopList">
    <ywLoading :loading='requesting'></ywLoading>
    <scrollToTop :scTop="true" @click.native="goMyTop()"></scrollToTop>
    <div class="buttons">
      <div class="btnFlex">
        <form action="javascript:;" class="searchForm">
          <input type="search" @keyup.enter="search()" v-model="searchTxt" placeholder="手表名称/品牌/系列/型号" />
        </form>
      </div>
      <div class="btnFlex">
        <ywBtn text="综合" class="tsBtn" :isActive='btnActive.all' @click.native="selectOrder(0)"></ywBtn>
        <ywBtn type="sort" text="价格" class="tsBtn" :isActive='btnActive.price.chosen' :sortType='btnActive.price.status' @click.native="selectOrder(1)"></ywBtn>
        <ywBtn type="sort" text="上新时间" class="tsBtn" :isActive='btnActive.time.chosen' :sortType='btnActive.time.status' @click.native="selectOrder(2)"></ywBtn>
        <ywBtn type="icon" text="筛选" class="tsBtn" :isActive='btnActive.select' @click.native="selectOpen()"></ywBtn>
      </div>
      <div class="btnFlex">
        <ywBtn type="drop-down" text="品牌" :class="{'tsBtn':true,'opened':downShow==brandConditions}" :isActive='btnActive.brand'
          @click.native="selectDown(0)"></ywBtn>
        <ywBtn type="drop-down" text="分类" :class="{'tsBtn':true,'opened':downShow==classifyConditions}" :isActive='btnActive.classify'
          @click.native="selectDown(1)"></ywBtn>
        <ywBtn type="drop-down" text="价格区间" :class="{'tsBtn':true,'opened':downShow==priceConditions}" :isActive='btnActive.priceSection'
          @click.native="selectDown(2)"></ywBtn>
        <ywBtn type="drop-down" text="新旧" :class="{'tsBtn':true,'opened':downShow==new_old_level_Conditions}" :isActive='btnActive.newOrOld'
          @click.native="selectDown(3)"></ywBtn>
        <div class="downBoxs">
          <template v-for="(item,index) in downShow">
            <span @click="searchKey(item.code,item.type!='category'?item.type:'brand')" :class="{'focus':''==item.code||item.code == listData[item.type!='category'?item.type:'brand']}"
              :key="index">{{item.name}}</span>
          </template>
        </div>
      </div>
    </div>


    <mu-paper class="demo-loadmore-wrap">
      <mu-container ref="container" class="demo-loadmore-content">
        <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
          <Prolist :items='pageItems' @scroll.native="scrollHandler" :isShare="true"></Prolist>

        </mu-load-more>
      </mu-container>
    </mu-paper>


    <mu-drawer :open.sync="open" :docked="false" right="right" class="this_page_drawer">
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
    </mu-drawer>
  </div>
</template>

<script>
  import {
    queryGoodsPage,
    queryDic
  } from '../api/api'
  export default {
    data() {
      return {
        sctop: false, //滚动到顶部的按钮是否出现
        fewTimes: 0, //页面第几次进入，刷新或第一次会在mounted里重置,其余次数获取scrollTop使页面回到离开位置
        listData: {
          category: 'watch',
          index: 1,
          pageSize: 10,
          order: "",
          // userName: 'ybcs_manager',
        }, //列表请求参数
        searchTxt: '', //搜索条件的文本
        pageInfo: {}, //分页信息
        pageItems: [], //分页内容
        brandConditions: [], //品牌
        searchConditions: [], //可选材质
        new_old_level_Conditions: [], //新旧程度，从searchConditions提取
        classifyConditions: [{
          'type': '',
          'name': "腕表",
          'code': ''
        }], //分类的类别，暂时写死
        priceConditions: [], //价格区间
        //selectedConditions: [], //已选材质
        downShow: [], //筛选下拉框里的展示数据
        refreshing: false, //下拉loading
        loading: false, //底部loading
        requesting: false, //整体loading
        btnActive: {
          'all': false,
          'price': {
            'chosen': false,
            'status': 0
          },
          'time': {
            'chosen': false,
            'status': 0
          },
          'select': false,
          'brand': false,
          'classify': true,
          'priceSection': false,
          'newOrOld': false,
        }, //按钮的选中状态
        open: false,
      }
    },
    components: {},
    computed: {},
    watch: {},
    created() {},
    methods: {
      requireda(data, reset) {
        let $bodyThis = this;
        this.requesting = true;
        queryGoodsPage(data).then(res => {
          let $this = this;
          this.ajaxResult(res, function () {
            $this.loading = false;
            $this.refreshing = false;
            $this.requesting = false;
            $this.searchConditions = res.data.body.searchConditions;
            $this.brandConditions = res.data.body.brandConditions;
            $this.new_old_level_Conditions = []; //新旧程度可能不存在，需要重置
            for (let i in $this.searchConditions) {
              if ($this.searchConditions[i].code == 'new_old_level') {
                $this.new_old_level_Conditions = $this.searchConditions[i].list;
              }
            }

            $this.pageInfo = {
              'pageNum': res.data.body.page.pageNum,
              'total': res.data.body.page.total
            }
            if (reset) {
              //重置时需要滚回到头部
              $bodyThis.$refs.container.scrollTop = 0;
              $this.pageItems = res.data.body.page.items;
            } else {
              $this.pageItems = $this.pageItems.concat(res.data.body.page.items);
            }
          })

        })
      },
      //价格区间数据
      rqPriceData(data) {
        queryDic(data).then(res => {
          let $this = this;
          this.ajaxResult(res, function () {
            $this.priceConditions = res.data.body;
          });
        });
      },
      //重置、筛选
      resetSelect() {
        this.listData.index = 1;
        this.requireda(this.listData, true);
      },
      //上拉刷新
      refresh() {
        this.refreshing = true;
        this.resetSelect();
      },
      //下拉加载
      load() {
        if (this.listData.index < parseInt(this.pageInfo.total)) {
          this.loading = true;
          this.listData.index += 1;
          this.requireda(this.listData);
        }
      },
      //输入框搜索
      search() {
        console.log(this.searchTxt);
        this.listData.text = this.searchTxt;
        this.resetSelect();
      },
      //通过order排序的,type类型，分0综合，1价格，2上新时间，-1重置
      selectOrder(type) {
        if (type == 1) {
          this.btnActive.price.status = (this.btnActive.price.status + 1) % 3;
          this.btnActive.time.status = 0;
          this.btnActive.all = false;
        } else if (type == 2) {
          this.btnActive.time.status = (this.btnActive.time.status + 1) % 3;
          this.btnActive.price.status = 0;
          this.btnActive.all = false;
        } else if (type == 0) {
          this.btnActive.all = !this.btnActive.all;
          this.btnActive.price.status = 0;
          this.btnActive.time.status = 0;
        } else {
          this.btnActive.all = false;
          this.btnActive.price.status = 0;
          this.btnActive.time.status = 0;
        }
        this.btnActive.price.chosen = this.btnActive.price.status > 0;
        this.btnActive.time.chosen = this.btnActive.time.status > 0;
        if (this.btnActive.price.status == 1) {
          this.listData.order = 'price_asc';
        } else if (this.btnActive.price.status == 2) {
          this.listData.order = 'price_desc';
        } else if (this.btnActive.time.status == 1) {
          this.listData.order = 'issuedate_asc';
        } else if (this.btnActive.time.status == 2) {
          this.listData.order = 'issuedate_desc';
        } else {
          this.listData.order = '';
        }
        this.resetSelect();
      },
      //打开筛选
      selectOpen() {
        this.open = !this.open;
      },
      //打开下拉,分0品牌，1分类，2价格区间,3新旧
      selectDown(type) {
        if (type == 0) {
          this.downShow = this.downShow == this.brandConditions ? [] : this.brandConditions;
        } else if (type == 1) {
          this.downShow = this.downShow == this.classifyConditions ? [] : this.classifyConditions;
        } else if (type == 2) {
          this.downShow = this.downShow == this.priceConditions ? [] : this.priceConditions;
        } else if (type == 3) {
          this.downShow = this.downShow == this.new_old_level_Conditions ? [] : this.new_old_level_Conditions;
        }
      },
      //按key:type,value:code的相关搜索
      searchKey(code, type) {
        //判断obj中是否存在key为type的值
        if (code == '') {
          this.downShow = [];
          return;
        }
        if (this.listData.hasOwnProperty(type) && this.listData[type] == code) {
          delete this.listData[type];
        } else {
          this.listData[type] = code;
        }
        this.downShow = [];
        this.isSeceleBtn();
        this.resetSelect();
      },
      //搜索初始化
      searchInit() {
        //和默认的data一样
        this.listData = {
          category: 'watch',
          index: 1,
          pageSize: 10,
          order: "",
          userName: 'ybcs_manager',
        };
        this.isSeceleBtn();
        this.selectOrder(-1);
      },
      //按key:value的相关搜索外面显示的状态,纯展示
      isSeceleBtn() {
        //所有类型 changhe,complex_func,dai_metal,dial_color,face_metal,jixin_type,new_old_level,pan_xingzhuang,watch_sex,watch_price
        //category ==> brand 品牌类型替换
        let obj = {
          'type1': ['face_metal', 'complex_func', 'dai_metal', 'jixin_type', 'changhe', 'watch_sex', 'dial_color',
            'pan_xingzhuang'
          ],
          'type2': ['brand'], //['category']
          'type3': [],
          'type4': ['watch_price'],
          'type5': ['new_old_level']
        };
        this.btnActive.select = false;
        this.btnActive.brand = false;
        this.btnActive.classify = true; //只有一个，写死
        this.btnActive.priceSection = false;
        this.btnActive.newOrOld = false;
        for (let key of obj.type1) {
          if (this.listData.hasOwnProperty(key)) {
            this.btnActive.select = true;
          }
        }
        for (let key of obj.type2) {
          if (this.listData.hasOwnProperty(key)) {
            this.btnActive.brand = true;
          }
        }
        for (let key of obj.type4) {
          if (this.listData.hasOwnProperty(key)) {
            this.btnActive.priceSection = true;
          }
        }
        for (let key of obj.type5) {
          if (this.listData.hasOwnProperty(key)) {
            this.btnActive.newOrOld = true;
          }
        }
      },
      //滚动事件
      scrollHandler() {
        //console.log(this.$refs.container.scrollTop)
        sessionStorage.setItem("shopListScrollTop", this.$refs.container.scrollTop);
        if (this.$refs.container.scrollTop > 300) {
          this.sctop = true;
        } else {
          this.sctop = false;
        }
      },
      goMyTop() {
        this.goTop(this.$refs.container);
      }
    },
    mounted: function () {
      this.requireda(this.listData);
      this.rqPriceData({
        'type': 'watch_price'
      });
      this.$refs.container.addEventListener('scroll', this.scrollHandler);
    },
    activated() {
      this.fewTimes++;
      if (this.fewTimes > 1) {
        this.$refs.container.scrollTop = sessionStorage.getItem("shopListScrollTop");
      }
    },
  }

</script>

<style scoped>
  #shopList {
    width: 100%;
    height: 100%;
  }

  .demo-loadmore-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .demo-loadmore-wrap .mu-appbar {
    width: 100%;
  }

  .demo-loadmore-content {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .mu-list {
    padding: 0 0;
  }

  .container {
    padding: 0 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .demo-loadmore-wrap {
    padding-top: 2rem;
  }

  /* 以上为组件css，以下是自定义css */

  .buttons {
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 1;
    background: #fff;
  }

  .btnFlex {
    height: .666rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
  }

  .downBoxs {
    position: absolute;
    width: 100%;
    background: #fff;
    top: 0.8rem;
    height: auto;
    display: flex;
    flex-wrap: wrap;
  }

  .downBoxs span {
    width: 50%;
    padding: 0 4%;
  }

  .downBoxs span.focus {
    color: red;
  }

  .tsBtn {
    width: 22%;
  }

  .tsBtn.opened {
    background-color: #fff;
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

  .this_page_drawer {
    width: 80%;
  }

  .this_page_drawer header,
  .this_page_drawer footer {
    position: absolute;
    right: 0;
    width: 100%;
    text-align: center;
  }

  .this_page_drawer header {
    top: 0;
    height: 0.8rem;
    line-height: .8rem;
    background: #fff;
    border-bottom: 1px solid #fafafa;
  }

  .this_page_drawer footer {
    bottom: 0;
    height: 0.8rem;
    display: flex;
  }

  .searchForm {
    width: 100%;
    padding: 0 .3rem;
  }

  input[type=search] {
    width: 100%;

  }

</style>
<style>
  #shopList .mu-refresh-control {
    /* margin-top: 1rem; */
  }

  #shopList .mu-refresh-control-hide {
    /* transform:translate3d(0,-1.8rem,0)!important; */
  }

</style>
