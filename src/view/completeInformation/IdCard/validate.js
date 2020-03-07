import {Validator} from '../../../utils/common'
let data1 = {
  id: 'id',
  party_id: 'party_id',
  identity_card_positive: '身份证正面照',
  identity_card_opposite: '身份证反面照',
  identity_hand_card: '手持身份证照',
  identity_name: '姓名',
  identity_card: '身份证号不能为空',
  identity_validity_card: '身份证有效期',
}
export default function ValidateIDCard (info) {
  // 验证完善资料
  // 验证是否为空
  console.log(info)
  for (let i in info) {
    if (!info[i] && info[i] != undefined) {
      for (let a in data1) {
        if (a == i) {
          return `${data1[a]}不能为空`
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
  let errmsg = validator.start();
  if (errmsg){
    return errmsg;
  }else {
    return false
  }
}
