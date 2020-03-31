import http from '../../api/http';

//  添加身份证银行卡信息
export const createInfo = data => http({
  url: 'api/entrepreneur/ck_createInfo',
  method: 'post',
  data
})

//  编辑身份证银行卡信息
export const editInfo = data => http({
  url: 'api/entrepreneur/ck/updateInfo',
  method: 'post',
  data
})

//  获取状态
export const getStatus = () => http({
  url: 'api/entrepreneur/index',
  method: 'get'
})

//  获取银行卡手机号验证码
export const getBankCode = phone => http({
  url: 'api/entrepreneur/v4/sq/send_sms_code',
  method: 'post',
  data: {
    phone
  }
})

//  绑定银行卡
export const bindBankCard = data => http({
  url: 'api/entrepreneur/v4/sq/bind_card',
  method: 'post',
  data
})

//  获取自动提现验证码
export const getAutoCode = data => http({
  url: 'api/entrepreneur/v4/sq/send_sms_auto',
  method: 'post',
  data
})

//  开启自动提现
export const openAuto = data => http({
  url: 'api/entrepreneur/v4/sq/confirm_auto',
  method: 'post',
  data
})

//   获取银行卡信息
export const getBankInfo = phone => http({
  url: 'api/entrepreneur/v4/sq/bank_card_info',
  method: 'get',
  params: {
    phone: phone
  }
})

//   首页获取手机号
export const getIndexInfo = () => http({
  url: 'api/entrepreneur/index',
  method: 'get'
})

// 获取修改银行卡的信息
export const getEditBankInfo = () => http({
  url: 'api/entrepreneur/ck_bank',
  method: 'get'
})

//  修改银行卡
export const editBank = (id,data) => http({
  url: 'api/entrepreneur/ck_update_bank/'+ id,
  method: 'put',
  data
})

//  获取银行卡列表
export const getBankList = () => http({
  url: 'v3/bank_name',
  method: 'post'
})
