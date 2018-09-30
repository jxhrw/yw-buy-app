import axios from 'axios';
import Qs from 'qs';
const base = '';
const definiens = function () {
  return axios.create({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'app_type':'html',
      'token': getCookie("token") || '',
    }
  });
}
const definiensType = function () {
  return axios.create({
    headers: {
      'app_type':'html',
    }
  });
}
const definiensJson = function () {
  return axios.create({
    transformRequest: [function (data) {
      data = Qs.stringify(data);
      return data;
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'app_type':'html',
      'token': getCookie("token") || '',
    }
  });
}
const getCookie = function (name) {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  }
}
let apiToken = definiens();//需要token
let axiosType = definiensType();//不需要token
let apiJsonToken = definiensJson();//json格式,需要token

//我的商品列表
export const queryGoodsPage = pams => {
  return apiToken.get(`${base}/goods-warehouse/goodsShow/queryMyGoodsPage`, {
    "params": pams
  });
};

//分享后我的商品列表
export const queryMyGoodsPageForShare = pams => {
  return axiosType.get(`${base}/goods-warehouse/goodsShow/queryMyGoodsPageForShare`, {
    "params": pams
  });
};

//查询商品信息
export const loadGoodsInfo = pams => {
  return apiToken.get(`${base}/goods-warehouse/goodsShow/loadGoodsInfo`, {
    "params": pams
  })
};


//商品详情
export const loadGoodsDetail = pams => {
  return apiToken.get(`${base}/goods-warehouse/goodsShow/loadGoodsDetail`, {
    "params": pams
  })
};

//我的商品详情
export const loadMyGoodsDetail = pams => {
  return apiToken.get(`${base}/goods-warehouse/goodsShow/loadMyGoodsDetail`, {
    "params": pams
  })
};

//h5商品详情
export const loadMyGoodsDetailForShare = pams => {
  return axiosType.get(`${base}/goods-warehouse/goodsShow/loadMyGoodsDetailForShare`, {
    "params": pams
  })
};

//抢购商品详情
export const loadRushBuyGoodsDetail = pams => {
  return apiToken.get(`${base}/goods-warehouse/goodsShow/loadRushBuyGoodsDetail`, {
    "params": pams
  })
};

//购物车商品详情
export const cartGoodsDetail = pams => {
  return apiToken.get(`${base}/goods-warehouse/goodsShow/cartGoodsDetail`, {
    "params": pams
  })
};

//获取店铺信息
export const loadShopInfo = pams => {
  return apiToken.get(`${base}/user-center/myShop/loadShopInfo`, {
    "params": pams
  })
};

//没有token的店铺信息
export const loadShopInfoForShare = pams => {
  return axiosType.get(`${base}/user-center/myShop/loadShopInfoForShare`, {
    "params": pams
  })
};

//字典查询
export const queryDic = pams => {
  return axiosType.get(`${base}/goods-warehouse/goodsShow/queryDic`, {
    "params": pams
  })
};

//字典查询职务列表
export const shopUserJobs = pams => {
  return apiToken.get(`${base}/user-center/shopUser/shopUserJobs`, {
    "params": pams
  })
};

//分页查询公告列表
export const queryAffichePage = pams => {
  return apiToken.get(`${base}/message-provider-service/affiche/queryAffichePage`, {
    "params": pams
  })
};

//查询公告消息详情
export const queryAfficheDetail = pams => {
  return apiToken.get(`${base}/message-provider-service/affiche/queryAfficheDetail`, {
    "params": pams
  })
};

//帮助中心列表
export const helpCenterList = pams => {
  return axiosType.get(`${base}/user-center/personalcenter/helpCenterList`, {
    "params": pams
  })
};

//询价
export const askPriceApp = pams => {
  return apiJsonToken.post(`${base}/user-center/askprice/askPriceApp`,pams)
};

export const loadRootLevel = pams => {
  return axiosType.get(`${base}/dicAction/loadRootLevel.json`, {
    "params": pams
  })
};

export const loadNextLevel = pams => {
  return axiosType.get(`${base}/dicAction/loadNextLevel.json`, {
    "params": pams
  })
};


//查询收货地址列表
export const listReceiverAddress = pams => {
  return apiToken.get(`${base}/fund-account/deal/listReceiverAddress`, {
    "params": pams
  })
};

//查询单个收货地址
export const loadReceiverAddress = pams => {
  return apiToken.get(`${base}/fund-account/deal/loadReceiverAddress`, {
    "params": pams
  })
};

//新增收货地址
export const addReceiverAddress = pams => {
  return apiJsonToken.post(`${base}/fund-account/deal/addReceiverAddress`, pams)
};

//修改收货地址
export const editReceiverAddress = pams => {
  return apiJsonToken.put(`${base}/fund-account/deal/editReceiverAddress`, pams)
};

//提交订单
export const submitOrder = pams => {
  return apiJsonToken.post(`${base}/fund-account/deal/submitOrder`, pams)
};

//支付方式
export const paymentMethod = pams => {
  return apiToken.get(`${base}/fund-account/deal/paymentMethod`, {
    "params": pams
  })
};

//活动0918
export const queryActivitys = pams => {
  return apiToken.get(`${base}/activityH5Action/queryActivitys.json`, {
    "params": pams
  })
};
//活动0921
export const queryActivityGoods = pams => {
  return apiToken.get(`${base}/activityH5Action/queryActivityGoods.json`, {
    "params": pams
  })
};

//微信分享
export const wxConfig = pams => {
  return apiJsonToken.post(`${base}/wx/share/getParamForConfigInterface`, pams)
};

//收藏
export const collect = pams => {
  return apiJsonToken.post(`${base}/goods-warehouse/coodsCollect/collect`,pams)
};

//取消收藏
export const cancelCollect = pams => {
  return apiJsonToken.post(`${base}/goods-warehouse/coodsCollect/cancelCollect`,pams)
}

//分页查询员工列表
export const shopUserQueryPage = pams => {
  return apiToken.get(`${base}/user-center/shopUser/queryPage`, {
    "params": pams
  })
};

//查询店铺员工
export const loadShopUser = pams => {
  return apiToken.get(`${base}/user-center/shopUser/loadShopUser`, {
    "params": pams
  })
};

//新增或修改员工
export const addOrModifyShopUser = pams => {
  return apiJsonToken.post(`${base}/user-center/shopUser/addOrModifyShopUser`,pams)
};

//启用或禁用员工
export const startOrStopUse = pams => {
  return apiJsonToken.post(`${base}/user-center/shopUser/startOrStopUse`,pams)
};