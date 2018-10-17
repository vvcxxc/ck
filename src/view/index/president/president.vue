<template>
  <div class="president">
    <div class="container">
      <div class="benefit">
        <card style="margin-top: 1rem" class="profit-title" :header="{title: '我的收益'}">
          <div slot="content" class="card-demo-flex card-demo-content01">
            <div class="vux-1px-r">
              昨日收入
              <br />
              <!-- <span>{{yesterday_fee}}</span> -->
              <span>3064</span>
            </div>
            <div class="vux-1px-r">
              今日收入
              <br />
              <!-- <span>{{today_fee}}</span> -->
              <span>{{(+today).toFixed(2)}}</span>
            </div>
            <div>
              余额
              <br />
              <!-- <span>{{amount}}</span> -->
              <span>{{(+infoEarnings.nine).toFixed(2)}}</span>
            </div>
          </div>
        </card>
      </div>
      <div class="rank-table">
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
              <td>￥{{infoEarnings.nine}}</td>
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
      </div>
    </div>

  </div>
</template>

<script>
  import { XTable, LoadMore, Card } from 'vux'
  import { profits } from "@api/api"
  const REQUEST_OK = 200
  const ZERO = 0
  export default {
    data(){
      return {
        amount: '',
        yesterday_fee: '',
        today_fee: '',
        // cheat data.....
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
          seven: 80754,
          eight: 101980,
          nine: 135441
        }
      }
    },
    computed: {
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
    },
    components: {
      Card,
      LoadMore,
      XTable
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
      calculateEarnings() {
        this.sevenAmount = +this.sevenAmount + +this.everySceond * +this.timestamp
      }
    },
    created() {
      this.fetchProfits()
      this.calculateEarnings()
    },
  }
</script>

<style lang="sass" scoped>

</style>
<style lang="sass">

$c_black: #000

.profit-title
  .weui-panel__hd
    color: $c_black
    text-align: center
</style>
