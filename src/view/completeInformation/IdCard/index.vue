<template>
  <div class="page">
    <van-nav-bar :border="false" title="提交资质" left-arrow />
    <div class="main">
      <div class="title">上传身份证信息</div>
      <div class="upload-box">
        <van-uploader :after-read="afterRead">
          <div class="upload">
            <div class="upload-top">
              <img src="/static/img/id-front.png" class="upload-bj" />
              <img src="/static/img/photo.png" class="upload-photo" />
            </div>
            <div class="upload-bottom">身份证正面</div>
          </div>
        </van-uploader>

        <van-uploader :after-read="afterRead">
          <div class="upload">
            <div class="upload-top">
              <img src="/static/img/id-back.png" class="upload-bj" />
              <img src="/static/img/photo.png" class="upload-photo" />
            </div>
            <div class="upload-bottom">身份证反面</div>
          </div>
        </van-uploader>

        <van-uploader :after-read="afterRead">
          <div class="upload">
            <div class="upload-top">
              <img src="/static/img/id-hand.png" class="upload-bj" />
              <img src="/static/img/photo.png" class="upload-photo" />
            </div>
            <div class="upload-bottom">手持身份证正面</div>
          </div>
        </van-uploader>
      </div>

      <div class="input-box">
        <div class="label">姓名</div>
        <div class="input-area">
          <input type="text" v-model="name" placeholder="请输入用户名" class="input" />
        </div>
      </div>
      <div class="input-box">
        <div class="label">身份证号</div>
        <div class="input-area">
          <input type="text" v-model="number" placeholder="请输入身份证号" class="input" />
        </div>
      </div>
      <div class="input-box">
        <div class="label">有效期</div>
        <div class="date-area">
          <div class="date">请选择身份证有效期</div>
          <van-icon name="arrow" class="icon" />
        </div>
      </div>
    </div>
    <van-popup position="bottom" v-model="show" get-container="#app" class="date-picker">
      <div class="title">
        请选择身份证有效期
        <van-icon name="cross" class="cancel" size='.3rem'/>
      </div>
      <div class="date-tab">
        <div :class="date_tab == 1 ? 'date-item actived' : 'date-item'" @click="dateTab(1)">{{start_date}}</div>
        至
        <div :class="date_tab == 2 ? 'date-item actived' : 'date-item'" @click="dateTab(2)">{{end_date}}</div>
      </div>
      <div v-if="date_tab == 2" :class="long_date == 1 ? 'long-date actived' : 'long-date'" @click="longDate">长期有效</div>
      <van-datetime-picker
        v-model="currentDate"
        :show-toolbar='false'
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
      />
      <div class="date-confirm">确定</div>
    </van-popup>

    <div class="botton-box">
      <div class="botton">下一步</div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      name: "",
      number: "",
      date: "",
      id_front: "",
      id_back: "",
      id_hand: "",
      show: true,
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2035, 10, 1),
      currentDate: new Date(),
      date_tab: 1, // 为1是开始日期，2是结束日期
      start_date: '年/月/日',
      end_date: '年/月/日',
      long_date: 0
    };
  },
  watch: {
    currentDate(val){
      if(this.date_tab == 1){
        this.start_date = dayjs(val).format("YYYY-MM-DD")
      }else if(this.date_tab == 2){
        this.long_date = 0
        this.end_date = dayjs(val).format("YYYY-MM-DD")
      }
    }
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    // 选择时间类别
    dateTab (tab){
      this.date_tab = tab
      console.log(this.currentDate)
    },
    // 选择时间
    dateChange (value){
      console.log(value)
    },
    // 选择长期有效
    longDate (){
      this.long_date = !this.long_date
      if(this.long_date == 1){
        this.end_date = '长期有效'
      }else {
        this.end_date = '年/月/日'
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>