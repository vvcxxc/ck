import * as types from './mutation-type'

import Vue from 'vue'

import {
  login,
  memberDetails,
  shopDetails,
  profitDetails,
  authUser,
  supplierDetails
} from '~api/self'

export default {
  login({ commit, state }, params) {
    login(params).then(({ code, data, message }) => {
      code && Vue.$vux.toast.text('登录成功')
      !code && commit(types.GET_TOKEN, data)
    })
  },
  authUser({ commit, state }, params) {
    authUser()
      // .then(({ code, data, message }) => {
      .then(res => {
        console.log(res)
      })
  },
  getMemberDetails({ commit, state }, params) {
    memberDetails(params).then(({ code, message, data }) => {
      // .then(res => {
      !code && commit(types.GET_MEMBER_INFO, ...data)
    })
  },
  getShopDetails({ commit, state }, params) {
    shopDetails(params).then(({ code, data, message }) => {
      !code && commit(types.GET_SHOP_INFO, ...data)
    })
  },
  getProfitDetails({ commit, state }, params) {
    profitDetails(params).then(({ data, code, message }) => {
      console.log(data)
      !code && commit(types.GET_PROFIT_INFO, data)
    })
  },
  getSupplierDetails({ commit, state }, params) {
    supplierDetails(params).then(res => {
      console.log(res)
    })
  }
}
