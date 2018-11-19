<template>
  <div class="login-wrapper">
    <x-header :left-options="{showBack: false}" title="登陆"></x-header>
    <tab :line-width="1">
      <tab-item selected @on-item-click="hanleToggleRole('entrepreneur')">创客</tab-item>
      <tab-item @on-item-click="hanleToggleRole('president')">会长</tab-item>
    </tab>
    <group>
      <x-input title="账号" v-model="account_name" />
      <x-input type="password" title="密码" v-model="account_passwd" />
    </group>
    <x-button type="primary" style="margin-top: 20px;" @click.native="handleLogin">登录</x-button>
  </div>
</template>
<script>
  import { XInput, XButton, Group, Tab, TabItem, XHeader } from "vux"
  import { Validator, timeout } from '@utils/common'
  import { login } from "@api/api"

  import "./style"

  const ROLE_PRESIDENT = 'president'
  const ROLE_ENTREPRENEUR = 'entrepreneur'

  export default {
    data() {
      return {
        account_name: '',
        account_passwd: '',
        role_type: ROLE_ENTREPRENEUR
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
      handleLogin() {
        let errmsg = this.hanleValidator()
        if (errmsg) return this.$vux.toast.text(errmsg)
        const params = {
          account_name: this.account_name,
          account_passwd: this.account_passwd,
          role_type: this.role_type
        }
        login(params).then(({ data: { role_type, token } }) => {
          if (token) {
            localStorage.setItem('token', token)
            localStorage.setItem('role_type', role_type)
            this.$store.commit('TOAST', { text: '登陆成功' })
            this.$store.commit("ROLE_TYPE", { type: role_type })
            timeout(500).then(() => {
              this.$router.push('/')
            })
          }
        }).catch(err => console.log(err))
      },
      hanleValidator() {
        let { account_name, account_passwd } = this

        let validator = new Validator()

        validator.add(account_name, [{
          validateRule: 'isEmpty',
          errmsg: '账户名不能为空'
        }])

        validator.add(account_passwd, [{
          validateRule: 'isEmpty',
          errmsg: '密码不能为空'
        }, {
          validateRule: 'isLengthError',
          errmsg: '密码长度小于6位数',
          params: 6
        }])

        let errmsg = validator.start()

        if (errmsg) return errmsg
      },
      hanleToggleRole(type) {
        if (this.role_type == type) return false
        this.role_type = type
      }
    }
  }
</script>