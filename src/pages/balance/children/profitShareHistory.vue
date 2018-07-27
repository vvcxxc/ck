<template>
  <div class="profitSharebox">
    <div v-infinite-scroll="loadMoreData"
         :infinite-scroll-disabled="loading"
         infinite-scroll-distance="0"
         infinite-scroll-immediate-check="false"
         class="zw-list-container-img">
      <div class="zw-list-title">
        <p>{{'提现记录共有: '+(profitShareMetaInfo.total || 0) + ' 条'}}</p>
      </div>
      <div class="zw-list-item"
           style="line-height: 100%"
           v-for="(item, index) in profitShareData"
           :key="index">
        <div class="zw-list-item-content">
          <div class="zw-detail">
            <div class="zw-detail-item zw-detail-1">{{item.order_sn}}</div>
            <div class="zw-detail-item zw-detail-2">{{item.amount}}</div>
            <div class="zw-detail-item zw-detail-3">
              {{!!item.is_receive ? '已结算' : '未结算'}}
            </div>
            <div class="zw-detail-item">
              {{item.receive_time}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <load-more v-if="!profitShareData.toString()"
               :show-loading="false"
               :tip="'暂无数据'"
               background-color="#fff"></load-more>
  </div>
</template>
<script type="text/javascript">
import { profitShareHistory } from '~api/self'
import { mapState } from 'vuex'
export default {
  name: 'profitShareHistory',
  data () {
    return {
      profitShareData: [],
      page: 2,
      close: true,
      loading: false
    }
  },
  components: {

  },
  created () {

    this._profitShareHistory()
  },
  methods: {
    loadMoreData () {
      this.loading = true

      if (this.page > this.profitShareMetaInfo.total_pages) {
        this.$vux.toast.text('已没有更多记录', 'middle')
        return false
      }
      this._loadMore()
    },
    _profitShareHistory () {

      profitShareHistory()
        .then(({ code, message, data, meta }) => {
          if (!code) {

            this.profitShareData = data

            let { pagination } = meta

            this.$store.state.profitShareMetaInfo = pagination
          }
        })
    },
    _loadMore () {
      profitShareHistory({ page: this.page })
        .then(({ code, meta, data }) => {
          if (!code) {
            this.profitShareData = [...this.profitShareData, ...data]
          }
          this.page++
          this.loading = false
        })
    },
    autoClose () {
      setTimeout(() => {
        this.close = false
        // console.log(!this.close)
      }, 5000)
    }
  },
  computed: {
    ...mapState(['profitShareMetaInfo'])
  }
}

</script>
<style lang="scss">
@import "~style/mixin";
.profitSharebox {
  // @include xallcover(102);
  padding-bottom: 0;
  .zw-detail {
    padding-left: 0;
  }
}
</style>
