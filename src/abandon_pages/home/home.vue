<template>
  <div class="homebox xparent">
    <x-header :left-options="{showBack: false}" title="首页"></x-header>
    <div class="xchild">
      <card style="margin-top: 1rem" v-if="role_type == 'president'" :header="{title: '我的收益'}">
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class="vux-1px-r">
            {{$t('balanceTxt.card.item1')}}
            <br />
            <span>{{yesterday_fee}}</span>
            <!-- <span>3064</span> -->

          </div>
          <div class="vux-1px-r">
            {{$t('balanceTxt.card.item2')}}
            <br />
            <span>{{today_fee}}</span>
            <!-- <span>{{(+today).toFixed(2)}}</span> -->

          </div>
          <div>
            {{$t('balanceTxt.card.item3')}}
            <br />
            <span>{{amount}}</span>
            <!-- <span>{{(+total).toFixed(2)}}</span> -->
          </div>
        </div>
      </card>

      <card style="margin-top: 1rem" v-if="role_type == 'entrepreneur'" :header="{title: '我的收益'}">
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class="vux-1px-r">
            {{$t('balanceTxt.card.item1')}}
            <br />
            <span>{{yesterday_fee}}</span>

          </div>
          <div class="vux-1px-r">
            {{$t('balanceTxt.card.item2')}}
            <br />
            <span>{{today_fee}}</span>

          </div>
          <div>
            {{$t('balanceTxt.card.item3')}}
            <br />
            <span>{{amount}}</span>
          </div>
        </div>
      </card>

      <div class="rank-table" v-if="role_type == 'entrepreneur'">
        <load-more tip="收益排行榜" :show-loading="false" background-color="#fbf9fe"></load-more>
        <x-table :cell-bordered="false" style="background-color:#fff;">
          <thead>
            <tr style="color: #000">
              <th>创客</th>
              <th>本周收益</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in rankings" :key="index">
              <td>
                <i class="iconfont icon-wode" style="padding-right: 3px"></i>{{item.account_name}}</td>
              <td>￥{{item.money}}</td>
            </tr>
          </tbody>
        </x-table>
      </div>

      <!-- <div class="rank-table"
           v-if="role_type == 'president'">
        <load-more tip="收益统计"
                   :show-loading="false"
                   background-color="#fbf9fe"></load-more>
        <x-table :cell-bordered="false"
                 style="background-color:#fff;">
          <thead>
            <tr style="color: #000">
              <th>时间</th>
              <th>收益</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2018-09</td>
              <td>￥{{(+profitInfo.amount).toFixed(0)}}</td>
            </tr>
            <tr>
              <td>2018-08</td>
              <td>￥{{infoEarnings.eight}}</td>
            </tr>
            <tr>
              <td>2018-07</td>
              <td>￥{{infoEarnings.seven}}</td>
            </tr>
            <tr>
              <td>2018-06</td>
              <td>￥{{infoEarnings.six}}</td>
            </tr>
            <tr>
              <td>2018-05</td>
              <td>￥{{infoEarnings.five}}</td>
            </tr>
            <tr>
              <td>2018-04</td>
              <td>￥{{infoEarnings.four}}</td>
            </tr>
            <tr>
              <td>2018-03</td>
              <td>￥{{infoEarnings.three}}</td>
            </tr>
            <tr>
              <td>2018-02</td>
              <td>￥{{infoEarnings.two}}</td>
            </tr>
            <tr>
              <td>2018-01</td>
              <td>￥{{infoEarnings.one}}</td>
            </tr>
          </tbody>
        </x-table>
      </div> -->
    </div>
    <!-- <router-view></router-view> -->
  </div>

</template>
<script>
  import { XTable, Panel, LoadMore } from 'vux'
  import { mapGetters } from 'vuex'
  import { profits, ranking } from "@api/api"

  const REQUEST_OK = 200
  const ZERO = 0

  export default {
    data() {
      return {
        // this is reconfiguration
        amount: '',
        yesterday_fee: '',
        today_fee: '',
        rankings: [],
        // -----
        datalist: [],
        sevenAmount: 52236,
        dieTime: 1534496342,
        currentTime: +String.prototype.slice.call(new Date().getTime(), 0, -3),
        weeHours: +String.prototype.slice.call(new Date(new Date().setHours(0, 0, 0, 0)).getTime(), 0, -3),
        infoEarnings: {
          one: 8068,
          two: 14775,
          three: 22835,
          four: 38842,
          five: 53085,
          six: 67246,
          seven: 80754
        }
      }
    },
    components: {
      XTable,
      Panel
    },
    methods: {
      fetchProfits() {
        profits().then(({ data: { amount, today_fee, yesterday_fee } }) => {
          if(amount || +amount == ZERO){
            this.amount = amount
            this.today_fee = today_fee
            this.yesterday_fee = yesterday_fee
          }
        }).catch(err => console.log(err))
      },
      fetchRanking() {
        ranking().then(({ code, message, data }) => {
          if (code == REQUEST_OK) {
            this.rankings = data
          } else {
            this.$vux.toast.text(message)
          }
        }).catch(err => console.log(err))
      },
      calculateEarnings() {
        this.sevenAmount = +this.sevenAmount + +this.everySceond * +this.timestamp
      },
    },
    created() {
      this.fetchProfits()
      this.fetchRanking()
      this.calculateEarnings()
    },
    computed: {
      ...mapGetters(['role_type']),
      timestamp() {
        return this.currentTime - this.dieTime
      },
      todayTimestamp() { /* 每天的时间戳 */
        return this.currentTime - this.weeHours
      },
      everySceond() { // 每秒收入
        return 0.055
      },
      today() { // 今日收入
        return +this.everySceond * +this.todayTimestamp
      },
      total() {

        let amount = 0
        for (let k in this.infoEarnings) {
          amount += this.infoEarnings[k]
        }

        return amount + this.sevenAmount
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@style/mixin";

  .homebox {
    font-size: $mdsize;

    .vux-loadmore {
      margin-bottom: 10px;
    }

    .rank-table {
      font-size: $minsize;

      td {
        color: #999;
        text-align: center;
      }
    }
  }
</style>

<style>
  #app .weui-panel__hd {
    color: #000;
    text-align: center;
  }
</style>