"use strict"
const merge = require("webpack-merge")
const prodEnv = require("./prod.env")

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_DOMAIN: '"http://test.api.tdianyi.com/"',
  
  SUPPLIER_URL: '"http://test.supplier.tdianyi.com"',
})
