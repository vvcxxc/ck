<template>
  <div class="balance">
    <x-header title="财务管理"
              :left-options="{showBack: false}"></x-header>
    <c-scroll class="scroll-wrapper">
      <div class="container">
        <div class="widthdrawHistory">
          <div class="zw-list-container-img">
            <div class="zw-list-title">
              <p>{{'提现记录共有: ' + withdraws.length + ' 条'}}</p>
            </div>
            <div class="zw-list-item" v-for="(item, index) in withdraws" :key="index">
              <div class="zw-list-item-content">
                <div class="zw-detail" style="padding-left: 0">
                  <div class="zw-detail-item zw-detail-1">{{'提现金额 '+item.money}}</div>
                  <div class="zw-detail-item zw-detail-2">{{item.status}}</div>
                  <div class="zw-detail-item zw-detail-3">
                    <div>
                      <span>{{item.from_date}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <load-more v-if="!withdraws.toString()" :show-loading="false" :tip="'暂无数据'" background-color="#fff"></load-more>
        </div>
      </div>
    </c-scroll>
  </div>
</template>
<script type="text/javascript">

import { XHeader } from "vux"
import { LoadMore } from "vux"
import { withdrawRecord } from "@api/api"
import CScroll from "@components/c-scroll/scroll"

// import PWithdrawRecord from "./withdrawRecord/withdrawRecord"
const REQUEST_OK = 200
export default {
  name: 'balance',
  data () {
    return {
      withdraws: []
    }
  },
  components: {
    XHeader,
    // PWithdrawRecord
    CScroll,
    LoadMore
  },
  created() {
    this.fetchWithdrawRecord()
  },
  methods: {
    fetchWithdrawRecord() {
      withdrawRecord().then(({ data, code, meta }) => {
        if(!code){
          this.withdraws = data
        }
      }).catch(err => console.log(err))
    }
  }
}
</script>
<style lang="sass" scoped>
@import "@/style/mixin.scss"

$px_5: 5px
$px_10: 10px
$px_12: 12px
$px_46: 46px
$px_53: 53px
$pc_50: 50%
$pc_100: 100%

@mixin scroll-wrapper($top: 46px, $bottom: 53px)
  position: absolute
  top: $top
  width: $pc_100
  bottom: $bottom
  overflow: hidden
.balance
  font-size: $px_12
  height: $pc_100
  .scroll-wrapper
    @include scroll-wrapper
    margin-top: $px_5
    .container
      // padding-bottom: $px_53
</style>
