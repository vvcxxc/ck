<template>
  <tabbar class="tabbarbox">
    <tabbar-item @on-item-click="change"
                 link="/home"
                 :class="currentRouter == 0 ? 'weui-bar__item_on' : ''">
      <i slot="icon"
         class="iconfont icon-home"></i>
      <span slot="label">首页</span>
    </tabbar-item>
    <tabbar-item @on-item-click="change"
                 link="/balance">
      <i slot="icon"
         class="iconfont icon-icon-"></i>
      <span slot="label">{{$t('tabbarTxt.balance')}}</span>
    </tabbar-item>
    <tabbar-item @on-item-click="change"
                 link="/shop"
                 v-if="role_type == 'entrepreneur'">
      <i slot="icon"
         class="iconfont icon-dianpu"></i>
      <span slot="label">{{$t('tabbarTxt.shop')}}</span>
    </tabbar-item>

    <tabbar-item @on-item-click="change"
                 link="/supplier"
                 v-if="role_type == 'president'">
      <i slot="icon"
         class="iconfont icon-mendianguanli"></i>
      <span slot="label">{{$t('tabbarTxt.store')}}</span>
    </tabbar-item>

    <tabbar-item @on-item-click="change"
                 link="/member">
      <i slot="icon"
         class="iconfont icon-huiyuanpengyou"></i>
      <span slot="label">{{$t('tabbarTxt.member')}}</span>
    </tabbar-item>
    <tabbar-item @on-item-click="change"
                 link="/self">
      <i slot="icon"
         class="iconfont icon-wode"></i>
      <span slot="label">{{$t('tabbarTxt.self')}}</span>
    </tabbar-item>
  </tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      currentRouter: 0
    }
  },
  components: {
    Tabbar,
    TabbarItem
  },
  methods: {
    change (val) {
      // console.log(val)
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
<style lang="scss" scoped>
</style>
