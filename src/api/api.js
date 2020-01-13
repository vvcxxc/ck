import http from "./http"

let NEW_API = 'http://test.api.supplier.tdianyi.com/';
if (process.env.NODE_ENV === 'development') {
  NEW_API = `http://api.supplier.tdianyi.test/`;
}
if (process.env.NODE_ENV === 'testing') {
  NEW_API = `http://test.api.supplier.tdianyi.com/`
}
if (process.env.NODE_ENV === 'production') {
  NEW_API = `http://api.supplier.tdianyi.com/`
}

/**
 * 创客&会长后台登录
 */

export const login = data => http({
  url: "api/entrepreneur/login",
  method: "post",
  data
})

/**
 * 创客注册
 */

export const register = data => http({
  url: "api/entrepreneur/ck_register",
  method: "post",
  data
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
 * 修改密码
 */

export const modifyPassword = data =>
  http({
    url: "api/entrepreneur/user/modifyPwd",
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
  url: `api/entrepreneur/authUser`,
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

export const sendVerifyCode = data => {
  return http({
    url: 'api/entrepreneur/verify_code',
    method: 'post',
    data,
  })
}
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

export const giveIntegral = data => {
  return http({
    url: `api/entrepreneur/integral/giveIntegral`,
    method: 'post',
    data,
  })
}

export const integralRecords = (params) => {
  return http({
    url: `api/entrepreneur/integral/records`,
    method: 'get',
    params,
  })
}

export const jssdkParams = params => {
  return http({
    url: `wechat/getShareSign`,
    method: 'get',
    params,
  })
}

export const invite = () => {
  return http({
    url: `api/merchant/invite`
  })
}


export const getSplitRule = params =>
  http({
    url: "/api/splitRule",
    method: "get",
    params
  })

export const getSplitRuleCk = params =>
  http({
    url: "/api/splitRuleCk",
    method: "get",
    params
  })

export const putSplitRule = data => {
	return http({
		url: `api/splitRule`,
		method: 'put',
		data,
	})
}

export const putSplitRuleCk = data => {
	return http({
		url: `api/splitRuleCk`,
		method: 'put',
		data,
	})
}

export const isExistEntrepreneur = params =>
http({
	url: "/api/isExistEntrepreneur",
	method: "get",
	params
})

/**
 * 开启或费率全返
 */
export const openReturnMoney = (data, id) =>
http({
  url: "api/entrepreneur/ZeroRateOpen/"+id,
  method: 'put',
  data
})

/**
 * 全返规则
 */
export const returnMoneyRule = id =>
http({
  url: 'api/entrepreneur/ZeroRate/' + id,
  method: 'get'
})


/**
 * 首页数据（新）
 */

export const indexInfo = () =>
http({
  url: 'api/entrepreneur/index',
  method: 'get'
})

/**
 * 提现页面信息
 */
export const withdrawInfo = () =>
http({
  url: 'api/entrepreneur/cashWithdrawal',
  method: 'get'
})


/**
 * 提现列表页信息
 */
export const withdrawListMoney = () =>
http({
  url: 'api/entrepreneur/cashInMoney',
  method: 'get'
})

/**
 *  获取收益列表数据
 *
 */
export const getFinanceList = (params) =>
http({
  url: 'api/entrepreneur/water/list',
  method: 'get',
  params
})

/**
 * 获取收益详情
 */
export const getFinanceDetails = (id) =>
http({
  url: 'api/entrepreneur/water/info',
  method: 'get',
  params: {id}
})
