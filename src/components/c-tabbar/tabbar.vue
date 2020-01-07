<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item
      name="index"
      icon="home-o"
      to="/index"
    >
    首页
    </van-tabbar-item>
    <van-tabbar-item
      name="finance"
      icon="search"
      to="/finance"
    >
    收益
    </van-tabbar-item>
    <van-tabbar-item
      name="supplier"
      icon="friends-o"
      to="/supplier"
    >
    店铺
    </van-tabbar-item>
    <van-tabbar-item
      v-if="role_type == 'president'"
      name="entrepreneur"
      icon="setting-o"
      to="/entrepreneur"
    >
    创客
    </van-tabbar-item>
    <van-tabbar-item
      name="my"
      icon="setting-o"
      to="/my"
    >
    我的
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";
 import { mapGetters, mapState } from 'vuex'
Vue.use(Tabbar).use(TabbarItem);
const ROLE_PRESIDENT = 'president'
const ROLE_ENTREPRENEUR = 'entrepreneur'
export default {
  data() {
    return {
      active: 'index'
    };
  },
  computed: {
    ...mapGetters(['role_type']),
  }
};
</script>

<style lang="sass" scoped>
</style>
