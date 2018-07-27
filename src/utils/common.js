export var ls = {
  // 以键值对形式传入
  set: function(key, val) {
    if (window.localStorage) {
      window.localStorage.setItem(key, val)
    } else {
      alert("浏览器不支持.")
    }
  },
  get: function(key) {
    return window.localStorage.getItem(key)
  },
  remove: function(key) {
    return window.localStorage.removeItem(key)
    // localStorage.clear() => 清除所有的localStorage
  },
  // 以对象形式传入
  setObj: function(key, val) {
    // console.log(6)
    typeof val == "object" &&
      window.localStorage.setItem(key, JSON.stringify(val))
  },
  getObj: function(key) {
    return JSON.parse(window.localStorage.getItem(key))
  }
}

export var ss = {
  get: key => {
    return sesstionStorage.getItem(key)
  },
  set: (key, val) => {
    sesstionStorage.setItem(key, val)
  },
  remove: key => {
    sesstionStorage.removeItem(key)
  }
}

let Validator = function() {
  this.cache = []

  this.rules = {
    isEmpty: function(val, error) {
      if (val.trim() == "") {
        return error
      }
    },
    isLessLength: function(val, error, len) {
      if (val.trim().length < len) {
        return error
      }
    },
    isErrorFormat: function(val, error) {
      if (!/^1[34678]\d{9}$/.test(val)) {
        return error
      }
    }
  }
}

Validator.prototype.add = function(val, rule, err) {
  var _arg = rule.split(":"),
    _self = this

  this.cache.push(function() {
    var _rule = _arg.shift()

    _arg.unshift(err)
    _arg.unshift(val)

    return _self.rules[_rule].apply(null, _arg)
  })
}

Validator.prototype.start = function() {
  for (var i = 0, validator; (validator = this.cache[i++]); ) {
    var _msg = validator()
    if (_msg) return _msg
  }
}

export var valitation = function(opt) {
  var _validator = new Validator()

  opt.forEach(function(item, index) {
    _validator.add(item.val, item.rule, item.err)
  })

  return _validator.start()
}

export let timeout = ms =>
  new Promise(resolve => setTimeout(resolve, ms, "done"))

export let getAreasInfo = areas => {
  let areasId = []
  let areasName = areas.map((area, index) => {
    areasId.push(area["id"])
    return area["name"]
  })

  return {
    areasId,
    areasName
  }
}

// 加载模块
export let getComponent = path => {
  return r => require(["~pages/" + path], r)
}

export class Validator_a {
  constructor() {
    this.cache = []
    this.strategies = {
      isEmpty(val, errmsg) {
        if (!val.trim()) return errmsg
      },
      isMobileError(val, errmsg) {
        if (!/^1[34678]\d{9}$/.test(val)) return errmsg
      },
      isLengthError(val, len, errmsg) {
        if (val.length < len) return errmsg
      },
      isRepeat(val, params, errmsg) {
        console.log(val, params)
        if (val != params) return errmsg
      }
    }
  }

  add(val, rules) {
    for (let i = 0, item; (item = rules[i++]); ) {
      let { validateRule, params, errmsg } = item

      let args = params || params == "" ? [val, params, errmsg] : [val, errmsg]

      this.cache.push(() => this.strategies[validateRule].apply(null, args))
    }
  }

  start() {
    let result
    for (let i = 0; i < this.cache.length; i++) {
      result = this.cache[i]()
      if (result) return result
    }
  }
}

/**
 * 字段替换
 */
export function fieldReplace(field) {
  let origins = {
    display: "展示",
    onclick: "点击"
  }

  return field in origins ? origins[field] : ""
}
