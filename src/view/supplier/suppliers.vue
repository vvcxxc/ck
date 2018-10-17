<template>
  <div class="supplier">
    <x-header title="店铺" :left-options="{showBack: false}"></x-header>
    <c-scroll class="supplier-wrapper ofh">
      <div class="container">
        <c-list v-for="(item, index) in suppliers" :key="index" :data="item" :showOptions="{image: true}"></c-list>
      </div>
      <load-more :tip="tipDesc" :show-loading="flagLoading" v-if="!suppliers.length"></load-more>
    </c-scroll>
  </div>
</template>
<script type="text/javascript">
  import { XHeader } from "vux"
  import { suppliers } from "@api/api"
  import { mapGetters } from 'vuex'
  import { LoadMore } from 'vux'
  import CScroll from "@components/c-scroll/scroll"
  import CList from "@components/c-list/list"

  const REQUEST_OK = 200
  const REQUEST_CODE_ONE = 1

  export default {
    data() {
      return {
        suppliers: [],
        tipDesc: '正在加载',
        flagLoading: true
      }
    },
    computed: {
      ...mapGetters(['role_type']),
    },
    components: {
      XHeader,
      CScroll,
      CList,
      LoadMore
    },
    created() {
      this.fetchSuppliers()
    },
    methods: {
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
                desc: { ...output, [CH_MAP['turnover']]: sum }
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