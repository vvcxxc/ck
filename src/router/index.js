import Vue from "vue"
import Router from "vue-router"

const getComponent = path => r => require(['@/view/' + path], r)

const tabbar = () =>
  import("@components/c-tabbar/tabbar")

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      components: {
        default: getComponent("index/index"),
        tabbar,

      },
      meta: { keepAlive: false }
    },
    {
      path: '/entrepreneur',
      components: {
        default: getComponent("entrepreneur/entrepreneurs"),
        tabbar,

      },
      meta: { keepAlive: false }
    },
    {
      path: '/supplier',
      components: {
        default: getComponent('supplier/suppliers'),
        tabbar,

      },
      meta: { keepAlive: false }
    },
    {
      path: '/my',
      components: {
        default: getComponent('my/my'),
        tabbar,
      },
      meta: { keepAlive: false }
    },
    {
      path: '/finance',
      components: {
        default: getComponent('finance/finance'),
        tabbar,

      },
      meta: { keepAlive: false }
    },
    {
      path: "/bank",
      component: getComponent("my/bank/bank"),
      meta: { keepAlive: false }
    },
    {
      path: "/submitQua",
      component: getComponent("submitQua"),
      meta: { keepAlive: false }
    },
    {
      path: "/submitQua/bankBind",
      component: getComponent("submitQua/bankBind"),
      meta: { keepAlive: false }
    },
    {
      path: "/submitQua/confirmWithdraw",
      component: getComponent("submitQua/confirmWithdraw"),
      meta: { keepAlive: false }
    },
    {
      path: "/submitQua/editBank",
      component: getComponent("submitQua/editBank"),
      meta: { keepAlive: false }
    },
    {
      path: "/submitQua/result",
      component: getComponent("submitQua/result"),
      meta: { keepAlive: false }
    },
    {
      path: "/configuration",
      component: getComponent("my/configuration/configurations"),
      meta: { keepAlive: false }
    },
    {
      path: "/adProfit",
      component: getComponent("ad/adProfit/adProfit"),
      meta: { keepAlive: false }
    },
    {
      path: '/couponProfit',
      component: getComponent('coupon/coupon-profit/coupon-profit'),
      meta: { keepAlive: false }
    },
    {
      path: "/rates",
      component: getComponent("rate/rates"),
      meta: { keepAlive: false }
    },
    {
      path: "/login",
      component: getComponent("login/login"),
      meta: { keepAlive: false }
    },
    {
      path: '/integral_records',
      component: getComponent('integral/record'),
      meta: { keepAlive: false }
    },
    {
      path: '/supplier/split_fee_set',
      component: getComponent('supplier/splitFeeSet'),
      meta: { keepAlive: false }
    },
		{
		  path: '/entrepreneur/split_fee_set',
      component: getComponent('entrepreneur/splitFeeSet'),
      meta: { keepAlive: false }
		},
    {
      path: '/ck/register',
      component: getComponent('common/ck_register'),
      meta: { keepAlive: false }
    },
    {
      path: '/ck/resignSccess',
      component: getComponent('common/resign_sccess'),
      meta: { keepAlive: false }
    },
    {
      path: '/president/inviteEntrepreneur',
      component: getComponent('president/inviteEntrepreneur'),
      meta: { keepAlive: false }
    },
    {
      path: '/index/open_withdrawal',//开通电子账户
      component: getComponent('index/open_withdrawal'),
      meta: { keepAlive: false }
    },
    {
      path: '/index/withdraw',
      component: getComponent('index/withdraw'),
      meta: { keepAlive: false }
    },
    {
      path: '/index/withdrawList',
      component: getComponent('index/withdrawList'),
      meta: { keepAlive: false }
    },
    {
      path: '/index/withdrawList/details',
      component: getComponent('index/withdrawList/details'),
      meta: { keepAlive: false }
    },
    {
      path: '/finance/detailsList',
      component: getComponent('finance/detailsList'),
      meta: { keepAlive: false }
    },
    {
      path: '/finance/details',
      component: getComponent('finance/details'),
      meta: { keepAlive: false }
    },
    {
      path: '/my/card_new',
      component: getComponent('my/card_new'),
      meta: { keepAlive: false }
    },
    {
      path: '/my/bank_card_bind',
      component: getComponent('my/bank_card_bind'),
      path: '/completeInformation/IdCard',
      component: getComponent('completeInformation/IdCard'),
      meta: { keepAlive: false }
    },
    {
      path: '/completeInformation/bankCard',
      component: getComponent('completeInformation/bankCard'),
      meta: { keepAlive: false }
    }
  ]
})
