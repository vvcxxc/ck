<template>
 <div class="president">
    <div class="main-box">
      <div class="president_header">首页</div>
      <div class="sum_container">
      <div class="sum_container_top">
        <div class="sum_container_top_left">
          <div class="sum_container_balance_title">余额</div>
          <div class="sum_container_balance_num">{{remain_money}}</div>
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
          <div class="today_earnings_num">{{today_money}}</div>
        </div>
        <div class="sum_container_bottom_icon" @click="goTo(3)">
          <van-icon name="down" />
        </div>
      </div>
    </div>
    <div class="entrepreneur_box">
      <div class="entrepreneur_title">店铺创客</div>
      <div class="entrepreneur_content">
        <div class="entrepreneur_left" @click="jumpSurePage('supplier')">
          <div class="invitation_entrepreneur_icon"></div>
          <div class="invitation_entrepreneur_title" >邀请的店铺数</div>
          <div class="invitation_entrepreneur_num">{{info.supplier_number}}</div>
          <div class="invitation_entrepreneur_btn" @click="invite('store',$event)">邀请店铺</div>
        </div>
        <div class="entrepreneur_right" @click="jumpSurePage('entrepreneur')">
          <div class="invitation_entrepreneur_icon2"></div>
          <div class="invitation_entrepreneur_title">邀请的创客数</div>
          <div class="invitation_entrepreneur_num">{{info.entrepreneur_number}}</div>
          <div class="invitation_entrepreneur_btn" @click="invite('people',$event)">邀请创客</div>
        </div>
      </div>
    </div>
    </div>

    <div class="information-box" v-if="article_item">
      <div class="information-title-box">
        <div class="information-title">实战攻略</div>
        <div class="information-more" @click="goToInformation()">更多</div>
      </div>

      <div class="img-box" @click="goToInformation(article_item.id)">
        <div class="img-title">{{article_item.article_title}}</div>
        <img :src="article_item.author_cover" class="information-img" />
        <div class="img-date">{{article_item.publish_time}}</div>
      </div>

      <div class="article-box" v-for="(item,key) in article_list" :key="key" @click="goToInformation(item.id)">
        <div class="article-name">{{item.article_title}}</div>
        <div class="article-date">{{item.publish_time}}</div>
      </div>
    </div>

    <van-overlay :show="is_show" @click="is_show = false">
      <div class="qr_code">
        <div class="qr_code_title">{{title}}</div>
        <img class="qr_code_img" :src="codeUrl" />
      </div>
    </van-overlay>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="alert-box">
          <div class="alert-title">平台提现升级公告</div>
          <div class="alert-text">目前小熊敬礼平台与双乾支付联合开展电子账户体系，方便平台{{people}}角色提现快速审核以及资金账户安全。</div>
          <div class="alert-check-box">
            <van-checkbox v-model="checked" shape="square">我已知晓，下次不再提示</van-checkbox>
          </div>
          <div class="alert-button-box">
            <div class="alert-button" @click="confirmNotice">确定</div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import QRCode from "qrcode";
import { Icon, Popup, Overlay } from "vant";
import { indexInfo, Notice } from "@api/api";
import { getQualityArticle } from "@api/article_api";
export default {
  data() {
    return {
      money: "",
      qrCodeUrl: "", // 二维码信息
      codeUrl: "", //二维码图片路径
      is_show: false, // 展示邀请页面
      title: "", // 邀请时候的title
      info: {}, // 首页数据
      show: false,
      checked: false,
      people: "创客",
      article_item: {},
      article_list: []
    };
  },
  computed: {
    remain_money(){
      if (!isNaN(this.info.amount) && this.info.amount!== '') {
        return  Math.floor(this.info.amount * 100) / 100
      } else {
        return this.info.amount
      }
    },
    today_money(){
      if (!isNaN(this.info.today_fee) && this.info.today_fee!== '') {
          return  Math.floor(this.info.today_fee * 100) / 100
      } else {
        return this.info.today_fee
      }
    }
  },
  mounted() {
    const roleType = localStorage.getItem("role_type");
    this.people = roleType == "entrepreneur" ? "创客" : "会长";
    const params = {
      role_uusn: roleType || "entrepreneur",
      // exclude_article_id: ""
    };
    getQualityArticle(params).then(res => {
      if (res.data.length) {
        if (res.data.length > 0) {
          res.data.map((item, index) => {
            if (index == 0) {
              this.article_item = item;
            } else {
              this.article_list.push(item);
            }
          });
        } else {
          this.article_item = res.data[0];
        }
      }
    });
  },
  methods: {
    invite(name,e) {
      if (name == "people") {
        let qrCodeUrl = `http://${window.location.host}/ck/register?invite_id=${this.info.party_id}`;
        this.qrCodeUrl = qrCodeUrl;
        this.showQRcode(qrCodeUrl);
        this.title = "邀请创客";
      } else {
        let qrCodeUrl = `${process.env.SUPPLIER_URL}/register?phone=${this.info.account_phone}`;
        this.qrCodeUrl = qrCodeUrl;
        this.showQRcode(qrCodeUrl);
        this.title = "邀请店铺";
      }
      e.stopPropagation()
    },
    itemClick(index) {
      console.log(index);
    },
    goToInformation(id) {
      const roleType = localStorage.getItem("role_type");
      if(id){
        console.log(id)
        location.href = process.env.INFORMATION_URL + 'article?id=' + id + '&role_uusn=' + roleType
      }else {
        console.log(333)
         location.href = process.env.INFORMATION_URL + '?role_uusn=' + roleType
      }
    },
    goTo(type) {
      // 提现跳转
      if (type == 1) {
         let {is_existence ,is_sq, is_card_activation, is_opening} = this.info
        if(is_existence){
          switch(is_sq){
            case 2: // 认证失败
              this.$router.push({path: '/submitQua/result'})
              break
            case 3: // 认证成功
              if(is_card_activation){
                if(is_opening){
                  this.$router.push("/index/withdraw");
                } else {
                  this.$router.push({ path: "/submitQua/confirmWithdraw" });
                }
              } else {
                this.$router.push({ path: "/submitQua/bankBind" });
              }
              break
            case 1:
              this.$router.push({path: '/submitQua/result'})
              break
            case 0:
              this.$router.push({path: '/submitQua'})
              break
            default:
              this.$router.push("/index/withdraw");
          }
        } else {
          this.$router.push({ path: "/submitQua" });
        }
      } else if (type == 0) {
        this.$router.push("/index/withdrawList");
      } else if (type == 3) {
        this.$router.push("/finance");
      } else if (type == "chuangke") {
        this.$router.push("/entrepreneur");
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
    confirmNotice() {
      sessionStorage.setItem("notice_show", 1);
      this.show = false;
      if (this.checked == true) {
        Notice();
      }
    },
    // 店铺创客跳转
    jumpSurePage(supplier){
      const roleType = localStorage.getItem('role_type')
      if(roleType == 'entrepreneur' && supplier == 'entrepreneur') return
      this.$router.push("./"+supplier)
    }

  },

  created() {
    // 获取数据
    indexInfo().then(res => {
      if (res.code == 200) {
        this.info = res.data;
        if (!sessionStorage.getItem("notice_show")) {
          if (!res.data.notice) {
            this.show = true;
          }
        }
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
