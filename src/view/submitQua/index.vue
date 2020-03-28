<template>
  <div class="page">
    <van-nav-bar :border="false" title="提交资质" left-arrow @click-left="goBack" />
    <div class="main-box">
      <div class="step-box">
        <div class="step-item">
          <div class="step-num active-background">1</div>
          <div class="step-text active">注册开户</div>
          <img class="step-icon" src="../../assets/right.png" />
        </div>
        <div class="step-item">
          <div class="step-num">2</div>
          <div class="step-text">绑卡激活</div>
          <img class="step-icon" src="../../assets/right.png" />
        </div>
        <div class="step-item">
          <div class="step-num">3</div>
          <div class="step-text">提现确认</div>
        </div>
      </div>

      <div class="id-main">
        <div class="title-syz">上传身份证信息</div>
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
                <img src="/static/img/id-front.png" class="upload-bj" />
                <img src="/static/img/photo.png" class="upload-photo" />
              </div>
              <div class="upload-bottom">身份证正面</div>
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
                <img src="/static/img/id-back.png" class="upload-bj" />
                <img src="/static/img/photo.png" class="upload-photo" />
              </div>
              <div class="upload-bottom">身份证反面</div>
            </div>
          </van-uploader>

          <van-uploader
            :after-read="afterReadHand"
            v-model="imgHand"
            :max-count="1"
            class="upload-main"
            :before-delete="deleteHand"
          >
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
            <input
              type="text"
              v-model="info.identity_name"
              placeholder="请输入用户名"
              class="input"
              @focus="scroll"
            />
          </div>
        </div>
        <div class="input-box">
          <div class="label">身份证号</div>
          <div class="input-area">
            <input
              type="text"
              v-model="info.identity_card"
              placeholder="请输入身份证号"
              class="input"
              @focus="scroll"
            />
          </div>
        </div>
        <div class="input-box">
          <div class="label">有效期</div>
          <div class="date-area" @click="openDate">
            <div
              :class="info.identity_validity_card ? 'date actived' : 'date'"
            >{{ info.identity_validity_card ? info.identity_validity_card : '请选择身份证有效期'}}</div>
            <van-icon name="arrow" class="icon" />
          </div>
        </div>
      </div>

      <div class="bank-main">
        <div class="title-syz">上传银行卡信息</div>
        <div class="upload-box">
          <van-uploader
            :after-read="afterReadBankFront"
            v-model="imgBankFront"
            :max-count="1"
            class="upload-main"
            :before-delete="deleteBankFront"
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
            :after-read="afterReadBankBack"
            v-model="imgBankBack"
            :max-count="1"
            class="upload-main"
            :before-delete="deleteBankBack"
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
              @focus="scroll"
            />
          </div>
        </div>
        <div class="input-box">
          <div class="label">银行卡号</div>
          <div class="input-area">
            <input
              type="text"
              v-model="info.bank_card_number"
              placeholder="请输入银行卡号"
              class="input"
              @focus="scroll"
            />
          </div>
        </div>
        <div class="input-box">
          <div class="label">开户行</div>
          <div class="input-area" @click="show_list = true">
            <div class="input" v-if='info.bank_name'>{{info.bank_name}}</div>
            <div class="input no-choose" v-if='!info.bank_name'>请输入开户行</div>
            <!-- <input
              type="text"
              disabled
              v-model="info.bank_name"
              placeholder="请输入开户行"
              class="input"
              @focus="scroll"
            /> -->
          </div>
        </div>
        <div class="input-box">
          <div class="label">支行</div>
          <div class="input-area">
            <input
              type="text"
              v-model="info.bank_branch"
              placeholder="请输入支行"
              class="input"
              @focus="scroll"
            />
          </div>
        </div>
      </div>
    </div>

    <van-popup
      position="bottom"
      :close-on-click-overlay="false"
      v-model="show"
      get-container="#app"
      class="date-picker"
    >
      <div class="title">
        请选择身份证有效期
        <van-icon name="cross" class="cancel" size=".3rem" @click="closeDate" />
      </div>
      <div class="date-tab">
        <div :class="long_date != 1 ? 'date-item actived' : 'date-item'">{{date || '年/月/日'}}</div>
      </div>
      <div :class="long_date == 1 ? 'long-date actived' : 'long-date'" @click="longDate">长期有效</div>
      <van-datetime-picker
        v-model="currentDate"
        :show-toolbar="false"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
      />
      <div class="date-confirm" @click="confirmDate">确定</div>
    </van-popup>

    <van-popup v-model="show_list" position="bottom" :style="{ height: '36%' }">
      <van-picker
        show-toolbar
        title="选择银行"
        :columns="bank_list"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>

    <div class="sub-botton-box">
      <div class="botton" @click="submit">注册</div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import upload from "../../api/oss";
