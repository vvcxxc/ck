<template>
  <div class="entrepreneur">
    <x-header title="创客" :left-options="{showBack: false}"></x-header>
    <c-scroll-new class="entrepreneur-wrapper" 
      :data="entrepreneurs"
      @pullingUp="hanleLoadMore"
    >
      <div class="container">
        <c-list v-for="(item, index) in entrepreneurs" :key="index" :showOptions="{image: true}" :data="item"></c-list>
      </div>
    </c-scroll-new>
  </div>
</template>

<script>
  import { XHeader } from "vux"
  import { mapGetters } from "vuex"
  import CScroll from "@components/c-scroll/scroll"
  import CList from "@components/c-list/list"
  import CScrollNew from "@components/c-n-scroll/scroll"

  import { entrepreneurs } from "@api/api"

  const REQUEST_ONE = 1

  export default {
    data() {
      return {
        entrepreneurs: [],
        tempEntrepreneur: {
          account_name: "创客测试号",
          account_phone: "13800138000",
          account_regist_time: 1532068447,
          party_id: 121
        }
      }
    },
    computed: {
      ...mapGetters(['role_type'])
    },
    components: {
      XHeader,
      CScroll,
      CList,
      CScrollNew
    },
    methods: {
      hanleLoadMore () {
        window.setTimeout(() => {
          this.fetchEntrepreneurs()
        }, 1000)
      },
      async fetchEntrepreneurs() {
        const params = {
          type: this.role_type,
          page: 2
        }
        let { code, data, message } = await entrepreneurs(params)
        const CH_MAP = {
          account_name: '用户',
          account_phone: '手机',
          account_regist_time: '注册时间'
        }

        if(code == REQUEST_ONE){
          this.entrepreneurs = [
            ...this.entrepreneurs,
            ...data.map(item => {
              let output = {}
              for(let [key, value] of Object.entries(item)){
                CH_MAP[key] && (output[CH_MAP[key]] = value)
              }
              return {
                src: 'static/img/face2.png',
                desc: output
              }
            })
          ]
        } else {

        }
      }
    },
    created() {
      this.fetchEntrepreneurs()
    }
  }
</script>

<style lang="sass" scoped>
@import "./style"
</style>
