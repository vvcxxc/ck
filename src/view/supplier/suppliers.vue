<template>
  <div class="supplier">
    <x-header title="店铺" :left-options="{showBack: false}"></x-header>
    <c-scroll class="supplier-wrapper ofh" :pullUpLoad="true">
      <div class="container">
        <c-list v-for="(item, index) in suppliers" :key="index" :data="item" :showOptions="{image: true}"
          @on-click-button="onClickButton"
        ></c-list>
      </div>
      <load-more :tip="tipDesc" :show-loading="flagLoading" v-if="!suppliers.length"></load-more>
    </c-scroll>

    <div v-transfer-dom>
      <confirm
         v-model="showModal"
         show-input
         :title="`分配积分`"
         :input-attrs="{type: 'number'}"
         @on-confirm="onConfirm"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
  import { XHeader, Confirm, TransferDomDirective as TransferDom } from "vux"
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
      Confirm
    },
    created() {
      this.fetchSuppliers()
    },
    methods: {
      onClickButton(id) {
        this.showModal = true;
        this.currentId = id
      },
      async onConfirm(val) {
        if (!(Number(val) > 0)) {
          this.$vux.toast.text('请输入正确的数字');
          setTimeout(() => {
            window.location.reload()
          }, 200)
          return
        } else {
          const { code, message = '' } = await giveIntegral({ party_id: this.currentId, integral: val, role_type: 'supplier' });
          if (code === 200) {
            this.$vux.toast.text(message || '分配成功');
            this.fetchSuppliers()
          } else {
            this.$vux.toast.text(message);
          }

          setTimeout(() => {
            window.location.reload()
          }, 200)
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
          type: this.role_type
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
                  sum += +value
                }
                CH_MAP[key] && (output[CH_MAP[key]] = value)
              }
              return {
                src: 'static/img/supplier.png',
                desc: { ...output, [CH_MAP['turnover']]: sum },
                id: item.id,
                integral: item.integral.length > 0 ? item.integral[0]['integral'] : 0,
                useIntegral: item.integral_log.length > 0 ? item.integral_log.reduce((prev, curr, idx, arr) => {
                  return (typeof prev === 'object' ? prev.integral : prev) + Number(curr.integral)
                }) : 0
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
</style>
