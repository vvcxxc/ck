<template>
  <div class="advertisement">
    <x-header title="费率返点"></x-header>
    <!-- <div class="timeRank">
      <input type="text"
             :value="beginTime"
             @click="handleBeginTime">
      <input type="text"
             :value="endTime"
             @click="handleEndTime">
      <button @click="search">搜索</button>
    </div> -->
    <!-- <load-more tip="请选择日期"
               :show-loading="false"
               background-color="#fbf9fe"></load-more> -->

    <x-scroll :http="http"
              :lastPage="lastPage"
              :params="{role_type: this.roleType}"
              @listenEvent="receive">
      <group slot="inn">
        <x-table full-bordered
                 :cell-bordered="false"
                 style="background-color:#fff;">
          <thead>
            <tr>
              <th>订单号</th>
              <th>创建时间</th>
              <th>金额</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in datalist"
                :key="index">
              <td class="advertisement-title">{{item.order_sn || '无'}}</td>
              <td>{{item.created_at || '无'}}</td>
              <td>{{(Math.random() / 10).toFixed(3) || '0'}}元</td>
            </tr>
          </tbody>
        </x-table>
      </group>
    </x-scroll>
  </div>
</template>
<script>
import { advertisementEarnings_entrepreneur, ratePoint } from '~api/self'
import { XTable, dateFormat } from 'vux'
import { mapGetters } from 'vuex'
import XScroll from '~components/x-scroll2'
export default {
  data () {
    return {
      dateFormat,
      datalist: [],
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
      this._ratePoint(this.searchParams)
    },
    _ratePoint (searchParams = {}) {

      const params = {
        role_type: this.roleType,
        ...searchParams
      }

      ratePoint(params).then(({ data, meta }) => {
        this.datalist = data
      }).catch(err => {
        console.log(err)
      })
    },
    receive (data) {
      const loadMoreData = data.data

      this.datalist = [...this.datalist, ...loadMoreData]
    }
  },
  created () {
    this._ratePoint()
    // console.log(this.roleType)
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
<style lang="scss" scoped>
@import "~style/mixin";
@import "~style/variable";
.advertisement {
  height: $pc_100;
  font-size: $s_14;
  color: $c_font;
  display: flex;
  flex-direction: column;

  .advertisement-title {
    // width: $px_100;
  }

  .test {
    @include text-ellipsis(100px);
  }

  .weui-loadmore {
    margin-bottom: 0.5rem;
  }

  th {
    font-weight: 700;
  }
  tr {
    // display: flex;
    // flex-direction: row;
    // justify-content: space-between;
  }
  td {
    font-size: $s_12;
    align-self: stretch;
  }

  .timeRank {
    margin-top: $px_20;
    display: flex;
    padding: 0 $px_5;
    input {
      width: $px_100;
      flex: 1;
      border: 1px solid $c_gray;
      padding: $px_5;
      margin-right: $px_5;
      border-radius: $px_5;
    }

    button {
      flex: 1;
      border: 1px solid #ccc;
    }
  }
}
</style>


