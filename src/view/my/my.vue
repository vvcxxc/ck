<template>
  <div class="self-wrapper" style="height: 120vh">
    <x-header title="我的" :left-options="{showBack: false}"></x-header>

    <!-- <c-scroll class="scroll-wrapper"> -->
      <div class="container">
        <group>
          <cell is-link @click.native="handleShowView('configuration')">
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
            <div class="">
              <span>{{ integral }}</span>
              <br /> 积分
            </div>
          </div>
        </card>
        <group title="点击查看">
          <cell is-link title="我的银行卡" @click.native="handleShowView('bank')"></cell>

          <cell is-link title="广告收益" @click.native="handleShowView('adProfit')"></cell>
          <cell is-link title="现金券收益" @click.native="handleShowView('couponProfit')"></cell>

          <cell is-link title="费率返点" @click.native="handleShowView('rate')"></cell>
          <cell is-link title="我的二维码" @click.native="myQrcode()"></cell>
          <cell is-link title="积分使用记录" @click.native="integralRecord()"></cell>
        </group>

        <group title="提现">
          <x-input title="￥" v-model="withdrawMoney" placeholder="请输入提现金额" ref="withdraw"></x-input>
        </group>
        <x-button type="primary" style="margin-top: 1rem;" @click.native="requestWithdrawApply">提现</x-button>
        <alert v-model="show" title="提示" @on-hide="onHide">您的提现申请已经发出</alert>

        <group v-if="supplier_party_id > 0">
          <x-button @click.native="goToSupplier()" style="margin-bottom: 80px">商家后台</x-button>
        </group>
      </div>
    <!-- </c-scroll> -->

    <div class="sub-view-wrapper">
      <alert v-model="showQrcode" title="我的二维码">
        <qrcode
          :value="qrcodeUrl"></qrcode>
      </alert>
      <v-configuration v-if="flagConfiguration" @on-hide="handleHideView('configuration')"></v-configuration>
      <v-bank v-if="flagBank" @on-hide="handleHideView('bank')"></v-bank>
      <v-ad-profit v-if="flagAdProfit" @on-hide="handleHideView('adProfit')"></v-ad-profit>
      <v-coupon-profit v-if="flagCouponProfit" @on-hide="handleHideView('couponProfit')"></v-coupon-profit>
      <v-rate v-if="flagRate" @on-hide="handleHideView('rate')"></v-rate>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { Alert, XHeader, Group, Cell, Card, XInput, XButton, Qrcode } from 'vux'

  import { authUser, withdrawApply } from "@api/api"

  import VBank from "./bank/bank"
  import VConfiguration from './configuration/configurations'
  import VAdProfit from "@/view/ad/adProfit/adProfit"
  import VCouponProfit from "@/view/coupon/coupon-profit/coupon-profit"
  import VRate from "@/view/rate/rates"

  import CScroll from "@components/c-scroll/scroll"

  const V_BANK = 'bank'
  const V_AD_PROFIT = 'adProfit'
  const V_COUPON_PROFIT = 'couponProfit'
  const V_CONFIGURATION = 'configuration'
  const V_RATE = 'rate'

  export default {
    data() {
      return {
        show: false,
        withdrawMoney: '',
        account_name: '',
        account_balance: '',
        account_phone: '',
        flagBank: false,
        flagAdProfit: false,
        flagCouponProfit: false,
        flagConfiguration: false,
        flagRate: false,
        showQrcode: false,
        integral: 0,
        supplier_party_id: 0,
      }
    },
    components: {
      XButton,
      XHeader,
      XInput,
      Card,
      Cell,
      Group,
      Alert,
      CScroll,
      VBank,
      VConfiguration,
      VAdProfit,
      VCouponProfit,
      VRate,
      Qrcode,
    },
    created() {
      this.fetchAuthUser()
    },
    computed: {
      qrcodeUrl() {
        return `${process.env.SUPPLIER_URL}/#/register?invite_phone=${this.account_phone}`
      }
    },
    methods: {
      handleShowView(view) {
        this.$store.commit('HIDE_TABBAR', { path: '' })
        switch (view) {
          case V_BANK:
            return this.flagBank = true
          case V_AD_PROFIT:
            return this.flagAdProfit = true
          case V_COUPON_PROFIT:
            return this.flagCouponProfit = true
          case V_CONFIGURATION:
            return this.flagConfiguration = true
          case V_RATE:
            return this.flagRate = true
        }
      },
      handleHideView(view) {
        this.$store.commit('HIDE_TABBAR', { path: '/my' })
        switch (view) {
          case V_BANK:
            return this.flagBank = false
          case V_AD_PROFIT:
            return this.flagAdProfit = false
          case V_COUPON_PROFIT:
            return this.flagCouponProfit = false
          case V_CONFIGURATION:
            return this.flagConfiguration = false
          case V_RATE:
            return this.flagRate = false
        }
      },
      fetchAuthUser() {
        authUser().then(({ data: { account_name, account_phone, money, party_id, integral, supplier_party_id = 0 } }) => {
          if (account_name) {
            this.account_name = account_name
            this.account_phone = account_phone
            this.account_balance = money
            this.integral = integral
            this.supplier_party_id = supplier_party_id
          }
        }).catch(err => console.log(err))
      },
      requestWithdrawApply() {

        const params = {
          money: +this.withdrawMoney
        }
        withdrawApply(params).then(({ message, code }) => {

          this.$vux.toast.text(message)

          if (!code) {
            this.show = true
            this.withdrawMoney = ''
          }
        }).catch(err => console.log(err))
      },
      onHide() {
        console.log('hide')
        // authUser()
        //   .then(res => this.authUser = res.data)
      },
      myQrcode() {
        this.showQrcode = true
      },
      integralRecord() {
        this.$router.push('/integral_records')
      },
      goToSupplier() {
        window.localStorage.clear();
        this.$store.state.token = ""
        window.location.href = `${process.env.SUPPLIER_URL}/login`
      }
    }
  }
</script>
<style lang="sass">
  @import "./my-style"
</style>
