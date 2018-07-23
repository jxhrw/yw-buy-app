import axios from 'axios';
const base = '/api';
let api = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

//商品列表
export const queryGoodsPage = pams => {
  return axios.get(`${base}/goodsShow/queryGoodsPage?`,{"params":pams})
};
//商品详情
export const loadGoodsDetail = pams => {
  return axios.get(`${base}/goodsShow/loadGoodsDetail?`,{"params":pams})
};
//价格区间字典
export const queryDic = pams => {
  return axios.get(`${base}/android/goodsAction/queryDic.json?`,{"params":pams})
};