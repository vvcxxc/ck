<template>
  <div class="page">
    <div class="header">
      <div class="header-title">提现中的金额</div>
      <div class="header-money">{{money}}</div>
    </div>
    <div class="list">
      <div class="list-item"  v-for="(item, index) in withdraws" :key="index">
        <div class="item-l">
          <p class="item-status">{{item.status}}</p>
          <p class="item-time">{{item.from_date}}</p>
        </div>
        <div class="item-r">{{item.money}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { withdrawListMoney, withdrawRecord } from '@api/api'
export default {
  data(){
    return {
      withdraws: [],
      money: 0
    }
  },
  created (){
    withdrawListMoney().then(res => {
      if(!res.code){
        this.money = res.data.money
      }
    })
    withdrawRecord().then(res => {
        if(!res.code){
          this.withdraws = res.data
        }
    })
  },
  methods: {

  }
}
</script>
<style lang="sass" scoped>
  @import './index'
</style>
