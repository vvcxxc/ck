<template>
  <div class="president">
    <div class="president_header">首页</div>
    <div class="sum_container">
      <div class="sum_container_top">
        <div class="sum_container_top_left">
          <div class="sum_container_balance_title">余额</div>
          <div class="sum_container_balance_num">{{info.amount}}</div>
        </div>
        <div class="sum_container_top_right">
          <div class="sum_container_detail_titleBox" @click="goTo(0)">
            <div class="detail_title">提现明细</div>
            <div class="detail_icon">
              <van-icon name="arrow" />
            </div>
          </div>
          <div class="sum_container_detail_btn" @click="goTo(1)">提现</div>
        </div>
      </div>
      <div class="sum_container_bottom">
        <div class="sum_container_bottom_content">
          <div class="today_earnings_title">今日收益</div>
          <div class="today_earnings_num">{{info.today_fee}}</div>
        </div>
        <div class="sum_container_bottom_icon" @click="goTo(3)">
          <van-icon name="down" />
        </div>
      </div>
    </div>

    <div class="entrepreneur_box">
      <div class="entrepreneur_title">店铺创客</div>
      <div class="entrepreneur_content">
        <div class="entrepreneur_left">
          <div class="invitation_entrepreneur_icon"></div>
          <div class="invitation_entrepreneur_title">邀请的店铺数</div>
          <div class="invitation_entrepreneur_num">{{info.supplier_number}}</div>
          <div class="invitation_entrepreneur_btn" @click="invite('store')">邀请店铺</div>
        </div>
        <div class="entrepreneur_right">
          <div class="invitation_entrepreneur_icon2"></div>
          <div class="invitation_entrepreneur_title">邀请的创客数</div>
          <div class="invitation_entrepreneur_num">{{info.entrepreneur_number}}</div>
          <div class="invitation_entrepreneur_btn" @click="invite('people')">邀请创客</div>
        </div>
      </div>
    </div>
    <van-popup v-model="is_show">
      <div class="qr_code">
        <div class="qr_code_title">{{title}}</div>
        <img class="qr_code_img" :src="codeUrl" />
      </div>
    </van-popup>
  </div>
</template>

<script>
import QRCode from "qrcode";
import Vue from "vue";
import { Icon, Popup } from "vant";
Vue.use(Icon);
Vue.use(Popup);
import { indexInfo } from "@api/api";
export default {
  data() {
    return {
      money: "",
      qrCodeUrl: "", // 二维码信息
      codeUrl: "", //二维码图片路径
      is_show: false, // 展示邀请页面
      title: "", // 邀请时候的title
      info: {} // 首页数据
    };
  },
  computed: {},
  methods: {
    invite(name) {
      if (name == "people") {
        let qrCodeUrl = `http://${window.location.host}/ck/register?invite_id=${this.info.party_id}`;
        this.qrCodeUrl = qrCodeUrl;
        this.showQRcode(qrCodeUrl);
        this.title = "邀请创客";
      } else {
        let qrCodeUrl = `${process.env.SUPPLIER_URL}/register?invite_phone=${this.info.account_phone}`;
        this.qrCodeUrl = qrCodeUrl;
        this.showQRcode(qrCodeUrl);
        this.title = "邀请店铺";
      }
    },
    itemClick(index) {
      console.log(index);
    },
    goTo(type) {
      // 提现跳转
      if (type == 1) {
        this.$router.push("/index/withdraw");
      } else if (type == 0) {
        this.$router.push("/index/withdrawList");
      } else if (type == 3) {
        this.$router.push("/finance");
      } else if (type == "chuangke") {
        this.$router.push("/entrepreneur");
      }
    },
    showQRcode(data) {
      console.log("showQRcode", data);
      QRCode.toDataURL(data)
        .then(url => {
          this.codeUrl = url;
          this.is_show = true;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    // 获取数据
    indexInfo().then(res => {
      if (res.code == 200) {
        this.info = res.data;
      }
    });
  }
};
</script>

<style lang="sass" scoped>
  @import './style'
</style>
<style lang="sass">
$c_black: #000

.profit-title
  .weui-panel__hd
    color: $c_black
    text-align: center
</style>
