<template>
  <div class="bank">
    <x-header title="绑定银行卡"></x-header>

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
        <cell title="更改银行卡" is-link link="/bank/bankBind"></cell>
      </group>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import XDatapreview from '~components/x-datapreview'
  // import { bankList } from '~api/self'
  import { bank } from "@api/api"

  const REQUEST_OK = 200

  export default {
    data() {
      return {
        bank: {}
      }
    },
    components: {
      XDatapreview
    },
    methods: {
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