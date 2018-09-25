import http from "./http"

/**
 * 创客&会长后台登录
 */

export const login = data => http({
  url: "api/entrepreneur/login",
  method: "post",
  data
})

/**
 * 获取创客会长店铺列表
 */

export const suppliers = params => http({
  url: 'api/entrepreneur/getPresidentSupplierList',
  method: 'get',
  params
})

/**
 * (创客)收益明细
 */

export const profits = params => http({
  url: "api/entrepreneur/profitDetail",
  method: "get",
  params
})

/**
 * (创客)排行榜
 */

export const ranking = params => http({
  url: "api/entrepreneur/ranking",
  method: "get",
  params
})

/**
 * 分润记录
 */

export const benefitRecord = params => http({
  url: "api/entrepreneur/splitFees",
  method: "get",
  params
})

/**
 * 提现记录
 */

export const withdrawRecord = params => http({
  url: "api/entrepreneur/withdrawCashes",
  method: "get",
  params
})

/**
 * 用户信息
 */

export const authUser = () => http({
  url: "api/entrepreneur/authUser",
  method: "get"
})

/**
 * 提现申请
 */

export const withdrawApply = data => http({
  url: "api/entrepreneur/withdrawCashes",
  method: "post",
  data
})

/**
 * (会长)创客列表
 */

export const entrepreneurs = params => http({
  url: 'api/entrepreneur/userToRoleSum',
  method: 'get',
  params
})

/**
 * 银行卡信息
 */

export const bank = () => http({
    url: "api/entrepreneur/user/getBank",
    method: "get"
  })

/**
 * 绑定银行卡 or 更新银行卡
 */

export const bankBind = params => http({
    url: "api/entrepreneur/user/addBank",
    method: "get",
    params
  })

/**
 * 绑定银行卡验证码
 */

export const bankBindVerify = () => http({
    url: "api/entrepreneur/user/getVerify",
    method: "get"
  })

/**
 * 广告收益
 */
export const adProfit = data => http({
    url: "api/entrepreneur/ad/splitFellLog",
    method: "post",
    data
  })

/**
 * 广告收益详情
 */

export const adProfitDetail = data => http({
    url: "api/entrepreneur/ad/splitFellLogDetail",
    method: "post",
    data
  })

/**
 * 现金券返点
 */

export const couponProfit = params => http({
    url: "api/entrepreneur/user/fee/logList",
    method: "get",
    params
  })

/**
 * 费率返点
 */

export const rates = params =>
  http({
    url: "api/v2/share_profit_logs",
    method: "get",
    params
  })
