<template>
  <div class="rate">
    <x-header title="费率返点" :left-options="{preventGoBack: true}" @on-click-back="handleHide"></x-header>
    
    <c-scroll class="rate-wrapper">
      <div class="container">
        <group>
          <x-table full-bordered :cell-bordered="false" style="background-color:#fff;">
            <thead>
              <tr>
                <th class="rate-title">订单</th>
                <th class="rate-title">时间</th>
                <th class="rate-title">店铺</th>
                <th class="rate-title">金额</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in rates" :key="index" class="rate-item-wrapper">
                <td class="rate-item">{{item.order_sn || '无'}}</td>
                <td class="rate-item">{{item.created_at || '无'}}</td>
                <td class="rate-item">{{item.supplier_name}}</td>
                <td class="rate-item">{{item.amount || '0'}}元</td>
              </tr>
            </tbody>
          </x-table>
        </group>
      </div>
    </c-scroll>
  </div>
</template>
<script>
  import { rates } from "@api/api"
  import { XTable, dateFormat } from 'vux'
  import { mapGetters } from 'vuex'
  import CScroll from "@components/c-scroll/scroll"
  export default {
    data() {
      return {
        dateFormat,
        rates: []
      }
    },
    components: {
      XTable,
      CScroll
    },
    methods: {
      handleHide() {
        this.$emit('on-hide')
      },
      fetchRate() {
        const params = {
          role_type: this.role_type
        }
        rates(params).then(({ data, meta }) => {
          this.rates = data
        }).catch(err => {
          console.log(err)
        })
      }
    },
    created() {
      this.fetchRate()
    },
    computed: {
      ...mapGetters(['role_type']),
      searchParams() {
        return {
          begin_time: new Date(this.beginTime).getTime(),
          end_time: new Date(this.endTime).getTime()
        }
      },
      ratePointMoney() {
        return (Math.random() / 10).toFixed(3)
      }
    }
  }
</script>
<style lang="sass" scoped>
  @import "./style"
</style>