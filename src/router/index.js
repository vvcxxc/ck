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
        tabbar
      }
    },
    {
      path: '/entrepreneur',
      components: {
        default: getComponent("entrepreneur/entrepreneurs"),
        tabbar
      }
    },
    {
      path: '/supplier',
      components: {
        default: getComponent('supplier/suppliers'),
        tabbar
      }
    },
    {
      path: '/my',
      components: {
        default: getComponent('my/my'),
        tabbar
      }
    },
    {
      path: '/finance',
      components: {
        default: getComponent('finance/finance'),
        tabbar
      }
    },
    {
      path: "/bank",
      component: getComponent("my/bank/bank")
    },
    {
      path: "/configuration",
      component: getComponent("my/configuration/configurations")
    },
    {
      path: "/adProfit",
      component: getComponent("ad/adProfit/adProfit")
    },
    {
      path: '/couponProfit',
      component: getComponent('coupon/coupon-profit/coupon-profit')
    },
    {
      path: "/rates",
      component: getComponent("rate/rates")
    },
    {
      path: "/login",
      component: getComponent("login/login")
    },
    {
      path: '/integral_records',
      component: getComponent('integral/record')
    },
    {
      path: '/supplier/split_fee_set',
      component: getComponent('supplier/splitFeeSet')
    },
		{
		  path: '/entrepreneur/split_fee_set',
		  component: getComponent('entrepreneur/splitFeeSet')
		},
    {
      path: '/ck/register',
      component: getComponent('common/ck_register')
    },    
    {
      path: '/president/inviteEntrepreneur',
      component: getComponent('president/inviteEntrepreneur')
    },
  ]
})
