<template>
  <div class="coupon-earnings-box">
    <x-header title="现金券收益"></x-header>

    <!-- <x-scroll :http="http" :lastPage="lastPage" @listenEvent="receive"> -->
      <group :title="`一共有 ${total} 条记录`" v-if="!!dataCouponEarnings.length">
        <div class="container">
          <x-list v-if="!!dataCouponEarnings.length" v-for="(item, index) in dataCouponEarnings" :key="index">
            <p slot="main">单号: {{item.sn}}</p>
            <p slot="assist">分润: {{item.fee}}</p>
            <p slot="extra1">店铺: {{item.store_name || '暂无'}}</p>
            <p slot="extra2">信息: {{item.log_info}}</p>
            <p slot="extra3">时间: {{item.created_at}}</p>
            <p slot="extra4">券名: {{item.name || '无'}}</p>
          </x-list>
        </div>
      </group>

    <!-- </x-scroll> -->

    <load-more v-if="!dataCouponEarnings.length" :show-loading="false" slot="inn" :tip="'暂无数据'" background-color="#fff"></load-more>
  </div>
</template>

<script>
  // import { couponEarnings } from '~api/self'
  import { couponProfit } from "@api/api"
  import { routerTo } from '~utils/common'
  import XList from '~components/x-list'
  // import XScroll from '~components/x-scroll2'

  const REQUEST_OK = 200

  export default {
    data() {
      return {
        dataCouponEarnings: [],
        lastPage: 1,
        total: 0,
        // http: couponEarnings
      }
    },
    components: {
      XList,
      // XScroll
    },
    methods: {
      fetchCouponProfit() {

        couponProfit().then(({ code, data, last_page, total }) => {

          if (code == REQUEST_OK) {
            this.dataCouponEarnings = data
            this.lastPage = last_page
            this.total = total
          }
        }).catch(err => console.log(err))
      },
      // receive(data) {
      //   this.dataCouponEarnings = [...this.dataCouponEarnings, ...data]
      // },
      // getDetails() {

      // }
    },
    created() {
      this.fetchCouponProfit()
    }
  }
</script>

<style lang="sass" scoped>
  .coupon-earnings-box 
    display: flex 
    flex-direction: column // height: $pc_100
</style>