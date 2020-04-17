"use strict"
const merge = require("webpack-merge")
const devEnv = require("./dev.env")

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  BASE_DOMAIN: '"http://test.api.supplier.tdianyi.com/"',
  ARTICLE_DOMAIN: '"http://test.api.counsel_terrace.tdianyi.com/"',
  INFORMATION_URL: '"http://test.information_center.tdianyi.com/"',
  SUPPLIER_URL: '"http://test.supplierv2.tdianyi.com/"'
})
