"use strict"
const merge = require("webpack-merge")
const prodEnv = require("./prod.env")

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_DOMAIN: '"http://test.api.supplier.tdianyi.com/"',

  SUPPLIER_URL: '"http://192.168.2.108:8080"'
})
