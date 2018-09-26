<template>
  <div class="advertisement">
    <x-header title="广告收益" :left-options="{preventGoBack: true}" @on-click-back="handleHide"></x-header>
    <group :title="'一共有 '+adProfits.length+' 个广告'" slot="inn">
      <x-table full-bordered :cell-bordered="false" style="background-color:#fff;">
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
          <tr v-for="(item, index) in adProfits" :key="index" @click="getDetails(item.id, item.name)">
            <td class="advertisement-title">{{item.name}}</td>
            <td>{{dateFormat(item.create_time*1000, 'YYYY-M-D') || '无'}}</td>
            <td>{{item.display || '0'}}次</td>
            <td>{{item.onclick || '0'}}次</td>
            <td>{{item.money || '0'}}元</td>
          </tr>
        </tbody>
      </x-table>
    </group>
    <load-more v-if="!adProfits.toString()" slot="inn" :show-loading="false" :tip="'暂无数据'" background-color="#fff"></load-more>
    <!-- </x-scroll> -->
    <router-view></router-view>
  </div>
</template>
<script>

  import { adProfit } from "@api/api"
  import { XTable, dateFormat } from 'vux'
  import { mapGetters } from 'vuex'

  const REQUEST_OK = 200

  export default {
    data() {
      return {
        dateFormat,
        adProfits: [],
        lastPage: '',
        total: ''
      }
    },
    components: {
      XTable
    },
    methods: {
      handleHide(){
        this.$emit('on-hide')
      },
      fetchAdProfit() {
        adProfit().then(({ code, data: { data }, message }) => {
          if (code == REQUEST_OK) {
            this.adProfits = data
          }
        }).catch(err => console.log(err))
      },
      getDetails(id, name) {
        this.$router.push({
          path: '/adProfit/adProfitDetail',
          query: {
            id,
            name
          }
        })
      }
    },
    created() {
      this.fetchAdProfit()
    },
    computed: {
      
    }
  }
</script>
<style lang="scss" scoped>
  @import "@style/mixin";

  $px_5: 5px;
  $px_10: 10px;
  $px_12: 12px;
  $px_14: 14px;
  $px_20: 20px;
  
  $px_100: 100px;
  $pc_100: 100%;
  $c_333: #333;
  $c_gray: #ccc;

  .advertisement {
    @include xallcover;
    height: $pc_100;
    font-size: $px_14;
    color: $c_333;
    display: flex;
    flex-direction: column;

    .advertisement-title {
      width: $px_100;
    }

    .test {
      @include text-ellipsis($px_100);
    }

    .weui-loadmore {
      margin-bottom: $px_10;
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
        border: 1px solid $c_gray;
      }
    }
  }
</style>