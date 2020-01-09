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
      <van-tab title=" "></van-tab>
    </van-tabs>
    <ReturnsFilte :type_="meta"  />
  </div>
</template>
<script type="text/javascript">
  import ReturnsFilte from "./component/returns_filte";

  export default {
    name: "balance",
    data() {
      return {
        active: 0,
        meta:0,
        returns_filter: ["日收益", "月收益", "年收益", "总收益"]
      };
    },
    components: {
      ReturnsFilte
    },
    created() {},
    methods: {
      chooseTimeData(data) {
        console.log(data, "data");
      },
      returnsFilter(data, dd) {
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
