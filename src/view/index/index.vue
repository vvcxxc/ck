<template>
  <div class="index">
    <div class="container">
      <van-nav-bar :border="false" title="首页" />
      <div class="bj"></div>
      <div class="header">
        <div class="header-l">
          <p class="header-l-title">余额</p>
          <p class="header-l-money">88.00</p>
        </div>
        <div class="header-r">
          <p class="header-r-title">
            提现明细
            <van-icon name="arrow" />
          </p>
          <div class="header-r-btn">提现</div>
        </div>
      </div>

      <div class="info">
        <div class="grid">
          <div class="item">
            <p class="money">200.00</p>
            <p class="label">今日收益</p>
          </div>
          <div class="item">
            <p class="money">102</p>
            <p class="label">邀请的店铺</p>
          </div>
          <div class="item">
            <p class="money">200</p>
            <p class="label">邀请的创客</p>
          </div>
        </div>

        <div class="invite-box">
          <div class="invite-botton">
            <i class="icon store" />
            <div>邀请店铺</div>
          </div>
          <div class="invite-botton">
            <i class="icon people" />
            <div>邀请创客</div>
          </div>
        </div>
      </div>

      <div class="top-box">
        <div class="top-tab">
          <div class="tab" @click="tabClick(0)">
            <div :class="tab == 0 ? 'actived' : ''">创客排行榜</div>
          </div>
          <div class="tab" @click="tabClick(1)">
            <div :class="tab ==1 ? 'actived' : ''">店铺排行榜</div>
          </div>
        </div>

        <div class="top-list">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="list-item">
              <div class="item-name">杨大富</div>
              <div class="item-phone">13078881111</div>
              <div class="item-money">3214</div>
            </div>
          </van-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { Vue, Component } from "vue-property-decorator";
// import { Getter } from "vuex-class";
import { NavBar, Icon, List } from "vant";
import checkLogin from "@/decorator/check_login";
import { getPeopleTopList, getStoreTopList } from "@api/api";
import { mapGetters } from "vuex";
const REQUEST_OK = 200;
const ZERO = 0;
// @Component({
//   components: {
//   }
// })
// export default class Index extends Vue {
//   @Getter("role_type") getterRoleType;
//   @checkLogin
//   created() {
//     const token = window.localStorage.getItem("token");
//     if (!token) {
//       this.$router.push("/login");
//     }
//   }
//   tabClick = () => {
//     console.log(this.$ref)
//   }
// }

export default {
  data() {
    return {
      tab: 0,
      list: [],
      loading: false,
      finished: false
    };
  },
  computed: {
    ...mapGetters(["role_type"])
  },
  created() {
    const token = window.localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
    }
    this.getStoreTop()
  },
  methods: {
    tabClick(index) {
      // index=0 为创客排行榜 =1为店铺排行榜
      this.tab = index;
    },
    onLoad() {
      // 异步更新数据
      this.finished = true;
    },
    // 获取创客排行榜
    getPeopleTop (){
      let page = 1
      getPeopleTopList(page).then(res => {
        console.log(res)
        this.loading = false;
        this.list = res.data
        if(res.pagination.current_page == res.pagination.total_pages || res.pagination.total == null){
          this.finished = true
        }
      })
    },
    // 获取店铺排行榜
    getStoreTop (){
      let page = 1
      getStoreTopList(page).then(res => {
        console.log(res)
         this.loading = false;
        this.list = res.data
        if(res.pagination.current_page == res.pagination.total_pages || res.pagination.total == null){
          this.finished = true
        }
      })
    }
  }
};
</script>
<style lang="sass" scoped>
  @import './index'
</style>
