<template>
  <div class="bank">
    <van-nav-bar
      title="我的银行卡"
      left-arrow
      @click-left="handleHide"
    />
    <div class="bank-main">
      <div class="layout">
        <div>类型</div>
        <div>{{bank.bank_name || '未绑定'}}</div>
      </div>
      <div class="layout">
        <div>账户</div>
        <div>{{bank.bank_card_number || '未绑定'}}</div>
      </div>
      <div class="layout">
        <div>持卡人</div>
        <div>{{bank.bank_account_user_name || '未绑定'}}</div>
      </div>
    </div>

    <div class="button-box">
      <div @click="handleShowView('bankBind')">
        更改银行卡
      </div>
    </div>

    <div class="sub-view-wrappeer">
      <v-bank-bind v-if="flagBankBind" @on-hide="handleHideView('bankBind')"></v-bank-bind>
    </div>

  </div>
</template>

<script>
  import { NavBar } from 'vant';

  import { bank } from "@api/api"

  import VBankBind from "./bank-bind"

  const REQUEST_OK = 200
  const BANK_BIND = 'bankBind'

  export default {
    data() {
      return {
        flagBankBind: false,
        bank: {}
      }
    },
    components: {
      VBankBind
    },
    methods: {
      handleShowView(view) {
        switch (view) {
          case BANK_BIND:
            return this.flagBankBind = true
        }
      },
      handleHideView(view) {
        switch (view) {
          case BANK_BIND:
            return this.flagBankBind = false
        }
      },
      handleHide() {
        this.$emit('on-hide')
      },
      fetchBank() {
        bank().then(({ code, message, data }) => {
          if (code == REQUEST_OK) {
            this.bank = data
          }
        })
      }
    },
    created() {
      this.fetchBank()
    }
  }
</script>
<style lang="scss" scoped>
  @import "./styles/bank-style.scss";
</style>
