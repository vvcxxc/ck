import http from "~utils/httpClient"
import store from "@/store/index"

/**
 * 获取店铺
 */

export const shopList = params =>
  http({
    url: "api/entrepreneur/suppliers",
    method: "get",
    params
  })

/**
 * 店铺信息
 */

export const shopDetails = ({ id }) =>
  http({
    url: "api/entrepreneur/suppliers/" + id,
    method: "get"
    // params
  })

/**
 * 获取会员
 */

export const memberList = params =>
  http({
    url: "api/entrepreneur/users",
    method: "get",
    params
  })

/**
 * 获取会员详情
 */

export const memberDetails = ({ id }) =>
  http({
    url: "api/entrepreneur/users/" + id,
    method: "get"
  })

/**
 * 获取门店
 */

export const supplierList = params =>
  http({
    url: "api/entrepreneur/supplierLocations",
    method: "get",
    params
  })

/**
 * 门店详情
 */

export const supplierDetails = ({ id }) =>
  http({
    url: "api/entrepreneur/supplierLocations/" + id,
    method: "get"
  })

/**
 * 提现申请
 */

export const withDraw = params =>
  http({
    url: "api/entrepreneur/withdrawCashes",
    method: "post",
    params
  })

/**
 * 提现记录
 */

export const withDrawHistory = params =>
  http({
    url: "api/entrepreneur/withdrawCashes",
    method: "get",
    params
  })

/**
 * 收益明细
 */

export const profitDetails = params =>
  http({
    url: "api/entrepreneur/profitDetail",
    method: "get",
    params
  })

/**
 * 分润记录
 */

export const profitShareHistory = params =>
  http({
    url: "api/entrepreneur/splitFees",
    method: "get",
    params
  })

/**
 * 登录
 */

export const login = data =>
  http({
    url: "api/entrepreneur/login",
    method: "post",
    data
  })

/**
 * 用户信息
 */

export const authUser = () =>
  http({
    url: "api/entrepreneur/authUser",
    method: "get"
  })

/**
 * 登出
 */

export const logout = () =>
  http({
    url: "api/entrepreneur/logout",
    method: "post"
  })

/**
 * 排行榜
 */

export const rank = params =>
  http({
    url: "api/entrepreneur/ranking",
    method: "get",
    params
  })

/**
 * 银行卡列表
 */

export const bankList = () =>
  http({
    url: "api/entrepreneur/user/getBank",
    method: "get"
  })

/**
 * 绑定银行卡 or 更新银行卡
 */

export const bankBind = params =>
  http({
    url: "api/entrepreneur/user/addBank",
    method: "get",
    params
  })

/**
 * 绑定银行卡验证码
 */

export const bankBindVerify = () =>
  http({
    url: "api/entrepreneur/user/getVerify",
    method: "get"
  })

/**
 * 修改密码
 */

export const modifyPassword = data =>
  http({
    url: "api/entrepreneur/user/modifyPwd",
    method: "post",
    data
  })

// 广告收益(创客)
export const advertisementEarnings = data =>
  http({
    url: "api/entrepreneur/ad/splitFellLog",
    method: "post",
    data
  })

// 费率返点
export const ratePoint = params =>
  http({
    url: "api/v2/share_profit_logs",
    method: "get",
    params
  })

/**
 * 现金券返点
 */

export const couponEarnings = params =>
  http({
    url: "api/entrepreneur/user/fee/logList",
    method: "get",
    params
  })

/**
 * 广告收益详情
 */

export const advertisementEarningsDetails = data =>
  http({
    url: "api/entrepreneur/ad/splitFellLogDetail",
    method: "post",
    data
  })

