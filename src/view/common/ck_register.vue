<template>
  <div class="register-wrapper">
    <x-header :left-options="{showBack: false}" title="注册"></x-header>
    <group>
      <x-input title="账号" v-model="account_name" />
      <x-input title="密码" type="password" v-model="account_passwd" />
      <x-input title="确认密码" type="password" v-model="confirm_password" />
      <x-input title="手机号" type="number" v-model="phone" :show-clear="false">
        <x-button
          v-bind:disabled="disabled"
          slot="right"
          type="primary"
          action-type="button"
          @click.native="fetchVerify"
        >   
        发送验证码
        </x-button>
      </x-input>
      <x-input title="手机验证码" type="number" v-model="mobile_verification_code" />
    </group>
    <x-button type="primary" style="margin-top: 20px;" @click.native="handleRegister">注册</x-button>
  </div>
</template>
<script>
  import { XInput, XButton, Group, Tab, TabItem, XHeader } from "vux"
  import { Validator, timeout } from '@utils/common'
  import { register } from "@api/api"

  import "./style"

  export default {
    data() {
      return {
        account_name: '',
        account_passwd: '',
        confirm_password: '',
        phone: '',
        mobile_verification_code: '',
      }
    },
    components: {
      XInput,
      XButton,
      XHeader,
      Group,
      Tab,
      TabItem
    },
    methods: {
      handleRegister() {
        let errmsg = this.hanleValidator()
        if (errmsg) return this.$vux.toast.text(errmsg)
        const params = {
          account_name: this.account_name,
          account_passwd: this.account_passwd,
          president_id : this.$route.query.president_id || 0,
          phone : this.phone,
          mobile_verification_code : this.mobile_verification_code
        }
        register(params).then(({ code, message }) => {
          if (code != 200) {
            return this.$vux.toast.text(message)
          }
          this.$vux.toast.text('注册成功')
          timeout(1500).then(() => {
              window.location.href = `http://${window.location.host}`
          })
        }).catch(err => console.log(err))
      },
      hanleValidator() {
        let { account_name, account_passwd, confirm_password } = this

        let validator = new Validator()

        validator.add(account_name, [{
          validateRule: 'isEmpty',
          errmsg: '账户名不能为空'
        }])

        validator.add(account_name, [{
          validateRule: 'isLengthError',
          errmsg: '账户名长度不能小于6',
          params: 6
        }])

        validator.add(account_passwd, [{
          validateRule: 'isEmpty',
          errmsg: '密码不能为空'
        }, {
          validateRule: 'isLengthError',
          errmsg: '密码长度小于6位数',
          params: 6
        },{
          validateRule: 'isUnLike',
          errmsg: '两次输入的密码不正确',
          params: confirm_password
        }])

        let errmsg = validator.start()

        if (errmsg) return errmsg
      },
      fetchVerify() {
        this.$vux.toast.text(123)
        // const { message } = await bankBindVerify()
        // this.$vux.toast.text(message)
        // this.disabled = true
      }
      
    }
  }
</script>
