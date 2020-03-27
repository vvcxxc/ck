<template>
  <div class="index">
    <div class="container">
      <van-nav-bar :border="false" title="首页" />
      <div class="bj"></div>
      <div class="header">
        <div class="header-l">
          <p class="header-l-title">余额</p>
          <p class="header-l-money">{{info.amount}}</p>
        </div>
        <div class="header-r">
          <p class="header-r-title" @click="goTo(0)">
            提现明细
            <van-icon name="arrow" />
          </p>
          <div class="header-r-btn" @click="goTo(1)">提现</div>
        </div>
      </div>

      <div class="info">
        <div class="grid">
          <div class="item">
            <p class="money">{{info.today_fee}}</p>
            <p class="label">今日收益</p>
          </div>
          <div class="item" >
            <p class="money">{{info.supplier_number}}</p>
            <p class="label">邀请的店铺</p>
          </div>
          <div class="item" >
            <p class="money">{{info.entrepreneur_number}}</p>
            <p class="label">邀请的创客</p>
          </div>
        </div>

        <div class="invite-box" @click="invite('store')">
          <div class="invite-botton">
            <i class="icon store" />
            <div>邀请店铺</div>
          </div>
          <div class="invite-botton" @click="invite('people')">
            <i class="icon people" />
            <div>邀请创客</div>
          </div>
        </div>
      </div>

      <div class="top-box">
        <div class="top-tab">
          <div class="tab" @click="tabClick(0)" v-if="roleType == 'president'">
            <div :class="tab == 0 ? 'actived' : ''">创客排行榜</div>
          </div>
          <div class="tab" @click="tabClick(1)">
            <div :class="tab ==1 ? 'actived' : ''">店铺排行榜</div>
          </div>
        </div>

        <div class="top-list">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div v-if="tab == 1">
              <div class="list-item" v-for="(item,key) in list" :key='key' >
              <div class="item-name">{{item.location_name}}</div>
              <div class="item-phone">{{item.tel}}</div>
              <div class="item-money">{{item.money}}</div>
              </div>
            </div>
            <div v-if="tab == 0">
              <div class="list-item" v-for="(item,key) in list" :key='key' >
              <div class="item-name">{{item.account_name}}</div>
              <div class="item-phone">{{item.account_phone}}</div>
              <div class="item-money">{{item.money}}</div>
              </div>
            </div>

          </van-list>
        </div>
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
          <div class="alert-text">目前小熊敬礼平台与双乾支付联合开展电子账户体系，方便平台商家角色提现快速审核以及资金账户安全。</div>
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
import { NavBar, Icon, List, Overlay } from "vant";
import checkLogin from "@/decorator/check_login";
import { getPeopleTopList, getStoreTopList, indexInfo, Notice } from "@api/api";
import { mapGetters } from "vuex";
import QRCode from "qrcode";
const REQUEST_OK = 200;
const ZERO = 0;


export default {
  data() {
    return {
      tab: 0,
      list: [],
      loading: false,
      finished: false,
      page: 1,
      info: {},
      qrCodeUrl: "", // 二维码信息
      codeUrl: "", //二维码图片路径
      is_show: false, // 展示邀请页面
      title: "", // 邀请时候的title
      roleType: '',
      show: false,
      checked: false
    };
  },
  computed: {
    ...mapGetters(["role_type"])
  },
  created() {
    const token = window.localStorage.getItem("token");
    const roleType = localStorage.getItem('role_type')
    this.roleType = roleType
    if(roleType != 'president'){
      this.tab = 1
    }
    if (!token) {
      this.$router.push("/login");
    }
    indexInfo().then(res => {
      this.info = res.data
      if(!sessionStorage.getItem('notice_show')){
        if(!res.data.notice){
        this.show = true
      }
      }
    })
  },
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
    confirmNotice() {
      sessionStorage.setItem('notice_show',1)
      this.show = false
      if(this.checked == true){
        Notice()
      }
    },
    goTo(type) {
      // 提现跳转
      if (type == 1) {
        let {is_existence ,is_sq, is_card_activation, is_opening} = this.info
        if(is_existence){
          switch(is_sq){
            case 0: // 认证失败
              this.$router.push({path: '/submitQua/result'})
              break
            case 1: // 认证成功
              if(is_card_activation){
                if(is_opening){
                  this.$router.push("/index/withdraw");
                }else {
                  this.$router.push({path: '/submitQua/confirmWidraw'})
                }
              }else {
                this.$router.push({path: '/submitQua/bankBind'})
              }
              break
            case 2:
              this.$router.push({path: '/submitQua/result'})
              break
            case 3:
              this.$router.push({path: '/submitQua/result'})
              break
            case 4:
              this.$router.push({path: '/submitQua/result'})
              break
            default:
              this.$router.push("/index/withdraw");
          }
        }else {
          this.$router.push({path: '/submitQua'})
        }
      } else if (type == 0) {
        this.$router.push("/index/withdrawList");
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
    tabClick(index) {
      // index=0 为创客排行榜 =1为店铺排行榜
      this.tab = index;
      this.list = []
      this.page = 1
      if(this.tab){
        this.getStoreTop()
      }else{
        this.getPeopleTop()
      }
    },
    onLoad() {
      // 异步更新数据
      this.finished = true;
      if(this.tab){
        this.getStoreTop()
      }else{
        this.getPeopleTop()
      }
    },
    // 获取创客排行榜
    getPeopleTop (){
      getPeopleTopList(this.page).then(res => {
        this.loading = false;
        this.list =[ ...this.list ,...res.data]
        this.page = this.page + 1
        if(res.pagination.current_page == res.pagination.total_pages || res.pagination.total == null){
          this.finished = true
        }
      })
    },
    // 获取店铺排行榜
    getStoreTop (){
      getStoreTopList(this.page).then(res => {
        this.loading = false;
        this.list =[ ...this.list ,...res.data]
        this.page = this.page + 1
        if(res.pagination.current_page == res.pagination.total_pages || res.pagination.total == null){
          this.finished = true
        }
      })
    }
  }
};
</script>
<style lang="sass" scoped>
  @import './index'
</style>
