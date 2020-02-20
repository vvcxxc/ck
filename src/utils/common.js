/**
 * 延迟
 */
export let timeout = ms =>
  new Promise(resolve => setTimeout(resolve, ms, "done"))

/**
 * 表单校验
 */

export class Validator {
  constructor() {
    this.cache = []
    this.strategies = {
      isEmpty(val, errmsg) {
        if (!val.trim()) return errmsg
      },
      isMoney(val, errmsg) {
        if (+val == 0 || isNaN(+val)) return errmsg
      },
      isGreatThen(val, target, errmsg) {
        if (+val < +target) return errmsg
      },
      isMobileError(val, errmsg) {
        if (!/^1[34678]\d{9}$/.test(val)) return errmsg
      },
      isLengthError(val, len, errmsg) {
        if (val.length < len) return errmsg
      },
      isLike(newVal, originVal, errmsg) {
        if (newVal === originVal) return errmsg
      },
      isUnLike(newVal, originVal, errmsg) {
        if (newVal !== originVal) return errmsg
      },
      isLetterBegin(val, errmsg) {
        if (!/^[a-z]{1}/.test(val)) return errmsg
      },
      isRepeat(val, params, errmsg) {
        if (val != params) return errmsg
      },
    }
  }

  add(val, rules) {
    for (let i = 0, item; (item = rules[i++]); ) {
      let { validateRule, params, errmsg } = item

      let args = params || params == 0 ? [val, params, errmsg] : [val, errmsg]
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