import store from "@/store/index";
import { viewInfo } from "@/api/api";
import Axios from "axios";
import { Toast } from "vant";
import { authUser } from "@api/api";
import { createInfo, editInfo, getBankList } from "./service";
import Validate from "./validate";
export default {
  data() {
    return {
      show: false,
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2099, 10, 1),
      currentDate: new Date(),
      date: "",
      long_date: 0,
      imgFront: [],
      imgBack: [],
      imgHand: [],
      name: "",
      number: "",
      bank_name: "",
      bank_address: "",
      imgBankBack: [],
      imgBankFront: [],
      bank_front: "",
      bank_back: "",
      bank_list: [],
      show_list: false
    };
  },
  watch: {
    currentDate(val) {
      this.date = dayjs(val).format("YYYY-MM-DD");
      this.long_date = 0;
    }
  },
  computed: {
    info: {
      get() {
        if (store.state.info.tip) {
          this.tip = store.state.info.tip;
        }
        if (store.state.info.identity_card_positive) {
          this.imgFront = [
            {
              url:
                "http://tmwl.oss-cn-shenzhen.aliyuncs.com/" +
                store.state.info.identity_card_positive
            }
          ];
        }
        if (store.state.info.identity_card_opposite) {
          this.imgBack = [
            {
              url:
                "http://tmwl.oss-cn-shenzhen.aliyuncs.com/" +
                store.state.info.identity_card_opposite
            }
          ];
        }
        if (store.state.info.identity_hand_card) {
          this.imgHand = [
            {
              url:
                "http://tmwl.oss-cn-shenzhen.aliyuncs.com/" +
                store.state.info.identity_hand_card
            }
          ];
        }
        if (store.state.info.bank_positive) {
          this.imgBankFront = [
            {
              url:
                "http://tmwl.oss-cn-shenzhen.aliyuncs.com/" +
                store.state.info.bank_positive
            }
          ];
        }
        if (store.state.info.bank_opposite) {
          this.imgBankBack = [
            {
              url:
                "http://tmwl.oss-cn-shenzhen.aliyuncs.com/" +
                store.state.info.bank_opposite
            }
          ];
        }
        return store.state.info;
      },
      set(value) {
        store.commit("INFO", {
          info: value
        });
      }
    }
  },
  async created() {
    this.ossData();
    if (this.$route.query.type) {
      await store.dispatch("getInfo");
    }
    getBankList().then(res => {
      let bank_list = [];
      let list = res.data
      for (let i = 0; i < list.length; i ++){
        bank_list.push(list[i].bank_name)
      }
      this.bank_list = bank_list;
    });
  },

  methods: {
     onConfirm(value, index) {
      this.info.bank_name = value
      this.show_list = false
    },
    onCancel() {
      this.show_list = false
    },
    // 键盘事件兼容
    scroll() {},
    // 下一步
    goTo() {
      console.log(this.info);
    },
    // oss参数
    async ossData() {
      if (!localStorage.getItem("oss_data")) {
        /**获取oss */
        console.log(4444);
        let res = await Axios.get(
          "http://release.api.supplier.tdianyi.com/api/v2/up"
        );
        let { data } = res.data;
        let oss_data = {
          policy: data.policy,
          OSSAccessKeyId: data.accessid,
          success_action_status: 200, //让服务端返回200,不然，默认会返回204
          signature: data.signature,
          callback: data.callback,
          host: data.host,
          key: data.dir
        };

        window.localStorage.setItem("oss_data", JSON.stringify(oss_data));
      }
    },
    afterReadFront(file) {
      // 此时可以自行将文件上传至服务器,正面照
      upload(file.content).then(res => {
        this.info.identity_card_positive = res.data.path;
        this.imgFront[0] = {
          url: file.content,
          isImage: true
        };
      });
    },
    afterReadBack(file) {
      // 此时可以自行将文件上传至服务器，反面照
      upload(file.content).then(res => {
        this.info.identity_card_opposite = res.data.path;
        this.imgBack[0] = {
          url: file.content,
          isImage: true
        };
      });
    },
    afterReadHand(file) {
      // 此时可以自行将文件上传至服务器，手持照
      upload(file.content).then(res => {
        this.info.identity_hand_card = res.data.path;
        this.imgHand[0] = {
          url: file.content,
          isImage: true
        };
      });
    },
    // 选择长期有效
    longDate() {
      this.long_date = 1;
      if (this.long_date == 1) {
        this.date = "长期有效";
      }
    },
    // 关闭时间筛选
    closeDate() {
      this.show = false;
      this.long_date = 0;
      this.date = "";
    },
    //  打开时间筛选
    openDate() {
      this.show = true;
    },
    //  时间筛选确定
    confirmDate() {
      this.show = false;
      this.info.identity_validity_card = this.date;
    },
    // 删除图片
    deleteFront() {
      this.info.identity_card_positive = "";
      return true;
    },
    deleteBack() {
      this.info.identity_card_opposite = "";
      return true;
    },
    deleteHand() {
      this.info.identity_hand_card = "";
      return true;
    },

    afterReadBankFront(file) {
      // 此时可以自行将文件上传至服务器,正面
      console.log(file);
      upload(file.content).then(res => {
        this.info.bank_positive = res.data.path;
        this.imgBankFront[0] = {
          url: file.content,
          isImage: true
        };
      });
    },
    afterReadBankBack(file) {
      // 此时可以自行将文件上传至服务器，反面
      upload(file.content).then(res => {
        this.info.bank_opposite = res.data.path;
        this.imgBankBack[0] = {
          url: file.content,
          isImage: true
        };
      });
    },
    deleteBankFront() {
      this.info.bank_positive = "";
      return true;
    },
    deleteBankBack() {
      this.info.bank_opposite = "";
      return true;
    },
    // 返回
    goBack() {
      this.$router.go(-1);
    },
    // 提交
    submit() {
      let info = this.info;
      let identity_validity_card = info.identity_validity_card;
      if (info.identity_validity_card == "长期有效") {
        identity_validity_card = 0;
      }

      let data = {
        id: this.$route.query.type ? info.id : undefined,
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

      if (this.$route.query.type) {
        editInfo(data).then(res => {
          if (res.code == 200) {
            Toast.success(res.message);
            this.$router.push({ path: "/submitQua/result" });
          } else {
            Toast.fail(res.message);
          }
        });
      } else {
        createInfo(data).then(res => {
          if (res.code == 200) {
            Toast.success(res.message);
            this.$router.push({ path: "/submitQua/result" });
          } else {
            Toast.fail(res.message);
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
