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

  import { LoadMore } from "vux"
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

    },
    components: {
      LoadMore
    },
    methods: {
      fetchWithdrawRecord() {
        withdrawRecord().then(({ data, code, meta }) => {
          if(!code){
            this.withdraws = data
          }
        }).catch(err => console.log(err))
      }
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