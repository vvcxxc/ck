"use strict"
const merge = require("webpack-merge")
const prodEnv = require("./prod.env")

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_DOMAIN: '"http://test.api.supplier.tdianyi.com/"',
  ARTICLE_DOMAIN: '"http://test.api.counsel_terrace.tdianyi.com/"',
  INFORMATION_URL: '"http://test.information_center.tdianyi.com/"',
  // BASE_DOMAIN: '"http://release.api.supplier.tdianyi.com/"',
  // BASE_DOMAIN: '"http://api.supplier.tdianyi.com/"',
  // BASE_DOMAIN: '"http://release.api.supplier.com/"',

  SUPPLIER_URL: '"http://test.supplierv2.tdianyi.com"',
})
