<template>
  <main class="bank_card_bind">
    <van-nav-bar :border="false" title="绑定银行卡" />
    <div class="bank_title">绑定双乾电子账号</div>
    <ul class="bank_card_">
      <li>
        <span>银行卡号</span>
        <span>{{this.bank_card_number.slice(0,4)}}</span>
        <span>****</span>
        <span>****</span>
        <span>{{this.bank_card_number.slice(-4)}}</span>
      </li>
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

    <!-- 成功弹框 -->
    <div class="show_success" v-show="show_success">
      <div class="success_box" >
        <img src="../../../assets/checked.png" alt="">
        <span>成功绑定</span>
      </div>
    </div>

    <!-- 失败弹框 -->
    <div class="fail" v-show="show_fail">
      <ul id="fail_box">
        <li><img src="../../../assets/tear-up .png" alt=""></li>
        <li>绑定失败</li>
        <li>您的银行卡未验证成功，请检查此银行</li>
        <li>卡是否能正常使用</li>
        <li @click="show_fail = false">重新绑定</li>
      </ul>
    </div>
    
  </main>
</template>

<script>

  import { bank ,bankCardActivation,bankCardBinding } from "@api/api"
  import { Toast } from "vant";
  import store from "@/store/index"
  import './index.styl'
  const REQUEST_OK = 200

  export default {
    data() {
      return {
        bank_card_number:'',
        validation:'',
        phone:'',
        //  控制弹框显示
        show_success:false,
        show_fail:false,
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
        bankCardActivation({
          	party_id:store.state.ql_bank.party_id,
            phone:this.phone
          }).then(({ code, message, data }) => {
            if (code == REQUEST_OK) {
              this.show_time = true
              this.lookTime();
              Toast.success(message);
            }else {
              Toast.fail(message);
            }
          })
      },

      bindingData(){//绑定银行卡

        bankCardBinding({
          party_id:store.state.ql_bank.party_id,
          code:this.validation,phone:this.phone
          }).then(({ code, message, data }) => {
            if (code == REQUEST_OK) {
              this.show_success = true
              const timeStart =  setTimeout(()=>{
                  this.show_success = false
                  clearTimeout(timeStart)
                  this.$router.push("/my/card_new");//绑定成功跳回上一级
                  return
              },1000);
            }else {
              this.show_fail = true
            }

          })
      }

    }
  };
</script>
