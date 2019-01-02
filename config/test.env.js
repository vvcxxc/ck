"use strict"
const merge = require("webpack-merge")
const devEnv = require("./dev.env")

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  BASE_DOMAIN: '"http://test.api.supplier.tdianyi.com/"'

  SUPPLIER_URL: '"http://test.supplier.tdianyi.com"',
})
