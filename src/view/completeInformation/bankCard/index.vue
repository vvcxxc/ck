<template>
  <div class="page">
    <van-nav-bar :border="false" title="完善资料" left-arrow @click-left="goBack" />
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
            v-model="info.bank_account_name"
            placeholder="请输入开户人姓名"
            class="input"
          />
        </div>
      </div>
      <div class="input-box">
        <div class="label">银行卡号</div>
        <div class="input-area">
          <input type="text" v-model="info.bank_card_number" placeholder="请输入银行卡号" class="input" />
        </div>
      </div>
      <div class="input-box">
        <div class="label">开户行</div>
        <div class="input-area">
          <input type="text" v-model="info.bank_name" placeholder="请输入开户行" class="input" />
        </div>
      </div>
      <div class="input-box">
        <div class="label">支行</div>
        <div class="input-area">
          <input type="text" v-model="info.bank_branch" placeholder="请输入支行" class="input" />
        </div>
      </div>
    </div>
    <div class="botton-box">
      <div class="botton-go-back" @click="goBack">返回上一步</div>
      <div class="botton" @click="submit">提交</div>
    </div>
  </div>
</template>
<script>
import upload from "../../../api/oss";
import { editInfo, addInfo } from "@/api/api";
import store from "@/store/index";
import { Toast } from "vant";
import Validate from "../validate";
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
  mounted() {
    if (this.info.bank_positive) {
      this.imgFront = [
        {
          url: "http://tmwl.oss-cn-shenzhen.aliyuncs.com/" + this.info.bank_positive
        }
      ];
    }
    if (this.info.bank_opposite) {
      this.imgBack = [
        {
          url: "http://tmwl.oss-cn-shenzhen.aliyuncs.com/" + this.info.bank_opposite
        }
      ];
    }
  },
  computed: {
    info: {
      get() {
        return store.state.info;
      },
      set(value) {
        store.commit("INFO", {
          info: value
        });
      }
    }
  },
  methods: {
    afterReadFront(file) {
      // 此时可以自行将文件上传至服务器,正面
      console.log(file);
      upload(file.content).then(res => {
        this.info.bank_positive = res.data.path;
        this.imgFront[0] = {
          url: file.content,
          isImage: true
        };
      });
    },
    afterReadBack(file) {
      // 此时可以自行将文件上传至服务器，反面
      upload(file.content).then(res => {
        this.info.bank_opposite = res.data.path;
        this.imgBack[0] = {
          url: file.content,
          isImage: true
        };
      });
    },
    deleteFront() {
      this.info.bank_positive = "";
      return true;
    },
    deleteBack() {
      this.info.bank_opposite = "";
      return true;
    },
    // 提交
    submit() {
      let type = this.$route.query.type;
      let info = this.info;
      let identity_validity_card = info.identity_validity_card
      if(info.identity_validity_card == '长期有效'){
        identity_validity_card = 0
      }
      let data = {
        id: type == "edit" ? info.id : undefined,
        party_id: info.party_id,
        identity_card_positive: info.identity_card_positive,
        identity_card_opposite: info.identity_card_opposite,
        identity_hand_card: info.identity_hand_card,
        identity_name: info.identity_name,
        identity_card: info.identity_card,
        identity_validity_card,
        bank_positive: info.bank_positive,
        bank_opposite: info.bank_opposite,
        bank_account_name: info.bank_account_name,
        bank_card_number: info.bank_card_number,
        bank_name: info.bank_name,
        bank_branch: info.bank_branch
      };
      let validate = Validate(data);
      if (!validate) {
        if (type == "edit") {
          editInfo(data).then(res => {
            if (res.code == 200) {
              Toast.success(res.message);
              this.$router.push('/')
            } else {
              Toast.fail(res.message);
            }
          });
        } else if (type == "add") {
          addInfo(data).then(res => {
            if (res.code == 200) {
              Toast.success(res.message);
              this.$router.push('/')
            } else {
              Toast.fail(res.message);
            }
          });
        }
      } else {
        Toast.fail(validate);
      }
    },
    // 返回
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="sass" scoped>
    @import './index'
</style>
