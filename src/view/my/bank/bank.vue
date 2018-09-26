<template>
  <div class="bank">
    <x-header title="绑定银行卡" :left-options="{preventGoBack: true}" @on-click-back="handleHide"></x-header>

    <div class="bankList">
      <div class="x-data-preview">
        <div class="x-data-preview-item">
          <div class="x-data-preview-header">
            <label>类型</label>
            <span>{{bank.bank_name || '未绑定'}}</span>
          </div>
          <div class="x-data-preview-body">
            <div class="x-data-preview-bd-item">
              <label>账户</label>
              <span>{{bank.bank_card_number || '未绑定' }}</span>
            </div>
            <div class="x-data-preview-bd-item">
              <label>持卡人</label>
              <span>{{bank.bank_account_user_name || '未绑定'}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bankBind">
      <group>
        <cell title="更改银行卡" is-link @click.native="handleShowView('bankBind')"></cell>
      </group>
    </div>
    <div class="sub-view-wrappeer">
      <v-bank-bind v-if="flagBankBind" @on-hide="handleHideView('bankBind')"></v-bank-bind>
    </div>
  </div>
</template>

<script>
  import XDatapreview from '@components/x-datapreview'

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
      XDatapreview,
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