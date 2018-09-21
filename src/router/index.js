import Vue from "vue"
import Router from "vue-router"

const getComponent = path => r => require(["@/pages/" + path], r)
const new_getComponent = path => r => require(['@/view/' + path], r)

const tabbar = () =>
  import("@components/c-tabbar/tabbar")

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      components: {
        default: getComponent("home/home"),
        tabbar
      },
      children: [
      {
        path: "article",
        component: getComponent("home/children/article")
      }]
    },
    {
      path: "/self",
      name: "我的",
      components: {
        default: getComponent("self/self"),
        tabbar
      }
    },
    {
      path: "/login",
      name: "login",
      component: getComponent("login/login")
    },
    {
      path: "/shop",
      components: {
        default: getComponent("shop/shops"),
        tabbar
      },
      redirect: "shop/shoplist",
      children: [
      {
        path: "shoplist",
        component: getComponent("shop/children/shoplist")
      },
      {
        path: "/shopDetails",
        component: getComponent("shop/children/shopDetails")
      }]
    },
    {
      path: "/member",
      components: {
        default: getComponent("member/members"),
        tabbar
      },
      children: [
      {
        path: "memberDetails",
        component: getComponent("member/children/memberDetails"),
        name: "memberDetails"
      }]
    },
    {
      path: "/finance",
      components: {
        default: getComponent("finance/finance"),
        tabbar
      },
      // redirect: "finance/profitShareHistory",
      // children: [
      //   {
      //     path: "profitShareHistory",
      //     component: getComponent("balance/children/profitShareHistory"),
      //     name: "profitShareHistory"
      //   },
      //   {
      //     path: "withdrawHistory",
      //     component: getComponent("balance/children/withdrawHistory"),
      //     name: "withdrawHistory"
      //   }
      // ]
    },
    // {
    //   path: "/selfDetails",
    //   component: getComponent("self/detail"),
    //   children: [
    //   {
    //     path: "modifyPassword",
    //     component: getComponent("self/children/modifyPassword")
    //   }]
    // },
    // {
    //   path: "/supplier",
    //   components: {
    //     default: getComponent("supplier/suppliers"),
    //     tabbar
    //   },
    //   children: [
    //     {
    //       path: "supplierDetails",
    //       component: getComponent("supplier/children/supplierDetails"),
    //       name: "supplierDetails"
    //     }
    //   ]
    // },
    // {
    //   path: "/advertisementEarnings",
    //   component: getComponent("advertisement/advertisementEarnings"),
    //   children: [
    //   {
    //     path: "advertisementEarningsDetails",
    //     component: getComponent("advertisement/advertisementEarningsDetails")
    //   }]
    // },
    // {
    //   path: "/ratePoint",
    //   component: getComponent("ratePoint/ratePoints")
    // },
    {
      path: "/couponEarnings",
      component: getComponent("coupon/coupon-earnings")
    },
    // this is reconfiguration ..
    {
      path: '/entrepreneur',
      components: {
        default: new_getComponent("entrepreneur/entrepreneurs"),
        tabbar
      }
    },
    {
      path: '/supplier',
      components: {
        default: new_getComponent('supplier/suppliers'),
        tabbar
      }
    },
    {
      path: '/my',
      components: {
        default: new_getComponent('my/my'),
        tabbar
      }
    },
    {
      path: "/bank",
      component: new_getComponent("my/bank/bank"),
      children: [
        {
          path: "bankBind",
          component: new_getComponent("my/bank/bank-bind")
        }
      ]
    },
    {
      path: "/configuration",
      component: new_getComponent("my/configuration/configurations"),
      children: [
      {
        path: "modifyPassword",
        component: new_getComponent("my/configuration/modify-password")
      }]
    },
    {
      path: "/adProfit",
      component: new_getComponent("ad/adProfit/adProfit"),
      children: [
      {
        path: "adProfitDetail",
        component: new_getComponent("ad/adProfit/adProfitDetail")
      }]
    },
    {
      path: '/couponProfit',
      component: new_getComponent('coupon/coupon-profit/coupon-profit')
    },
    {
      path: "/rates",
      component: new_getComponent("rate/rates")
    },
  ]
})