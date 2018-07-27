<template>
  <div class="advertisementEarningsDetails">
    <x-header title="广告收益详情"></x-header>
    <x-scroll :http="http"
              :lastPage="lastPage"
              :params="{[roleTypeParams]: authUser.party_id}"
              @listenEvent="receive">

      <load-more :tip="currentAdvertisement"
                 :show-loading="false"
                 background-color="#fbf9fe"></load-more>
      <group :title="' 一共有 '+total+' 条记录'"
             slot="inn"
             v-if="!!dataAdvertisementEarningsLog.length">
        <x-table full-bordered
                 :cell-bordered="false"
                 style="background-color:#fff;">
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
            <tr v-for="(item, index) in dataAdvertisementEarningsLog"
                :key="index">
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
      <load-more v-if="!dataAdvertisementEarningsLog.toString()"
                 slot="inn"
                 :show-loading="false"
                 :tip="'暂无数据'"
                 background-color="#fff"></load-more>
    </x-scroll>
  </div>
</template>

<script>
import { advertisementEarningsDetails } from '~api/self'
import { mapGetters } from 'vuex'
import { XTable, dateFormat } from 'vux'
import { fieldReplace } from '~utils/common'
import XScroll from '~components/x-scroll2'
export default {
  data () {
    return {
      http: advertisementEarningsDetails,
      dataAdvertisementEarningsLog: [],
      lastPage: 1,
      total: 0,
      dateFormat,
      currentAdvertisement: '',
      fieldReplace
    }
  },
  methods: {
    _advertisementEarningsDetails (id) {

      const params = {
        id
      }

      advertisementEarningsDetails(params).then(({ code, data, message }) => {

        if (code == 200) {
          this.dataAdvertisementEarningsLog = data.data
          this.lastPage = data.last_page
          this.total = data.total
        }
      })
    },
    receive (data) {
      this.dataAdvertisementEarningsLog = [...this.dataAdvertisementEarningsLog, ...data]
    }
  },
  created () {
    let { id, name } = this.$route.query
    this.currentAdvertisement = name
    this._advertisementEarningsDetails(id)
  },
  computed: {
    ...mapGetters(['authUser', 'roleType']),
    roleTypeParams () {
      return this.roleType == 'entrepreneur' ? 'entrepreneur_id' : 'president_id'
    }
  },
  components: {
    XScroll,
    XTable
  }
}
</script>

<style lang="sass" scoped>
@import "~style/mixin"
@import "~style/variable"
.advertisementEarningsDetails
  @include allcover(101)

  th
    font-weight: 700
    font-size: $px_12
  td 
    font-size: $px_10

</style>
