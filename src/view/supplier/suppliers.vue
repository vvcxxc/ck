<template>
  <div class="supplier">
    <x-header title="店铺" :left-options="{showBack: false}"></x-header>
    <!-- <c-scroll class="supplier-wrapper ofh" :pullUpLoad="true"> -->
      <div class="search">
        <input placeholder="手机号或店铺名称" v-model="keyword" class="search-input"/>
        <div class="search-button" @click="search">搜索</div>
        <i class="search-icon"><icon type="search"></icon></i>
        <i class="search-clear" @click="onclear"><icon type="clear" v-show="is_clear" ></icon></i>
      </div>
      <div class="container page">
        <c-list v-for="(item, index) in suppliers" :key="index" :data="item" :showOptions="{image: true}"
          @on-click-button="onClickButton" @changeReturn='changeReturn'
        ></c-list>
        <div class="loadMore" @click="loadMore" v-show="is_more">
          {{load_more}}
        </div>
      </div>
      <load-more :tip="tipDesc" :show-loading="flagLoading" v-if="!suppliers.length"></load-more>
    <!-- </c-scroll> -->

    <div v-transfer-dom>
      <confirm
         v-model="showModal"
         show-input
         :title="`分配礼品额度`"
         :input-attrs="{type: 'number', id: 'reset-input'}"
         @on-confirm="onConfirm"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
  import { XHeader, Confirm, TransferDomDirective as TransferDom, Icon } from "vux"
  import { suppliers } from "@api/api"
  import { mapGetters } from 'vuex'
  import { LoadMore } from 'vux'
  import CScroll from "@components/c-scroll/scroll"
  import CList from "@components/c-list/list"
  import {giveIntegral} from "../../api/api";

  const REQUEST_OK = 200
  const REQUEST_CODE_ONE = 1

  export default {
    data() {
      return {
        suppliers: [],
        tipDesc: '正在加载',
        flagLoading: true,
        showModal: false,
        currentId: 0,
        page: 2,
        is_more: true,
        load_more: '点击加载更多',
        keyword: '',
        is_clear: false,
        is_more: false
      }
    },
    watch: {
      keyword: function(a){
        if(!a){
          this.is_clear = false
        }else{
          this.is_clear = true
        }
      },
      suppliers: function(a){
        if(a.length<10){
          this.is_more = false
        }else{
          this.is_more = true
        }
      }
    },
    computed: {
      ...mapGetters(['role_type']),
    },
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      CScroll,
      CList,
      LoadMore,
      Confirm,
      Icon
    },
    created() {
      console.log('构建成功1')
      this.fetchSuppliers()
    },
    methods: {
      // 搜索
      onclear (){
        console.log('das')
        this.keyword = ''
      },
      changeReturn(){
        this.fetchSuppliers()
      },
      search (){
        console.log('sss')
        let params = {
          type: this.role_type,
          page: 1,
          limit: 10,
          keyword: this.keyword
        }
         suppliers(params).then(({ code, data, message, total }) => {
          const CH_MAP = {
            turnover: '总营业额',
            name: '店铺',
            mobile: '手机',
            money: '今日营业额'
          }

          this.flagLoading = false

          if (!data.length) {
            this.tipDesc = '抱歉，未能找到您搜索的商家'
          }

          const turnover_fields = ['sale_money', 'supplierMoney', 'wd_money']
          if (code == REQUEST_CODE_ONE) {
            this.suppliers = data.map(item => {
              let output = {},
                sum = 0
              for (let [key, value] of Object.entries(item)) {

                if (turnover_fields.includes(key)) {
                  sum += +value * 1
                }
                CH_MAP[key] && (output[CH_MAP[key]] = value)
              }
               if(sum.toString().includes('.')){
                sum = Math.floor(sum*10000) / 10000
              }

              return {
                src: 'static/img/supplier.png',
                desc: { ...output, [CH_MAP['turnover']]: sum },
                id: item.id,
                integral: item.integral.length > 0 ? item.integral[0]['integral'] : 0,
                useIntegral: item.integral_log.length > 0 ? item.integral_log.reduce((prev, curr, idx, arr) => {
                  return (typeof prev === 'object' ? prev.integral : prev) + Number(curr.integral)
                }) : 0,
                is_show: !!item.name,
                can_zero_rate: item.can_zero_rate,
                open_zero_rate: item.open_zero_rate,
                preview: item.preview || 'static/img/supplier.png'
              }
            })
          }
        }).catch(err => console.log(err))
      },
      loadMore(){
        if(!this.is_more){
          return
        }
         const CH_MAP = {
            turnover: '总营业额',
            name: '店铺',
            mobile: '手机',
            money: '今日营业额'
          }

        let params = {
          type: this.role_type,
          page: this.page,
          limit: 10,
          keyword: this.keyword
        }
        suppliers(params).then(res => {
          if(!res.data.length){
            this.is_more = false
            this.load_more = '已经到底啦~'
          }else{
            this.page = this.page + 1
            let data = res.data
             const turnover_fields = ['sale_money', 'supplierMoney', 'wd_money']
            this.suppliers = this.suppliers.concat(data.map(item => {
              let output = {},
                sum = 0
              for (let [key, value] of Object.entries(item)) {
                if (turnover_fields.includes(key)) {
                  sum += +value
                }
                CH_MAP[key] && (output[CH_MAP[key]] = value)
              }
              if(sum.toString().includes('.')){
                sum = Math.floor(sum*10000) / 10000
              }
              return {
                src: 'static/img/supplier.png',
                desc: { ...output, [CH_MAP['turnover']]: sum },
                id: item.id,
                integral: item.integral.length > 0 ? item.integral[0]['integral'] : 0,
                useIntegral: item.integral_log.length > 0 ? item.integral_log.reduce((prev, curr, idx, arr) => {
                  return (typeof prev === 'object' ? prev.integral : prev) + Number(curr.integral)
                }) : 0,
                is_show: !!item.name,
                can_zero_rate: item.can_zero_rate,
                open_zero_rate: item.open_zero_rate,
                preview: item.preview || 'static/img/supplier.png'
              }
            }))
          }
        })
      },
      onClickButton(id) {
        this.showModal = true;
        this.currentId = id
        document.getElementById('reset-input').addEventListener('blur', function() {
          window.scroll(0, 0)
        })
      },
      async onConfirm(val) {
        if (!(Number(val) > 0)) {
          this.$vux.toast.text('请输入正确的数字');
          window.scroll(0, 0)
          return
        } else {
          const { code, message = '' } = await giveIntegral({ party_id: this.currentId, integral: val, role_type: 'supplier' });
          if (code === 200) {
            this.$vux.toast.text(message || '分配成功');
            this.fetchSuppliers()
          } else {
            this.$vux.toast.text(message);
          }
          window.scroll(0, 0)
          // const isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1; //android终端
          //   // 当被绑定的元素插入到 DOM 中时……
          // if(isAndroid){
          //   return;
          // }
          //
          // let input = document.getElementById('reset-input');
          // if (!input) {
          //   input = document.createElement('INPUT');
          //   input.type = 'text';
          //   input.style.height = '0px'
          //   input.style.width = '0px'
          //   input.style.position = 'absolute'
          //   input.id = 'reset-input';
          //   document.body.prepend(input);
          // }
          //
          // // node.style.cssText = "height: 90%;";
          // input.focus();
          // input.blur();
          // document.getElementsByClassName('supplier').style.height = '90%'
          // document.getElementsByClassName('supplier-wrapper').style.height = '100%'
          // // document.getElementsByClassName('container').style.height = '100%'
          // console.log('reset---')
        }
      },
      fetchSuppliers() {
        const params = {
          type: this.role_type,
          page: 1,
          limit: 10,
          keyword: this.keyword
        }
        suppliers(params).then(({ code, data, message, total }) => {
          const CH_MAP = {
            turnover: '总营业额',
            name: '店铺',
            mobile: '手机',
            money: '今日营业额'
          }

          this.flagLoading = false

          if (!data.length) {
            this.tipDesc = '暂无数据'
          }

          const turnover_fields = ['sale_money', 'supplierMoney', 'wd_money']
          if (code == REQUEST_CODE_ONE) {
            this.suppliers = data.map(item => {
              let output = {},
                sum = 0
              for (let [key, value] of Object.entries(item)) {

                if (turnover_fields.includes(key)) {
                  sum += +value * 1
                }
                CH_MAP[key] && (output[CH_MAP[key]] = value)
              }
               if(sum.toString().includes('.')){
                sum = Math.floor(sum*10000) / 10000
              }

              return {
                src: 'static/img/supplier.png',
                desc: { ...output, [CH_MAP['turnover']]: sum },
                id: item.id,
                integral: item.integral.length > 0 ? item.integral[0]['integral'] : 0,
                useIntegral: item.integral_log.length > 0 ? item.integral_log.reduce((prev, curr, idx, arr) => {
                  return (typeof prev === 'object' ? prev.integral : prev) + Number(curr.integral)
                }) : 0,
                is_show: !!item.name,
                can_zero_rate: item.can_zero_rate,
                open_zero_rate: item.open_zero_rate,
                preview: item.preview || 'static/img/supplier.png'
              }
            })
          }
        }).catch(err => console.log(err))
      }
    }
  }
</script>
<style lang="sass">
  @import "./style"
  .page
    padding-bottom: 60px
  .loadMore
    // margin-bottom: 80px
    height: 20px
    text-align: center
    line-height: 20px
    font-size: 14px
  .search
    height: 40px
    width: 100%
    position: relative
    box-sizing: border-box
    padding-right: 50px
    padding-left: 5px
    .search-input
      width: 100%
      height: 30px
      line-height: 1
      border-radius: 2px
      padding-left: 30px
      border: 1px solid #666
    .search-button
      position: absolute
      top: 25%
      right: 14px
      font-size: 14px
    .search-icon
      position: absolute
      top: 0
      left: 8px
    .search-clear
      position: absolute
      top: 0
      right: 52px
</style>
