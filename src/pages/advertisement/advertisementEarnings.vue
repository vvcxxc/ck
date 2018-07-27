<template>
  <div class="advertisement">
    <x-header title="广告收益"></x-header>
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
              @listenEvent="receive">
      <group :title="'一共有 '+total+' 个广告'"
             slot="inn">
        <x-table full-bordered
                 :cell-bordered="false"
                 style="background-color:#fff;">
          <thead>
            <tr>
              <th>名称</th>
              <th>创建时间</th>
              <th>展示</th>
              <th>点击</th>
              <th>收入</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in datalist"
                :key="index"
                @click="getDetails(item.id, item.name)">
              <td class="advertisement-title">{{item.name}}</td>
              <td>{{dateFormat(item.create_time*1000, 'YYYY-M-D') || '无'}}</td>
              <td>{{item.display || '0'}}次</td>
              <td>{{item.onclick || '0'}}次</td>
              <td>{{item.money || '0'}}元</td>
            </tr>
          </tbody>
        </x-table>
      </group>
      <load-more v-if="!datalist.toString()"
                 slot="inn"
                 :show-loading="false"
                 :tip="'暂无数据'"
                 background-color="#fff"></load-more>
    </x-scroll>
    <router-view></router-view>
  </div>
</template>
<script>
import { advertisementEarnings } from '~api/self'
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
      http: advertisementEarnings,
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
      this._advertisementEarnings(this.searchParams)
    },
    _advertisementEarnings (searchParams = {}) {

      advertisementEarnings(searchParams).then(({ code, data, message }) => {

        if (code == 200) {
          this.datalist = data.data
          this.lastPage = data.last_page
          this.total = data.total
        }

      }).catch(err => {
        console.log(err)
      })
    },
    receive (data) {
      const loadMoreData = data.data

      this.datalist = [...this.datalist, ...loadMoreData]
    },
    getDetails (id, name) {
      // console.log(id)
      this.$router.push({
        path: '/advertisementEarnings/advertisementEarningsDetails',
        query: {
          id,
          name
        }
      })
    }
  },
  created () {
    this._advertisementEarnings()
  },
  computed: {
    ...mapGetters(['authUser', 'roleType']),
    searchParams () {
      return {
        begin_time: new Date(this.beginTime).getTime(),
        end_time: new Date(this.endTime).getTime()
      }
    },
    roleTypeParams () {
      return this.roleType == 'entrepreneur' ? 'entrepreneur_id' : 'president_id'
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
    width: $px_100;
  }

  .test {
    @include text-ellipsis(100px);
  }

  .weui-loadmore {
    margin-bottom: 0.5rem;
  }

  th {
    font-weight: 700;
    font-size: $px_12;
  }
  td {
    font-size: $px_10;
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
