<template>
  <main class="personal_center">
    <div class="user-info">
      <img src="http://oss.tdianyi.com/front/ek7cPQsFbEt7DXT7E7B6Xaf62a46SCXw.png" alt />
      <ul class="right">
        <li>
          {{account_name || '请登录'}}
          <!-- <span class="user_my_icon"/> -->
        </li>
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
        <span class="my_icon" />
        <span>邀请店铺</span>
      </div>
      <div @click="invite('people')">
        <span class="my_icon" />
        <span>邀请创客</span>
      </div>
    </div>

    <!-- @click="handleShowView('bank') -->
    <!-- rightName="未提交资料" 此属性用来加提示 -->
    <PersonalCenterGird leftName="我的银行卡" type="0" @onClick="mycard()" />
    <PersonalCenterGird leftName="礼品额度使用记录" type="1" @onClick="integralRecord()" />
    <PersonalCenterGird
      leftName="身份认证"
      type="2"
      :rightName="sq_array[sq_status]"
      @onClick="goto()"
    />
    <PersonalCenterGird leftName="实战攻略" type="4" @onClick="jumpArticle()" />
    <PersonalCenterGird leftName="设置" type="3" @onClick="handleShowView('configuration')" />
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
import { Icon, Overlay } from "vant";
import QRCode from "qrcode";
import store from "@/store/index"; //vuex
import PersonalCenterGird from "./component/personalCenterGird";
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
      title: "", // 邀请时候的title
      is_existence: "",
      sq_status: "",
      sq_array: ["未认证", "资料审核中", "资料审核失败", "审核通过"]
    };
  },
  components: {
    VBank,
    VConfiguration,
    PersonalCenterGird
  },
  created() {
    this.fetchAuthUser();
  },
  methods: {
    //跳转我的银行卡页面
    mycard() {
      this.$router.push({ path: "/my/card_new" });
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
    goto() {
      console.log(this.is_existence);
      if (this.is_existence) {
        this.$router.push({
          path: "/completeInformation/IDCard",
          query: { type: "edit" }
        });
      } else {
        this.$router.push({
          path: "/completeInformation/IDCard",
          query: { type: "add", party_id: this.party_id }
        });
      }
    },
    jumpArticle() {
      console.log("jhgfuyij");
      const roleType = localStorage.getItem("role_type");
      location.href = process.env.INFORMATION_URL + "?role_uusn=" + roleType;
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
              supplier_party_id = 0,
              is_existence,
              sq_status
            }
          }) => {
            if (account_name) {
              this.account_name = account_name;
              this.account_phone = account_phone;
              this.account_balance = money;
              this.integral = integral;
              this.supplier_party_id = supplier_party_id;
              this.party_id = party_id;
              this.sq_status = sq_status;
              this.is_existence = is_existence;
              // console.log(sq_status,'sq_status')
              //提供给银行卡验证页面使用
              store.dispatch("ql_bank/recordInformation", { party_id });
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
<style lang="scss" scoped>
@import "./my-style.scss";
</style>
