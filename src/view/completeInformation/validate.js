let data = {
  id: 'id',
  party_id: 'party_id',
  identity_card_positive: '身份证正面照',
  identity_card_opposite: '身份证反面照',
  hand_identity_card: '手持身份证照',
  name: '姓名',
  identity_card: '身份证号不能为空',
  validity_card: '身份证有效期',
  positive: '银行卡正面',
  opposite: '银行卡反面',
  bank_account_user_name: '开户人',
  bank_card_number: '银行卡号',
  bank_name: '开户行',
  bank_branch: '支行名称'
}
export default function Validate(info) {
  // 验证完善资料
  // 验证是否为空
  for (let i in info) {
    if (!info[i] && info[i] != undefined) {
      for (let a in data) {
        if (a == i) {
          return data[a]
        }
      }
    }
  }

  return false
}
