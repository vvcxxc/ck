import axios from "axios"
import qs from "qs"

import { timeout } from "~utils/common"

import store from "@/store/index"
import router from "@/router/index"
import Vue from "vue"

const instance = axios.create({
  baseURL: process.env.BASE_DOMAIN,
  headers: {
    // 'Content-Type': 'application/json'
  },
  timeout: 5000,
  responseType: "json"
})

instance.interceptors.request.use(
  request => {
    store.commit("LOADING", {
      status: true
    })

    if (!request.url.match(/\/login/) && store.state.token) {
      request.headers["Authorization"] = store.state.token
    }

    // post 请求
    if (request.method.toLocaleLowerCase() == "post") {
      request.data = qs.stringify(request.data)
    }

    return request
  },
  err => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  response => {
    let data

    store.commit("LOADING", {
      status: false
    })

    if (response.data == undefined) {
      data = response.request.response
    } else {
      data = response.data
    }

    return data
  },
  err => {
    // console.log(err)
    store.commit("LOADING", {
      status: false
    })

    let response = err.response

    if (response) {
      let { data, status } = response
      let message = data.message
      switch (status) {
        case 400:
          // store.commit('TIPS', {
          //   status: true,
          //   txt: message
          // })
          Vue.$vux.toast.text(message || "error")
          break

        case 401:
          Vue.$vux.toast.text(message || "error")
          timeout(1000).then(() => {
            router.push("/login")
          })
          break

        case 500:
          Vue.$vux.toast.text("系统异常")
          // 刷新了
          break
      }
    }

    return Promise.reject(err)
  }
)

export default instance
