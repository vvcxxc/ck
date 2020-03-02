<template>
  <div class="page">
    <van-nav-bar :border="false" title="提交资质" left-arrow @click-left="goBack"/>
    <div class="main">
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
          <input type="text" v-model="info.name" placeholder="请输入用户名" class="input" />
        </div>
      </div>
      <div class="input-box">
        <div class="label">身份证号</div>
        <div class="input-area">
          <input type="text" v-model="info.identity_card" placeholder="请输入身份证号" class="input" />
        </div>
      </div>
      <div class="input-box">
        <div class="label">有效期</div>
        <div class="date-area" @click="openDate">
          <div
            :class="info.validity_card ? 'date actived' : 'date'"
          >{{ info.validity_card ? info.validity_card : '请选择身份证有效期'}}</div>
          <van-icon name="arrow" class="icon" />
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
        <div
          :class="long_date != 1 ? 'date-item actived' : 'date-item'"
        >{{date || '年/月/日'}}</div>
      </div>
      <div
        :class="long_date == 1 ? 'long-date actived' : 'long-date'"
        @click="longDate"
      >长期有效</div>
      <van-datetime-picker
        v-model="currentDate"
        :show-toolbar="false"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
      />
      <div class="date-confirm" @click="confirmDate">确定</div>
    </van-popup>

    <div class="botton-box">
      <div class="botton" @click="goTo">下一步</div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import upload from "../../../api/oss";
import store from "@/store/index";
import { viewInfo } from "@/api/api";
export default {
  data() {
    return {
      show: false,
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2035, 10, 1),
      currentDate: new Date(),
      date: '',
      long_date: 0,
      imgFront: [],
      imgBack: [],
      imgHand: []
    };
  },
  watch: {
    currentDate(val) {
      this.date = dayjs(val).format('YYYY-MM-DD')
      this.long_date = 0
    },
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
  created() {
    let type = this.$route.query.type;
    let party_id = this.$route.query.party_id;
    if (type != "add") {
      store.dispatch("getInfo");
    }else{
      store.commit("INFO", {
          ...this.info,
          party_id
        });
    }
  },
  mounted() {
    if (this.info.identity_card_positive) {
      this.imgFront = [
        {
          url:
            "http://tmwl.oss-cn-shenzhen.aliyuncs.com/" +
            this.info.identity_card_positive
        }
      ];
    }
    if (this.info.identity_card_opposite) {
      this.imgBack = [
        {
          url:
            "http://tmwl.oss-cn-shenzhen.aliyuncs.com/" +
            this.info.identity_card_opposite
        }
      ];
    }
    if (this.info.hand_identity_card) {
      this.imgHand = [
        {
          url:
            "http://tmwl.oss-cn-shenzhen.aliyuncs.com/" +
            this.info.hand_identity_card
        }
      ];
    }
  },
  methods: {
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
    // 下一步
    goTo() {
      let type = this.$route.query.type;
      this.$router.push({path:"/completeInformation/bankCard", query: {type}});
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
        this.info.hand_identity_card = res.data.path;
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
      this.date = ''
    },
    //  打开时间筛选
    openDate() {
      this.show = true;
    },
    //  时间筛选确定
    confirmDate() {
      this.show = false;
      this.info.validity_card = this.date
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
      this.info.hand_identity_card = "";
      return true;
    },
     // 返回
    goBack (){
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
