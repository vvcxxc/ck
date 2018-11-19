<template>
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
</template>
<script type="text/javascript">
  // import { withDrawHistory } from '~api/self'
  // import { mapState } from 'vuex'
  import { withdrawRecord } from "@api/api"
  const REQUEST_OK = 200
  export default {
    name: 'withdrawHistory',
    data() {
      return {
        withdraws: []
      }
    },
    computed: {
      // ...mapState(['withdrawMetaInfo'])
    },
    components: {

    },
    methods: {
      fetchWithdrawRecord() {
        withdrawRecord().then(({ data, code, meta }) => {
          // console.log(res)
          if(!code){
            this.withdraws = data
          }
        }).catch(err => console.log(err))
      }
      // loadMoreData() {
      //   if (this.page > this.withdrawMetaInfo.total_pages) {
      //     this.$vux.toast.text('已没有更多记录', 'middle')

      //     return false;
      //   }
      //   this.loading = true
      //   withDrawHistory({ page: this.page })
      //     .then(({ code, meta, data }) => {
      //       if (!code) {
      //         this.withDrawData = [...this.withDrawData, ...data]
      //         this.page++
      //         this.loading = false
      //       }
      //     })
      // },
      // _withDrawHistory() {
      //   withDrawHistory()
      //     .then(({ code, meta, data }) => {
      //       if (!code) {
      //         this.withDrawData = data
      //         let { pagination } = meta
      //         this.$store.commit('WITHDRAW_META_INFO', pagination)
      //       }
      //     })
      // }
    },
    created() {
      this.fetchWithdrawRecord()
    }
  }
</script>
<style lang="scss">
  .widthdrawHistory .zw-detail {
    padding-left: 0;
  }
</style>