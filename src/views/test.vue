<template>
  <div id="test">
    <div class="demo-picker-container">
      <mu-slide-picker :slots="addressSlots" :visible-item-count="7" @change="addressChange" :values="addressShow"></mu-slide-picker>
      <p>
        您选择的城市是： {{addressSelect.show[0]}} {{addressSelect.show[1]}} {{addressSelect.show[2]}}
      </p>
    </div>
  </div>

</template>

<script>
  import {
    loadRootLevel,
    loadNextLevel,
    queryDic
  } from '../api/api'
  export default {
    data() {
      return {
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
        addressShow:[],
        //选中的值和code
        addressSelect: {
          code: ['', '', ''],
          show: ['', '', ''],
        },
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
      //改变选中后触发
      addressChange(value, index) {
        let myCode = '';
        switch (index) {
          case 0:
            myCode = this.addressShowList.code.provinceCode[this.addressShowList.show.provinceShow.indexOf(value)];
            this.addressSelect.code[0] = myCode;
            this.addressSelect.show[0] = value;
            this.addressShow = [this.addressSelect.show[0],this.addressSelect.show[1],this.addressSelect.show[2]];
            this.myLevel("area", myCode, 1);
            break
          case 1:
            myCode = this.addressShowList.code.cityCode[this.addressShowList.show.cityShow.indexOf(value)];
            this.addressSelect.code[1] = myCode;
            this.addressSelect.show[1] = value;
            this.addressShow = [this.addressSelect.show[0],this.addressSelect.show[1],this.addressSelect.show[2]];
            this.myLevel("area", myCode, 2);
            break
          case 2:
            myCode = this.addressShowList.code.countryCode[this.addressShowList.show.countryShow.indexOf(value)];
            this.addressSelect.code[2] = myCode;
            this.addressSelect.show[2] = value;
            this.addressShow = [this.addressSelect.show[0],this.addressSelect.show[1],this.addressSelect.show[2]];
            break
        }
      },
      //将对象的某个key的value值组成数组
      getObjValues(array, name) {
        let arr = [];
        for (let j in array) {
          if(array[j].code.indexOf("1_")<=-1){//过滤code有1_的数据
            arr.push(array[j][name]);
          }
        }
        return arr;
      },
      //所有省
      myRootLevel(type, code, index) {
        loadRootLevel({
          'type': type,
          "code": code
        }).then(res => {
          if (index == 0) {
            this.addressShowList.code.provinceCode = this.getObjValues(res.data.items, 'code');
            this.addressShowList.show.provinceShow = this.getObjValues(res.data.items, 'enName');
            this.addressSelect.code[index] = this.addressShowList.code.provinceCode[0];
            this.addressSelect.show[index] = this.addressShowList.show.provinceShow[0];
            this.addressSlots[index].values = this.addressShowList.show.provinceShow;
            this.addressShow = [this.addressSelect.show[0],this.addressSelect.show[1],this.addressSelect.show[2]];
            this.myNextLevel("area", this.addressSelect.code[index], 1);
          }
        })
      },
      //所有市和区
      myNextLevel(type, code, index) {
        loadNextLevel({
          'type': type,
          "code": code
        }).then(res => {
          if (index == 1) {
            this.addressShowList.show.cityShow = this.getObjValues(res.data.items, 'enName');
            this.addressShowList.code.cityCode = this.getObjValues(res.data.items, 'code');
            this.addressSelect.code[index] = this.addressShowList.code.cityCode[0];
            this.addressSelect.show[index] = this.addressShowList.show.cityShow[0];
            this.addressSlots[index].values = this.addressShowList.show.cityShow;
            this.addressShow = [this.addressSelect.show[0],this.addressSelect.show[1],this.addressSelect.show[2]];
            this.myNextLevel("area", this.addressSelect.code[index], 2);
          } else if (index == 2) {
            this.addressShowList.show.countryShow = this.getObjValues(res.data.items, 'enName');
            this.addressShowList.code.countryCode = this.getObjValues(res.data.items, 'code');
            this.addressSelect.code[index] = this.addressShowList.code.countryCode[0];
            this.addressSelect.show[index] = this.addressShowList.show.countryShow[0];
            this.addressSlots[index].values = this.addressShowList.show.countryShow;
            this.addressShow = [this.addressSelect.show[0],this.addressSelect.show[1],this.addressSelect.show[2]];
          }
        })
      },
      //查询省市区
      myLevel(type, code, index) {
        queryDic({
          'type': type,
          "parent": code
        }).then(res => {
          if (index == 0) {
            this.addressShowList.code.provinceCode = this.getObjValues(res.data.body, 'code');
            this.addressShowList.show.provinceShow = this.getObjValues(res.data.body, 'name');
            this.addressSelect.code[index] = this.addressShowList.code.provinceCode[0];
            this.addressSelect.show[index] = this.addressShowList.show.provinceShow[0];
            this.addressSlots[index].values = this.addressShowList.show.provinceShow;
            this.addressShow = [this.addressSelect.show[0],this.addressSelect.show[1],this.addressSelect.show[2]];
            this.myLevel("area", this.addressSelect.code[index], 1);
          }else if (index == 1) {
            this.addressShowList.show.cityShow = this.getObjValues(res.data.body, 'name');
            this.addressShowList.code.cityCode = this.getObjValues(res.data.body, 'code');
            this.addressSelect.code[index] = this.addressShowList.code.cityCode[0];
            this.addressSelect.show[index] = this.addressShowList.show.cityShow[0];
            this.addressSlots[index].values = this.addressShowList.show.cityShow;
            this.addressShow = [this.addressSelect.show[0],this.addressSelect.show[1],this.addressSelect.show[2]];
            this.myLevel("area", this.addressSelect.code[index], 2);
          } else if (index == 2) {
            this.addressShowList.show.countryShow = this.getObjValues(res.data.body, 'name');
            this.addressShowList.code.countryCode = this.getObjValues(res.data.body, 'code');
            this.addressSelect.code[index] = this.addressShowList.code.countryCode[0];
            this.addressSelect.show[index] = this.addressShowList.show.countryShow[0];
            this.addressSlots[index].values = this.addressShowList.show.countryShow;
            this.addressShow = [this.addressSelect.show[0],this.addressSelect.show[1],this.addressSelect.show[2]];
          }
        })
      },
    },
    activated() {
      // this.myRootLevel("area", null, 0);
      this.myLevel("area", null, 0);
      // queryDic({'type':"area"})
    },
  }

</script>

<style>
  #test .mu-slide-picker-item {
    font-size: 12px;
  }

  #test .mu-slide-picker-item.selected {
    font-size: 16px;
  }

  .demo-picker-container {
    width: 100%;

  }

</style>
