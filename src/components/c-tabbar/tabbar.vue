<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item
      v-for="(item,index) in list"
      :key='index'
      :name="item.name"
      :to="item.path"
    >
    <img
      slot="icon"
      slot-scope="props"
      :src="props.active ? item.inactive : item.active"
    >
    {{item.label}}
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from "vant";
 import { mapGetters, mapState } from 'vuex'

const ROLE_PRESIDENT = 'president'
const ROLE_ENTREPRENEUR = 'entrepreneur'
export default {
  data() {
    return {
      active: 'index',
      list: [
        {
          name: 'index',
          label: '首页',
          path: '/index',
          active: 'static/img/no-index.png',
          inactive: 'static/img/index.png'
        },
        {
          name: 'finance',
          label: '收益',
          path: '/finance',
          active: 'static/img/no-finance.png',
          inactive: 'static/img/finance.png'
        },
        {
          name: 'supplier',
          label: '店铺',
          path: '/supplier',
          active: 'static/img/no-store.png',
          inactive: 'static/img/store.png'
        },
        {
          name: 'entrepreneur',
          label: '创客',
          path: '/entrepreneur',
          active: 'static/img/no-people.png',
          inactive: 'static/img/people.png'
        },
        {
          name: 'my',
          label: '我的',
          path: '/my',
          active: 'static/img/no-my.png',
          inactive: 'static/img/my.png'
        },
      ]
    };
  },
  computed: {
    ...mapGetters(['role_type']),
  },
  created(){
    if(this.role_type == 'entrepreneur'){
      this.list = [
        {
          name: 'index',
          label: '首页',
          path: '/index',
          active: 'static/img/no-index.png',
          inactive: 'static/img/index.png'
        },
        {
          name: 'finance',
          label: '收益',
          path: '/finance',
          active: 'static/img/no-finance.png',
          inactive: 'static/img/finance.png'
        },
       {
          name: 'supplier',
          label: '店铺',
          path: '/supplier',
          active: 'static/img/no-store.png',
          inactive: 'static/img/store.png'
        },
        {
          name: 'my',
          label: '我的',
          path: '/my',
          active: 'static/img/no-my.png',
          inactive: 'static/img/my.png'
        },
      ]
    }
  }
};
</script>

<style lang="sass" scoped>
</style>
