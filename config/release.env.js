"use strict"
const merge = require("webpack-merge")
const devEnv = require("./dev.env")

module.exports = merge(devEnv, {
  NODE_ENV: '"release"',
  BASE_DOMAIN: '"http://release.supplier.tdianyi.com/"',
  // 上传图片
  UPLOAD_API: '"http://o2o.tdianyi.com/"',
  DOMAIN: '"http://ck.tdianyi.com"',

  OSS_UPLOAD_URL: '"http://tmwl.oss-cn-shenzhen.aliyuncs.com"',

  SUPPLIER_URL: '"http://supplier.tdianyi.com"',

})
