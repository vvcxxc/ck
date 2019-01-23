import axios from "axios"
import qs from "qs"

import store from "@/store/index"
import router from "@/router/index"
import { querystring } from 'vux'

const config = {
  baseURL: process.env.BASE_DOMAIN,
  timeout: 5000,
  headers: {
    Accept: "application/json"
  }
}

const instance = axios.create(config),
  SERVER_ON_RESPONSE = 0,
  UNKNOW_ERROR = -1,
  REQUEST_OK = 200,
  REQUEST_BAD = 400,
  NOT_SIGN = 401,
  NOT_FIND = 404,
  SERVER_ERROR = 500,
  TOAST_DURATION = 1500

instance.interceptors.request.use(
  config => {
    // 请求前
    const token = localStorage.token

    token && (config.headers["Authorization"] = token)

    if (config.method.toLocaleLowerCase() == "post") {
      config.data = qs.stringify(config.data)
    }

    return config
  }, // 请求出错
  err => {
    Promise.error(err)
  }
)

instance.interceptors.response.use(
  response => {
    if (response.data && response.data.data && response.data.data.token) {
      document.cookie = `token=${response.data.data.token};domain=tdianyi.com;path=/`
    }
    if (response.data && response.data.data && response.data.data.sup_token) {
      document.cookie = `sup_token=${response.data.data.token};domain=tdianyi.com;path=/`
    }
    
    // 响应成功
    if (response.status == REQUEST_OK) {
      return response.data
    } else {
      return Promise.reject(response)
    }
  },
  err => {
    // 响应错误
    let { request, response } = err,
      errorResponse = {}

    if (response) {
      let { status, data } = response

      switch (status) {
        case NOT_SIGN:
          localStorage.removeItem("token")
          store.commit("TOAST", {
            text: "未登录"
          })

          // return router.replace({
          //     path: "/login",
          //     query: {
          //       redirect: router.currentRoute.fullPath // 跳转登录页面, 并将要浏览的页面fullPath传过去, 登录成功后跳转需要访问的页面
          //     }
          //   })

        case NOT_FIND:
          return store.commit("TOAST", {
            text: "不存在的页面",
            status: true
          })
        case SERVER_ERROR:
          return store.commit("TOAST", {
            text: "服务器出错",
            status: true
          })
        default:
          return store.commit("TOAST", {
            text: data.message || "unknown error",
            status: true
          })
      }
    } else if (request) {
      let errmsg = "the server no response"

      store.commit("TOAST", {
        text: errmsg,
        status: true
      })

      errorResponse = {
        message: errmsg,
        status: SERVER_ON_RESPONSE,
        data: []
      }
    } else {
      let errmsg = "unknow error"
      store.commit("TOAST", {
        text: errmsg,
        status: true
      })

      errorResponse = {
        message: errmsg,
        status: UNKNOW_ERROR,
        data: []
      }
    }
    return Promise.reject({ response: response || errorResponse })
  }
)

/**
 * 简易axios (上传图片不再做处理)
 */

export const http = options => {
  let {
      url = process.env.WX_PAY,
      method = "GET",
      params = {},
      data = {},
      extra = {}
    } = options,
    queryParams = method.toLocaleLowerCase() == "get" ? { params } : { data }
  return axios({
    url,
    method,
    ...queryParams,
    ...extra
  })
}

export default instance
