<template>
  <div class="balance">
    <van-nav-bar :border="false" title="收益信息" />
    <van-tabs
      v-model="active"
      :swipe-threshold="6"
      @click="returnsFilter"
      color="#fff"
      background="#5091DD"
      title-inactive-color="#fff"
      title-active-color="#fff"
    >
      <van-tab title="日收益" >
        <!-- <ReturnsFilte :typet="55"/> -->
      </van-tab>
      <van-tab title="月收益">
        <!-- <ReturnsFilte :typet="554"/> -->
      </van-tab>
      <van-tab title="年收益">
        <!-- <ReturnsFilte :typet="77"/> -->
      </van-tab>
      <van-tab title="总收益" >
        <!-- <ReturnsFilte :typet="988"/> -->
      </van-tab>
      <van-tab title=" " disabled></van-tab>
    </van-tabs>
    <ReturnsFilte :type_="this.meta"  />
  </div>
</template>
<script type="text/javascript">
  import store from "@/store/index"
  import ReturnsFilte from "./component/returns_filte";

  export default {
    name: "balance",
    data() {
      return {
        active: 3,
        meta:3,
        returns_filter: ["日收益", "月收益", "年收益", "总收益"],

      };
    },
    mounted () {
      let Index = Number(store.state.ql.Index)
      this.meta = Index
      this.active = Index
   },
    components: {
      ReturnsFilte,
      window
    },
    methods: {
      returnsFilter(data, dd) {
        store.dispatch("ql/writeIndex",  data)
        this.meta=data
      }
    }
  };
</script>
<style lang="sass" scoped>
.balance
  height: 100vh
  width: 100vw
  background:url('../../assets/earnings_bg.png')
  background-repeat: no-repeat
  background-size: 100%
  overflow: hidden
  /deep/ .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after
    border: none
  /deep/ .van-ellipsis
    font-size: 14px
  /deep/ .van-tab--active
    font-size: 18px
.van-nav-bar
    background-color: #5091DD
    border-bottom: none
    .van-nav-bar__title
      font-size: 18px
      font-family: Adobe Heiti Std
      font-weight: normal
      color: rgba(233,238,242,1)
      .van-tab__text
        font-size: 14px
        font-family: Adobe Heiti Std
        font-weight: normal
        color: rgba(255,255,255,1)
      .van-tab--active
        font-size: 14px
        font-family: Adobe Heiti Std
        font-weight: normal
        color: rgba(255,255,255,1)

</style>
