<template>
  <div class="bankBind">

    <x-header title="更改银行卡"></x-header>

    <group title="请输入以下信息"
           class="bankBindInfo">
      <form>
        <x-input placeholder="持卡人姓名"
                 v-model="bankInfo.bank_account_user_name">
          <i slot="label"
             class="iconfont icon-ren"></i>
        </x-input>
        <x-input placeholder="银行卡名称"
                 v-model="bankInfo.bank_name">
          <i slot="label"
             class="iconfont icon-icon-test"></i>
        </x-input>
        <x-input placeholder="银行账账户"
                 v-model="bankInfo.bank_card_number">
          <i slot="label"
             class="iconfont icon-zhanghu1"></i>
        </x-input>
        <x-input placeholder="请输入验证码"
                 v-model="bankInfo.verify"
                 :show-clear="false">
          <i slot="label"
             class="iconfont icon-ziyuan"></i>
          <x-button slot="right"
                    type="primary"
                    action-type="button"
                    @click.native="sendBankBindVerify">发送验证码</x-button>
        </x-input>
      </form>
    </group>
    <x-button style="margin-top: 1rem"
              type="primary"
              @click.native="applyBankBind">确认更新</x-button>
  </div>
</template>

<script>
// import { XInput, XButton } from 'vux'
import { bankBind, bankBindVerify } from '~api/self'
import { Validator_a } from '~utils/common'
export default {
  data () {
    return {
      bankInfo: {
        bank_account_user_name: '',
        bank_name: '',
        bank_card_number: '',
        verify: ''
      }
    }
  },
  components: {
    // XInput,
    // XButton
  },
  methods: {
    sendBankBindVerify () {
      bankBindVerify().then(({ code, message }) => {
        code == 200 && this.$vux.toast.text('验证码发送成功！')
      })
    },
    applyBankBind () {
      let errmsg = this._validator()

      if (errmsg) return this.$vux.toast.text(errmsg)

      bankBind(this.bankInfo).then(({ code, message }) => {
        // console.log(res)
        this.$vux.toast.text(message)

        if (code == 200) {
          this.bankInfo.bank_account_user_name = ''
          this.bankInfo.bank_name = ''
          this.bankInfo.bank_card_number = ''
          this.bankInfo.verify = ''
        }
      })
    },
    _validator () {
      let validator = new Validator_a

      validator.add(this.bankInfo.bank_account_user_name, [{
        validateRule: 'isEmpty',
        errmsg: '持卡人姓名不能为空'
      }])

      validator.add(this.bankInfo.bank_name, [{
        validateRule: 'isEmpty',
        errmsg: '银行卡名称不能为空'
      }])

      validator.add(this.bankInfo.bank_card_number, [{
        validateRule: 'isEmpty',
        errmsg: '银行卡号不能为空'
      }])

      validator.add(this.bankInfo.verify, [{
        validateRule: 'isEmpty',
        errmsg: '验证码不能为空'
      }])

      let errmsg = validator.start()

      if (errmsg) return errmsg

      return false
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~style/mixin';
.bankBind {
  @include xallcover(101);
  font-size: $mdsize;
  .iconfont {
    font-size: 20px;
    padding-right: 5px;
    color: #000;
  }
}

.bankBindInfo {
  .weui-btn {
    font-size: $mdsize;
  }
}
</style>