<template>
  <tabbar class="tabbarbox">
    <tabbar-item @on-item-click="handleToggle"
                 link="/home"
                 :class="currentRouter == 0 ? 'weui-bar__item_on' : ''">
      <i slot="icon"
         class="iconfont icon-home"></i>
      <span slot="label">首页</span>
    </tabbar-item>
    <tabbar-item @on-item-click="handleToggle"
                 link="/balance"
                 :class="currentRouter == 1 ? 'weui-bar__item_on' : ''">
      <i slot="icon"
         class="iconfont icon-icon-"></i>
      <span slot="label">财务</span>
    </tabbar-item>
    <tabbar-item @on-item-click="handleToggle"
                 link="/shop"
                 :class="currentRouter == 2 ? 'weui-bar__item_on' : ''"
                 v-if="role_type == ROLE_PRESIDENT">
      <i slot="icon"
         class="iconfont icon-dianpu"></i>
      <span slot="label">创客</span>
    </tabbar-item>

    <tabbar-item @on-item-click="handleToggle"
                 link="/supplier"
                 :class="currentRouter == 2 ? 'weui-bar__item_on' : ''">
      <i slot="icon"
         class="iconfont icon-mendianguanli"></i>
      <span slot="label">店铺</span>
    </tabbar-item>

    <tabbar-item @on-item-click="handleToggle"
                 link="/member"
                 :class="currentRouter == 3 ? 'weui-bar__item_on' : ''">
      <i slot="icon"
         class="iconfont icon-huiyuanpengyou"></i>
      <span slot="label">会员</span>
    </tabbar-item>
    <tabbar-item @on-item-click="handleToggle"
                 link="/self"
                 :class="currentRouter == 4 ? 'weui-bar__item_on' : ''">
      <i slot="icon"
         class="iconfont icon-wode"></i>
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux'
import { mapState } from 'vuex'

const ROLE_PRESIDENT = 'president'
const ROLE_ENTREPRENEUR = 'entrepreneur'


export default {
  data () {
    return {
      currentRouter: 0,
      president: ROLE_PRESIDENT
    }
  },
  components: {
    Tabbar,
    TabbarItem
  },
  methods: {
    handleToggle (val) {
      this.currentRouter = val
    }
  },
  computed: {
    ...mapState(['role_type'])
  },
  mounted () {
  }
}

</script>