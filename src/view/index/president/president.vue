<template>
  <div class="president">
    <div class="container">
      <h2 class="title">
        余额
      </h2>
      <div class="money">
        {{info.amount}}
      </div>
      <div class="withdraw-box">
        <div class="withdraw">
          <x-button type="primary" @click.native="goTo(1)">提现</x-button>
          <div class="to-list" @click="goTo(0)">
            查看提现记录
          </div>
        </div>
      </div>

      <div class="grid-box">
        <grid>
          <grid-item>
            <div class="grid-title">今日收益</div>
            <div class="grid-money">{{info.today_fee}}</div>
          </grid-item>
          <grid-item v-if="info.is_president">
            <div class="grid-title">我邀请的创客</div>
            <div class="grid-money">{{info.supplier_number}}</div>
          </grid-item>
          <grid-item>
            <div class="grid-title">我邀请的店铺</div>
            <div class="grid-money">{{info.entrepreneur_number}}</div>
          </grid-item>
        </grid>
      </div>

      <div>
        <grid>
          <grid-item label="邀请创客" @click.native="invite('people')">
            <img slot="icon" src="/static/img/2_03.png"/>
          </grid-item>
          <grid-item label="邀请店铺" @click.native="invite('store')">
            <img slot="icon" src="/static/img/1_05.png"/>
          </grid-item>
        </grid>
      </div>

      <!-- <div>
        <tab active-color="red">
          <tab-item selected @on-item-click="itemClick">创客排行榜</tab-item>
          <tab-item @on-item-click="itemClick">店铺排行榜</tab-item>
        </tab>
      </div>
      <div class="table">
        <x-table>
          <thead>
          <tr>
            <th>排名</th>
            <th>名称</th>
            <th>电话号码</th>
            <th>总收益</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>张三</td>
              <td>13000001111</td>
              <td>99.9999</td>
            </tr>
            <tr>
              <td>2</td>
              <td>张三</td>
              <td>13000001111</td>
              <td>99.9999</td>
            </tr>
            <tr>
              <td>3</td>
              <td>张三</td>
              <td>13000001111</td>
              <td>99.9999</td>
            </tr>
          </tbody>
        </x-table>
      </div> -->


    </div>
    <alert v-model="is_show" title="邀请创客">
      <qrcode :value="qrCodeUrl"></qrcode>
    </alert>
  </div>
</template>

<script>
  import { XTable, Alert, LoadMore, Card, XButton, Grid, GridItem, Qrcode, Tab, TabItem,  } from 'vux'
  import { indexInfo } from "@api/api"
  export default {
    data(){
      return {
        money: '',
        qrCodeUrl: '', // 二维码信息
        is_show: false, // 展示邀请页面
        title: '', // 邀请时候的title
        info: {}, // 首页数据
      }
    },
    computed: {
    },
    components: {
      Card,
      LoadMore,
      XTable,
      XButton,
      Grid,
      GridItem,
      Qrcode,
      Alert,
      Tab,
      TabItem,
    },
    methods: {
      invite(name){
          if(name == 'people'){
              this.qrCodeUrl = `http://${window.location.host}/ck/register?invite_id=${this.info.party_id}`
              this.is_show = true
              this.title = '邀请创客'
          }else{
              this.qrCodeUrl = `${process.env.SUPPLIER_URL}/register?invite_phone=${this.info.account_phone}`
              this.is_show = true
              this.title = '邀请店铺'
          }
          console.log(this.qrCodeUrl)
      },
      itemClick(index){
          console.log(index)
      },
      goTo(type){
        // 提现跳转
        if(type == 1){
          this.$router.push('/index/withdraw')
        }else{
          this.$router.push('/index/withdrawList')
        }
      }
    },
    created() {
      // 获取数据
      indexInfo().then(res => {
        if(res.code == 200){
          this.info = res.data
        }
      })
    },
  }
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
