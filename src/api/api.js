import axios from 'axios';
const base = '';
// document.cookie = 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InlidGVzdCIsIlVVSUQiOiI1ODcwN2NjNyJ9.WXbBr5VUytZevcfExFDEHWZvuMWHZUympKm5-_YJ2d8';
let api = definiens();

function definiens(){
  return axios.create({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': getCookie("token"),
    }
  });
}
function getCookie(name) {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  }
}

//我的商品列表
export const queryGoodsPage = pams => {
  return api.get(`${base}/goods-warehouse/goodsShow/queryMyGoodsPage`, {
    "params": pams
  });
};

//商品详情
export const loadGoodsDetail = pams => {
  return api.get(`${base}/goods-warehouse/goodsShow/loadGoodsDetail`, {
    "params": pams
  })
};

//价格区间字典
export const queryDic = pams => {
  return axios.get(`${base}/goods-warehouse/goodsShow/queryDic`, {
    "params": pams
  })
};

//分页查询公告列表
export const queryAffichePage = pams => {
  return api.get(`${base}/message-provider-service/affiche/queryAffichePage`, {
    "params": pams
  })
};

//查询公告消息详情
export const queryAfficheDetail = pams => {
  return api.get(`${base}/message-provider-service/affiche/queryAfficheDetail`, {
    "params": pams
  })
};