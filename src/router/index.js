import Vue from "vue"
import Router from "vue-router"
import { getComponent } from "~utils/common"

const tabbar = () => import("~components/Tabbar")

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
        }
      ]
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
        }
      ]
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
        }
      ]
    },
    {
      path: "/balance",
      components: {
        default: getComponent("balance/balance"),
        tabbar
      },
      redirect: "balance/profitShareHistory",
      children: [
        {
          path: "profitShareHistory",
          component: getComponent("balance/children/profitShareHistory"),
          name: "profitShareHistory"
        },
        {
          path: "withdrawHistory",
          component: getComponent("balance/children/withdrawHistory"),
          name: "withdrawHistory"
        }
      ]
    },
    {
      path: "/selfDetails",
      component: getComponent("self/detail"),
      children: [
        {
          path: "modifyPassword",
          component: getComponent("self/children/modifyPassword")
        }
      ]
    },
    {
      path: "/supplier",
      components: {
        default: getComponent("supplier/suppliers"),
        tabbar
      },
      children: [
        {
          path: "supplierDetails",
          component: getComponent("supplier/children/supplierDetails"),
          name: "supplierDetails"
        }
      ]
    },
    {
      path: "/bank",
      component: getComponent("self/bank"),
      children: [
        {
          path: "bankBind",
          component: getComponent("self/children/bankBind"),
          name: "bankBind"
        }
      ]
    },
    {
      path: "/advertisementEarnings",
      component: getComponent("advertisement/advertisementEarnings"),
      children: [
        {
          path: "advertisementEarningsDetails",
          component: getComponent("advertisement/advertisementEarningsDetails")
        }
      ]
    },
    {
      path: "/ratePoint",
      component: getComponent("ratePoint/ratePoint")
    },
    {
      path: "/couponEarnings",
      component: getComponent("coupon/coupon-earnings")
    }
  ]
})
