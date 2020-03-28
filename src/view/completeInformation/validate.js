import {Validator} from '../../utils/common'
let data = {
  id: 'id',
  identity_card_positive: '身份证正面照',
  identity_card_opposite: '身份证反面照',
  identity_hand_card: '手持身份证照',
  identity_name: '姓名',
  identity_card: '身份证号不能为空',
  identity_validity_card: '身份证有效期',
  bank_positive: '银行卡正面',
  bank_opposite: '银行卡反面',
  bank_account_name: '开户人',
  bank_card_number: '银行卡号',
  bank_name: '开户行',
  bank_branch: '支行名称'
}

export default function Validate(info)  {
  // 验证完善资料
  // 验证是否为空
  for (let i in info) {
    if (!info[i] && info[i] != undefined) {
      for (let a in data) {
        if (a == i) {
          return `${data[a]}不能为空`
        }
      }
    }
  }
  let validator = new Validator();
  validator.add(info.identity_name, [{
    validateRule: 'isChinese',
    errmsg: '请输入正确的名字'
  }])
  validator.add(info.identity_card, [{
    validateRule: 'isIDNumber',
    errmsg: '请输入正确的身份证号'
  }])
  validator.add(info.bank_account_name, [{
    validateRule: 'isChinese',
    errmsg: '请输入正确的开户人名字'
  }])
  validator.add(info.bank_card_number, [{
    validateRule: 'isBankNumber',
    errmsg: '请输入正确16-19位数字银行卡账号'
  }])
  validator.add(info.bank_branch, [{
    validateRule: 'isBankName',
    errmsg: '请输入正确开户支行名称'
  }])
  let errmsg = validator.start();
  if (errmsg){
    return errmsg;
  }else {
    return false
  }
}
