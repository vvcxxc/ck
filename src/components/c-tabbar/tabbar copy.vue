<template>
  <tabbar class="tabbarbox" v-show="showTabbar" style="position: fixed">
    <tabbar-item v-for="(item, index) in tabMenus" :key="index" :selected="currentRouter == index" v-if="Object.keys(item).length" :link="item.link">
      <i slot="icon" :class="['iconfont', item.icon]"></i>
      <span slot="label">{{item.text}}</span>
    </tabbar-item>
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
      showTabbar() {
        return ['/index', '/finance', '/supplier', '/entrepreneur', '/my'].includes(this.$route.path)
      },
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

<style lang="sass" scoped>
// $px_53: 53px
// .tabbarbox
//   flex: 0 0 $px_53
//   height: $px_53
</style>
