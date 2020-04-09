<template>
  <div class="revenue_type_box">
    <div class="revenue_type_title" @click="updateShow()">
      <span class="confirm_type">{{title}}</span>
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
    mounted(){
      this.index = store.state.ql.profit_type-1
      switch ( store.state.ql.profit_type ) {//ql 用于区别title
        case 1:
          this.title = "费率返点";
          break;
        case 2:
          this.title = "券分润";
          break;
        case 3:
          this.title = "广告分润";
          break;
        default:
          this.title = "费率返点";
      }
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