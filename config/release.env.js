"use strict"
const merge = require("webpack-merge")
const devEnv = require("./dev.env")

module.exports = merge(devEnv, {
  NODE_ENV: '"release"',
  BASE_DOMAIN: '"http://test.api.supplier.tdianyi.com/"',
  // 上传图片
  UPLOAD_API: '"http://test.o2o.tdianyi.com/"',
  DOMAIN: '"http://test.supplier.tdianyi.com"',

  OSS_UPLOAD_URL: '"http://tmwl.oss-cn-shenzhen.aliyuncs.com"',
})
