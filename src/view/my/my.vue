<template>
  <main>
    <div class="user-info">
      <img
        src="http://oss.tdianyi.com/front/ek7cPQsFbEt7DXT7E7B6Xaf62a46SCXw.png"
        alt
      />
      <ul class="right">
        <li>{{account_name || '请登录'}}</li>
        <li>{{account_phone || ''}}</li>
        <li>
          <div>
            余额
            <span>{{account_balance}}</span>
          </div>
          <div>
            礼品额度
            <span>{{ integral }}</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="invite-box">
      <div @click="invite('store')">
        <span></span>邀请店铺
      </div>
      <div @click="invite('people')">
        <span></span>邀请创客
      </div>
    </div>

    <ul class="other-info">
      <!-- @click="handleShowView('bank') -->
      <!-- mycard() -->
      <li @click="mycard()">
        <div>
          <span></span>我的银行卡
        </div>
        <div>
          <!-- <div>未绑定</div> -->
          <van-icon name="arrow" size="0.3rem" color="#999999" />
        </div>
        
      </li>
      <li @click="integralRecord()">
        <div>
          <span></span>礼品额度使用记录
        </div>
        <van-icon name="arrow" size="0.3rem" color="#999999" />
      </li>
      <li @click=" handleShowView('configuration')">
        <div>
          <span></span>设置
        </div>
        <van-icon name="arrow" size="0.3rem" color="#999999" />
      </li>
    </ul>
    <v-configuration v-if="flagConfiguration" @on-hide="handleHideView('configuration')"></v-configuration>
    <v-bank v-if="flagBank" @on-hide="handleHideView('bank')"></v-bank>
    <van-overlay :show="is_show" @click="is_show = false">
      <div class="qr_code">
        <div class="qr_code_title">{{title}}</div>
        <img class="qr_code_img" :src="codeUrl" />
      </div>
    </van-overlay>
  </main>
