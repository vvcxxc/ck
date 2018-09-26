<template>
  <div class="advertisementEarningsDetails">
    <x-header title="广告收益详情" :left-options="{preventGoBack: true}" @on-click-back="handleHide"></x-header>

      <group :title="' 一共有 '+dataAdvertisementEarningsLog.length+' 条记录'" v-if="!!dataAdvertisementEarningsLog.length">
        <x-table full-bordered :cell-bordered="false" style="background-color:#fff;">
          <thead>
            <tr>
              <th>店铺</th>
              <th>时间</th>
              <th>事件</th>
              <th>位置</th>
              <th>用户</th>
              <th>收入</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataAdvertisementEarningsLog" :key="index">
              <td class="advertisement-title">{{item.name}}</td>
              <td>{{dateFormat(item.create_time*1000, 'YYYY-M-D') || '无'}}</td>
              <td>{{fieldReplace(item.split_type)}}</td>
              <td>{{item.position_id == 1 ? '支付页面' : '支付返回页面'}}</td>
              <td>{{item.user_name}}</td>
              <td>{{item.money || '0'}}</td>
            </tr>
          </tbody>
        </x-table>
      </group>
      <load-more v-if="!dataAdvertisementEarningsLog.toString()" :show-loading="false" :tip="'暂无数据'" background-color="#fff"></load-more>

  </div>
</template>

<script>
  import { XHeader, Group, XTable, dateFormat, LoadMore } from 'vux'
  import { adProfitDetail } from "@api/api"
  import { fieldReplace } from '@utils/common'

  const REQUEST_OK = 200

  export default {
    props: {
      id: {
        type: [Number, String]
      }
    },
    data() {
      return {
        dataAdvertisementEarningsLog: [],
        dateFormat,
        fieldReplace
      }
    },
    computed: {
      // ...mapGetters(['authUser', 'roleType']),
      // roleTypeParams() {
      //   return this.roleType == 'entrepreneur' ? 'entrepreneur_id' : 'president_id'
      // }
    },
    components: {
      XHeader,
      Group,
      XTable,
      LoadMore
    },
    methods: {
      handleHide(){
        this.$emit('on-hide')
      },
      fetchAdProfitDetail(id) {

        const params = {
          id
        }
        adProfitDetail(params).then(({ code, data, message }) => {
          if (code == REQUEST_OK) {
            this.dataAdvertisementEarningsLog = data.data
          }
        })
      }
    },
    created() {
      this.fetchAdProfitDetail(this.id)
    },
  }
</script>

<style lang="sass" scoped>
@import "@style/mixin"
$px_12: 12px
$px_10: 10px
.advertisementEarningsDetails 
  @include xallcover(101)
  display: flex 
  flex-direction: column 
  th 
    font-weight: 700 
    font-size: $px_12 
  td 
    font-size: $px_10
</style>