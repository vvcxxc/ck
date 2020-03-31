<template>
  <main class="myCard">

    <van-nav-bar :border="false" title="我的银行卡" />
    <ul class="card_box">
      <li>
        <img src="../../../assets/card_logo.png" alt="">
        <div>
          <span>{{this.bank_name}}</span>
          <span>储蓄卡</span>
        </div>
        <!-- <div @click="verifyRouting()">去验证</div> -->
      </li>
      <li>卡号</li>
      <li>
        <span>{{this.bank_card_number.slice(0,4)}}</span>
        <span>****</span>
        <span>****</span>
        <span>{{this.bank_card_number.slice(-4)}}</span>
      </li>
    </ul>
    <!-- <button class="my_button">修改银行卡</button> -->

  </main>
</template>

<script>
  import { bank } from "@api/api"
  import './index.styl'

  const REQUEST_OK = 200

  export default {
    data() {
      return {
        bank_name:'',//银行名称
        bank_card_number:''//银行卡号
      };
    },
    components: {
    },
    created() {
      bank().then(({ code, message, data }) => {
          if (code == REQUEST_OK) {
            this.bank_name = data.bank_name
            this.bank_card_number = data.bank_card_number
          }
        })
    },
    mounted () {
    },
    methods: {
      verifyRouting(){ //跳转验证页面
        this.$router.push({ path: "/my/bank_card_bind" })
      }

    }
  };
</script>
