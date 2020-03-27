<template>
  <div class="page">
    <van-nav-bar :border="false" title="修改银行卡" left-arrow @click-left="goBack" />
    <div class="main">
      <div class="title-syz">上传银行卡信息</div>
      <div class="upload-box">
        <van-uploader
          :after-read="afterReadFront"
          v-model="imgFront"
          :max-count="1"
          class="upload-main"
          :before-delete="deleteFront"
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
          :before-delete="deleteBack"
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
          <input
            type="text"
            v-model="bank_account_name"
            placeholder="请输入开户人姓名"
            class="input"
            @focus="scroll"
          />
        </div>
      </div>
      <div class="input-box">
        <div class="label">银行卡号</div>
        <div class="input-area">
          <input
            type="text"
            v-model="bank_card_number"
            placeholder="请输入银行卡号"
            class="input"
            @focus="scroll"
          />
        </div>
      </div>
      <div class="input-box">
        <div class="label">开户行</div>
        <div class="input-area" @click="show_list = true">
          <div class="input" v-if='bank_name'>{{bank_name}}</div>
            <div class="input no-choose" v-if='!bank_name'>请输入开户行</div>
        </div>
      </div>
      <div class="input-box">
        <div class="label">支行</div>
        <div class="input-area">
          <input
            type="text"
            v-model="bank_branch"
            placeholder="请输入支行"
            class="input"
            @focus="scroll"
          />
        </div>
      </div>
    </div>
     <van-popup v-model="show_list" position="bottom" :style="{ height: '30%' }">
      <van-picker
        show-toolbar
        title="选择银行"
        :columns="bank_list"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
    <div class="botton-box">
      <div class="botton" @click="submit">提交</div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import upload from "../../../api/oss";
import { getEditBankInfo, editBank, getBankList } from "../service";
export default {
  data() {
    return {
      bank_name: "",
      bank_account_name: "",
      bank_card_number: "",
      bank_positive: "",
      bank_opposite: "",
      bank_branch: "",
      imgBack: [],
      imgFront: [],
      id: null,
          bank_list: [],
      show_list: false
    };
  },

  created() {
    getBankList().then(res => {
      let bank_list = [];
      let list = res.data
      for (let i = 0; i < list.length; i ++){
        bank_list.push(list[i].bank_name)
      }
      this.bank_list = bank_list;
    });
    getEditBankInfo().then(res => {
      console.log(res);
      this.bank_account_name = res.data.bank_account_name;
      this.bank_branch = res.data.bank_branch;
      this.bank_card_number = res.data.bank_card_number;
      this.bank_name = res.data.bank_name;
      this.bank_opposite = res.data.bank_opposite;
      this.bank_positive = res.data.bank_positive;
      this.id = res.data.id
      this.imgBack = [
        {
          url: "http://tmwl.oss-cn-shenzhen.aliyuncs.com/" + this.bank_opposite
        }
      ];
      this.imgFront = [
        {
          url: "http://tmwl.oss-cn-shenzhen.aliyuncs.com/" + this.bank_positive
        }
      ];
    });
  },

  methods: {
     onConfirm(value, index) {
      this.bank_name = value
      this.show_list = false
    },
    onCancel() {
      this.show_list = false
    },
    afterReadFront(file) {
      // 此时可以自行将文件上传至服务器,正面
      upload(file.content).then(res => {
        this.bank_positive = res.data.path;
        this.imgFront[0] = {
          url: file.content,
          isImage: true
        };
      });
    },
    afterReadBack(file) {
      // 此时可以自行将文件上传至服务器，反面
      upload(file.content).then(res => {
        this.bank_opposite = res.data.path;
        this.imgBack[0] = {
          url: file.content,
          isImage: true
        };
      });
    },
    deleteFront() {
      this.bank_positive = "";
      return true;
    },
    deleteBack() {
      this.bank_opposite = "";
      return true;
    },
    // 返回
    goBack() {
      this.$router.go(-1);
    },
    submit() {
      let data = {
        id: this.id,
        bank_name: this.bank_name,
        bank_account_name: this.bank_account_name,
        bank_card_number: this.bank_card_number,
        bank_positive: this.bank_positive,
        bank_opposite: this.bank_opposite,
        bank_branch: this.bank_branch,
      }
      editBank(this.id, data).then (res => {
        console.log(res)
        if(res.status_code == 200){
          Toast.success('修改成功')
          this.$router.go(-1);
        }else {
          Toast.fail(res.message)
        }
      })
    },
    // 键盘事件兼容
    scroll() {
      window.scrollTo(100, 500);
      console.log(3234);
    }
  }
};
</script>
<style lang="sass" scoped>
@import './index'
</style>