</template>
<script>
import VBank from "./bank/bank";
import VConfiguration from "./configuration/configurations";
import { authUser } from "@api/api";
import { Icon, Popup, Overlay } from "vant";
import QRCode from "qrcode";
import store from "@/store/index"//vuex
const V_BANK = "bank";
const V_CONFIGURATION = "configuration";
export default {
  data() {
    return {
      list: "",
      flagBank: false,
      flagConfiguration: false,
      account_name: "",
      account_balance: "",
      account_phone: "",
      integral: 0,
      supplier_party_id: 0,
      party_id: 0,
      qrCodeUrl: "", // 二维码信息
      codeUrl: "", //二维码图片路径
      is_show: false, // 展示邀请页面
      title: "" // 邀请时候的title
    };
  },
  components: {
    VBank,
    VConfiguration
  },
  created() {
    this.fetchAuthUser();
  },
  methods: {
    //跳转我的银行卡页面
    mycard(){
      this.$router.push({ path: "/my/card_new" })
    },
    invite(name) {
      if (name == "people") {
        let qrCodeUrl = `http://${window.location.host}/ck/register?invite_id=${this.party_id}`;
        this.qrCodeUrl = qrCodeUrl;
        this.showQRcode(qrCodeUrl);
        this.title = "邀请创客";
      } else {
        let qrCodeUrl = `${process.env.SUPPLIER_URL}/register?invite_phone=${this.account_phone}`;
        this.qrCodeUrl = qrCodeUrl;
        this.showQRcode(qrCodeUrl);
        this.title = "邀请店铺";
      }
    },
    showQRcode(data) {
      QRCode.toDataURL(data)
        .then(url => {
          this.codeUrl = url;
          this.is_show = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleShowView(view) {
      this.$store.commit("HIDE_TABBAR", { path: "" });
      switch (view) {
        case V_BANK:
          return (this.flagBank = true);
        case V_CONFIGURATION:
          return (this.flagConfiguration = true);
      }
    },
    handleHideView(view) {
      this.$store.commit("HIDE_TABBAR", { path: "/my" });
      switch (view) {
        case V_BANK:
          return (this.flagBank = false);
        case V_CONFIGURATION:
          return (this.flagConfiguration = false);
      }
    },
    fetchAuthUser() {
      authUser()
        .then(
          ({
            data: {
              account_name,
              account_phone,
              money,
              party_id,
              integral,
              supplier_party_id = 0
            }
          }) => {
            
            if (account_name) {
              this.account_name = account_name;
              this.account_phone = account_phone;
              this.account_balance = money;
              this.integral = integral;
              this.supplier_party_id = supplier_party_id;
              this.party_id = party_id;
              
              //提供给银行卡验证页面使用
              store.dispatch("ql_bank/recordInformation", { party_id })
            }
          }
        )
        .catch(err => console.log(err));
    },
    integralRecord() {
      this.$router.push("/integral_records");
    }
  }
};
</script>
<style lang="sass" scoped>
main
  display: flex
  flex-direction: column
  align-items: center
.user-info
  display: flex
  height: 2.81rem
  width: 7rem
  padding-top: 0.5rem
  padding-left: 0.38rem
  margin-top: 0.3rem
  background: url('../../assets/userBackground.png')
  background-size: 100%
  background-repeat: no-repeat
  img
    height: 0.88rem
    width: 0.88rem
    margin-right: 0.16rem
    border-radius: 50%
    background: #fff
  .right li
    font-size: 0.34rem
    font-family: Adobe Heiti Std
    font-weight: normal
    color: rgba(255,255,255,1)
  li:nth-child(2)
    font-size: 0.28rem
  li:nth-child(3)
    display: flex
    width: 100%
    padding-top: 0.50rem
    font-size: 0.3rem
    color: rgba(224,235,243,1)
    div:nth-child(1)
      margin-right: 1rem
    span
      color: rgba(255,255,255,1)

.invite-box
  display: flex
  margin-top: 0.51rem
  div
    display: flex
    padding: 0.31rem 0.77rem 0.41rem 0.77rem
    width: 3.23rem
    height: 0.98rem
    background: rgba(255,255,255,1)
    box-shadow: 0rem 0.09rem 0.09rem 0.01rem rgba(63,125,231,0.09)
    border-radius: 0.1rem
    font-size: 0.28rem
    font-family: PingFang
    font-weight: 500
    color: rgba(44,62,80,1)
    span
      display: inline-block
      height: 0.3rem
      width: 0.3rem
      margin-right: 0.24rem
      background-image: url('../../assets/userInfoIcon.png')
      background-size: 4rem
      background-repeat: no-repeat
  div:nth-child(1)
    margin-right: 0.3rem
    span
      background-position: -2.84rem -0.18rem
  div:nth-child(2) span
    background-position: -3.54rem -0.18rem

.other-info
  width: 100vw
  margin-top: 0.5rem
  li
    display: flex
    justify-content: space-between
    border-bottom: 1px solid rgba(238,238,238,1)
    padding: 0.31rem
  li div
    font-size: 0.28rem
    font-family: PingFang
    font-weight: 500
    color: rgba(51,51,51,1)
    display: flex
    align-items: center
    span
      display: inline-block
      height: 0.3rem
      width: 0.3rem
      margin-right: 0.24rem
      background-image: url('../../assets/userInfoIcon.png')
      background-size: 5rem
      background-repeat: no-repeat
  li:nth-child(1) span
    background-position: -1rem -0.3rem
  li:nth-child(2) span
    background-position: -1.78rem -0.25rem
  li:nth-child(3) span
    background-position: -2.6rem -0.25rem
.qr_code
  padding: 24px
  position: fixed
  left: 50%
  top: 50%
  background: #fff
  transform: translate(-50%, -50%)
  border-radius: 10px
  .qr_code_title
    width: 100%
    text-align: center
    margin-bottom: 10px
    font-size: 16px
  .qr_code_img
    width: 180px
    height: 180px
</style>
