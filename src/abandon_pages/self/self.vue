<template>
  <div class="self-wrapper">
    <x-header title="我的" :left-options="{showBack: false}"></x-header>

    <c-scroll class="scroll-wrapper">
      <div class="container">
        <group>
          <cell is-link link="/selfDetails">
            <div class="self-baseInfo" slot="after-title">
              <div class="user-info">
                <p style="margin-bottom: 10px">{{account_name || '请登录'}}</p>
                <p>{{account_phone || ''}}</p>
              </div>
            </div>
          </cell>
        </group>
        <card>
          <div slot="content" class="card-demo-flex card-demo-content01">
            <div class="">
              <span>{{account_balance}}</span>
              <br /> 余额
            </div>
          </div>
        </card>
        <group title="点击查看">
          <cell is-link title="我的银行卡" link="/bank"></cell>
          <cell is-link title="广告收益" link="/advertisementEarnings"></cell>
          <cell is-link title="现金券收益" link="/couponEarnings"></cell>

          <cell is-link title="费率返点" link="/ratePoint"></cell>
        </group>

        <group title="提现">

          <x-input title="￥" v-model="withdrawMoney" placeholder="请输入提现金额" ref="withdraw"></x-input>
        </group>
        <x-button type="primary" style="margin-top: 1rem;" @click.native="requestWithdrawApply">提现</x-button>
        <alert v-model="show" title="提示" @on-hide="onHide">您的提现申请已经发出</alert>
      </div>
    </c-scroll>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { Alert } from 'vux'

  // import { authUser, withDraw } from '~api/self'
  import { authUser, withdrawApply } from "@api/api"

  import CScroll from "@components/c-scroll/scroll"


  export default {
    data() {
      return {
        show: false,
        withdrawMoney: '',
        account_name: '',
        account_balance: '',
        account_phone: ''
      }
    },
    components: {
      Alert,
      CScroll
    },
    created() {
      // this._authUser()
      this.fetchAuthUser()
    },
    methods: {
      fetchAuthUser() {
        authUser().then(({ data: { account_name, account_phone, money, party_id } }) => {
          // console.log(res)
          if (account_name) {
            this.account_name = account_name
            this.account_phone = account_phone
            this.account_balance = money
          }
        }).catch(err => console.log(err))
      },
      requestWithdrawApply() {
        withdrawApply().then(res => {
          console.log(res)
        }).catch(err => console.log(err))
      },
      // applyWithdraw () {

      //   withDraw({ money: +this.withdrawMoney })
      //     .then(({ message, code }) => {

      //       code == 400 && this.$vux.toast.text(message)

      //       !code && (this.show = true)
      //       this.withdrawMoney = ''
      //     })
      // },
      onHide() {
        authUser()
          .then(res => this.authUser = res.data)
      },
      // _authUser () {
      //   authUser()
      //     .then(({ data }) => {
      //       this.authUser = data
      //       this.$store.commit('AUTH_USER', data)
      //     })
      // }
    }
  }
</script>
<style lang="scss">
  @import "@/style/mixin.scss";

  .self-baseInfo {
    padding: $padding 0;
    display: flex;
    align-items: center;

    .user-avatar {
      width: 2.325581rem;
      height: 2.325581rem;
      background-color: #000;
    }

    .user-info {
      flex: 1;
      margin-left: $margin;
      font-size: 0.620155rem;
    }
  }
</style>