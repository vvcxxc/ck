<template>
  <tabbar class="tabbarbox" v-show="isHideTabbar">
    <tabbar-item v-for="(item, index) in tabMenus" :key="index" :selected="currentRouter == index" v-if="Object.keys(item).length" :link="item.link">
      <i slot="icon" :class="['iconfont', item.icon]"></i>
      <span slot="label">{{item.text}}</span>
    </tabbar-item>
    <!-- <tabbar-item @on-item-click="handleToggle" link="/home" :class="currentRouter == 0 ? 'weui-bar__item_on' : ''">
      <i slot="icon" class="iconfont icon-home"></i>
      <span slot="label">首页</span>
    </tabbar-item>
    <tabbar-item @on-item-click="handleToggle" link="/balance" :class="currentRouter == 1 ? 'weui-bar__item_on' : ''">
      <i slot="icon" class="iconfont "></i>
      <span slot="label">财务</span>
    </tabbar-item>

    <tabbar-item @on-item-click="handleToggle" link="/supplier" :class="currentRouter == 2 ? 'weui-bar__item_on' : ''">
      <i slot="icon" class="iconfont icon-mendianguanli"></i>
      <span slot="label">店铺</span>
    </tabbar-item> -->

    <!-- <tabbar-item @on-item-click="handleToggle"
                 link="/member"
                 :class="currentRouter == 3 ? 'weui-bar__item_on' : ''">
      <i slot="icon"
         class="iconfont icon-huiyuanpengyou"></i>
      <span slot="label">会员</span>
    </tabbar-item> -->
    <!-- <tabbar-item @on-item-click="handleToggle" link="/self" :class="currentRouter == 3 ? 'weui-bar__item_on' : ''">
      <i slot="icon" class="iconfont icon-wode"></i>
      <span slot="label">我的</span>
    </tabbar-item>
    <tabbar-item @on-item-click="handleToggle" link="/shop" :class="currentRouter == 4 ? 'weui-bar__item_on' : ''" v-if="role_type == president">
      <i slot="icon" class="iconfont icon-dianpu"></i>
      <span slot="label">创客</span>
    </tabbar-item> -->
  </tabbar>
</template>
<script>
  import { Tabbar, TabbarItem } from 'vux'
  import { mapGetters, mapState } from 'vuex'

  const ROLE_PRESIDENT = 'president'
  const ROLE_ENTREPRENEUR = 'entrepreneur'

  export default {
    data() {
      return {
        currentRouter: 0
      }
    },
    components: {
      Tabbar,
      TabbarItem
    },
    methods: {
      handleToggle(val) {
        this.currentRouter = val
      }
    },
    computed: {
      ...mapState(['isHideTabbar']),
      ...mapGetters(['role_type']),
      tabMenus() {
        return [{
            text: '首页',
            icon: 'icon-home',
            link: '/index'
          }, {
            text: '财务',
            icon: 'icon-icon-',
            link: '/finance'
          }, {
            text: '店铺',
            icon: 'icon-mendianguanli',
            link: '/supplier'
          },
          this.role_type === ROLE_PRESIDENT ?
          {
            text: '创客',
            icon: 'icon-dianpu',
            link: '/entrepreneur'
          } : {},
          {
            text: '我的',
            icon: 'icon-wode',
            link: '/my'
          }
        ]
      }
    }
  }
</script>