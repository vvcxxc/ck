<template>
  <div class="entrepreneur">
    <div class="container">
      <div class="profit">
        <card style="margin-top: 1rem" class="profit-title" :header="{title: '我的收益'}">
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
      </div>

    </div>
  </div>
</template>

<script>
  import { XTable, LoadMore, Card } from 'vux'
  import { profits, ranking } from "@api/api"

  const REQUEST_OK = 200

  export default {
    data() {
      return {
        amount: '',
        yesterday_fee: '',
        today_fee: '',
        rankings: []
      }
    },
    methods: {
      fetchProfits() {
        profits().then(({ data: { amount, today_fee, yesterday_fee } }) => {
          if (amount || +amount == ZERO) {
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
    },
    computed: {

    },
    components: {
      XTable,
      LoadMore,
      Card
    },
    activated() {
      this.fetchProfits()
      this.fetchRanking()
    },
    created() {
      this.fetchProfits()
      this.fetchRanking()
    }
  }
</script>

<style lang="sass" scoped>

$c_999: #999

.entrepreneur
  .ranking
    td
      color: $c_999
      text-align: center
</style>

<style lang="sass">

$c_black: #000

.profit-title
  .weui-panel__hd
    color: $c_black
    text-align: center
</style>
