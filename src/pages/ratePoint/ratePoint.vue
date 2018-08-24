<template>
  <div class="advertisement">
    <x-header title="费率返点"></x-header>

    <x-scroll>
      <group slot="inn">
        <x-table full-bordered
                 :cell-bordered="false"
                 style="background-color:#fff;">
          <thead>
            <tr>
              <th class="rate-title">订单</th>
              <th class="rate-title">时间</th>
              <th class="rate-title">店铺</th>
              <th class="rate-title">金额</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in rates"
                :key="index"
                class="rate-item-wrapper">
              <td class="rate-item">{{item.order_sn || '无'}}</td>
              <td class="rate-item">{{item.created_at || '无'}}</td>
              <td class="rate-item">{{item.supplier_name}}</td>
              <td class="rate-item">{{item.amount || '0'}}元</td>
            </tr>
          </tbody>
        </x-table>
      </group>
    </x-scroll>
  </div>
</template>
<script>
import { ratePoint } from '~api/self'
import { XTable, dateFormat } from 'vux'
import { mapGetters } from 'vuex'
import XScroll from '~components/x-scroll2'
export default {
  data () {
    return {
      dateFormat,
      rates: [],
      beginTime: dateFormat(new Date().getTime(), 'YYYY-MM-DD'),
      endTime: dateFormat(new Date().getTime(), 'YYYY-MM-DD'),
      http: ratePoint,
      lastPage: '',
      total: ''
    }
  },
  components: {
    XTable,
    XScroll
  },
  methods: {
    handleBeginTime () {
      document.activeElement.blur()
      this.optionTime('begin')
    },
    handleEndTime () {
      document.activeElement.blur()
      this.optionTime('end')
    },
    optionTime (target) {
      let self_ = this
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD',
        onConfirm (val) {
          switch (target) {
            case 'begin':
              self_.beginTime = val
              break;
            case 'end':
              self_.endTime = val
              break;
          }
        }
      })
    },
    search () {
      this.fetchRate(this.searchParams)
    },
    fetchRate (searchParams = {}) {

      const params = {
        role_type: this.roleType,
        ...searchParams
      }

      ratePoint(params).then(({ data, meta }) => {
        this.rates = data
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.fetchRate()
  },
  computed: {
    ...mapGetters(['authUser', 'roleType']),
    searchParams () {
      return {
        begin_time: new Date(this.beginTime).getTime(),
        end_time: new Date(this.endTime).getTime()
      }
    },
    ratePointMoney () {
      return (Math.random() / 10).toFixed(3)
    }
  }
}
</script>
<style lang="sass" scoped>
@import "~style/mixin"
@import "~style/variable"

$px_5: 5px
$px_10: 10px
$px_12: 12px
$px_14: 14px
$px_20: 20px
$px_30: 30px
$px_100: 100px
$pc_100: 100%
$c_font: #333
$c_ccc: #ccc

.advertisement 
  height: $pc_100
  font-size: $px_14
  color: $c_font
  display: flex
  flex-direction: column

  .weui-loadmore 
    margin-bottom: 0.5rem
  
  .rate-item-wrapper
    height: $px_40
    line-height: $px_40
  .rate-title
    font-weight: 700
    font-size: $px_14
  .rate-item
    font-size: $px_10
    align-self: stretch
    line-height: $px_30

  .timeRank 
    margin-top: $px_20
    display: flex
    padding: 0 $px_5
    input 
      width: $px_100
      flex: 1
      border: 1px solid $c_ccc
      padding: $px_5
      margin-right: $px_5
      border-radius: $px_5

    button 
      flex: 1
      border: 1px solid #ccc
  
</style>


