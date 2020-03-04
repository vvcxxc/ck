<template>
  <main class="bank_card_bind">
    <van-nav-bar :border="false" title="开通电子账户" />
    <div class="bank_title">提现资金安全确认</div>
    <ul class="bank_card_">
      <li>
          <van-field v-model="phone" type="number" placeholder="请输入手机号" />
      </li>
      <li>
        <van-field v-model="validation" type="number" placeholder="请输入验证码" />
        <span v-if="!show_time" @click="getVerify">获取验证码</span>
        <span v-else>{{this.time}}</span>
      </li>
      <li>
        <button class="my_button" @click="bindingData">绑定</button>
      </li>
    </ul>
    
  </main>
</template>

<script>
  import { bank } from "@api/api"
  import './index.styl'
  const REQUEST_OK = 200

  export default {
    data() {
      return {
        bank_card_number:'',
        validation:'',
        phone:'',
        //定时器时间
        show_time:false,
        time:60
      };
    },
    components: {
    },
    created() {
      bank().then(({ code, message, data }) => {
        if (code == REQUEST_OK) {
          this.bank_card_number = data.bank_card_number
        }
      })
    },
    methods: {
      lookTime(){//定时器倒计时
       const timeStart =  setTimeout(()=>{
          this.time -= 1
          if(this.time < 1){
             clearTimeout(timeStart)
             this.time = 60
             this.show_time = false
            return
          }
            this.lookTime()
        },1000);
      },
      getVerify(){//获取验证码
        this.show_time = true
        this.lookTime();
        // bankBindVerify().then(({ code, message, data }) => {
        //     if (code == REQUEST_OK) {
        //       console.log(data,'333')
        //     }
        //   })
      },
      bindingData(){//绑定数据

      }

    }
  };
</script>
