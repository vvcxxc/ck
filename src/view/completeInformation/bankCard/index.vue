<template>
  <div class="page">
    <van-nav-bar :border="false" title="完善资料" left-arrow />
    <div class="main">
      <div class="title">上传银行卡信息</div>
      <div class="upload-box">
        <van-uploader
          :after-read="afterReadFront"
          v-model="imgFront"
          :max-count="1"
          class="upload-main"
        >
          <div class="upload">
            <div class="upload-top">
              <img src="/static/img/bank-front.png" class="upload-bj" />
              <img src="/static/img/photo.png" class="upload-photo" />
            </div>
            <div class="upload-bottom">银行卡正面</div>
          </div>
        </van-uploader>

        <van-uploader
          :after-read="afterReadBack"
          v-model="imgBack"
          :max-count="1"
          class="upload-main"
        >
          <div class="upload">
            <div class="upload-top">
              <img src="/static/img/bank-back.png" class="upload-bj" />
              <img src="/static/img/photo.png" class="upload-photo" />
            </div>
            <div class="upload-bottom">银行卡反面</div>
          </div>
        </van-uploader>
      </div>

      <div class="input-box">
        <div class="label">开户人</div>
        <div class="input-area">
          <input type="text" v-model="name" placeholder="请输入开户人姓名" class="input" />
        </div>
      </div>
      <div class="input-box">
        <div class="label">银行卡号</div>
        <div class="input-area">
          <input type="text" v-model="number" placeholder="请输入银行卡号" class="input" />
        </div>
      </div>
      <div class="input-box">
        <div class="label">开户行</div>
        <div class="date-area">
          <div class="date">请选择开户行</div>
          <van-icon name="arrow" class="icon" />
        </div>
      </div>
      <div class="input-box">
        <div class="label">支行</div>
        <div class="input-area">
          <input type="text" v-model="bank_address" placeholder="请输入支行" class="input" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import upload from "../../../api/oss";
export default {
  data() {
    return {
      name: "",
      number: "",
      bank_name: "",
      bank_address: "",
      imgBack: [],
      imgFront: [],
      bank_front: "",
      bank_back: ""
    };
  },
  methods: {
    afterReadFront(file) {
      // 此时可以自行将文件上传至服务器,正面
      console.log(file);
      upload(file.content).then(res => {
        console.log(res);
        this.bank_front = res.data.path;
        this.imgFront[0] = {
          url: "http://tmwl.oss-cn-shenzhen.aliyuncs.com/" + res.data.path
        };
      });
    },
    afterReadBack(file) {
      // 此时可以自行将文件上传至服务器，反面
      upload(file.content).then(res => {
        console.log(res);
        this.bank_back = res.data.path;
        this.imgBack[0] = {
          url: "http://tmwl.oss-cn-shenzhen.aliyuncs.com/" + res.data.path
        };
      });
    }
  }
};
</script>
<style lang="sass" scoped>
    @import './index'
</style>