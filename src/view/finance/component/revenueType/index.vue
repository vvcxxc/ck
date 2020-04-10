<template>
  <div class="revenue_type_box">
    <div class="revenue_type_title" @click="updateShow()">
      <span class="confirm_type">{{showType}}</span>
      <van-icon name="arrow-down" class="icon" />
   </div>
    <div class="revenue_type" v-show="show">
      <span v-for="(item,i) in list" @click="recordIndex(i,item)" :class="i==index? 'checked':'no_checked'">{{item}}</span>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { DatetimePicker, Popup, Icon, Divider  } from "vant";
  import store from "@/store/index"
  import './index.styl'
  export default {
    data(){
      return {
        list:[
          '费率返点',
          '券分润',
          '广告分润'
        ],
        index:0,
        show:false,
        title:''
      }
    },
    computed:{
      showType(){
        return ["费率返点","券分润","广告分润","费率返点"][store.state.ql.profit_type-1]
      }
    },
    mounted(){
      this.index = store.state.ql.profit_type-1
    },
    methods:{
      recordIndex(index,item){
        this.index = index
        this.show= false
        this.title = item
        this.$emit('onChange',index+1)
      },
      updateShow(){
        this.show= !this.show
      }
    }

  }
</script>