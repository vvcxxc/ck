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
        if (!/^1[346789]\d{9}$/.test(val)) return errmsg
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
    //  身份证号验证
      isIDNumber(val, errmsg) {
        if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(val)) return errmsg
      },
    //  银行卡号校验
      isBankNumber(val, errmsg) {
        if(!(/^\d{16,19}$/).test(val)) return errmsg
      },
    //  汉字校验（例如姓名）
      isChinese (val, errmsg) {
        if(!(/^[\u4E00-\u9FA5]{1,}$/.test(val))) return errmsg
      },
    //  支行校验
      isBankName (val, errmsg) {
        if(!(/^[\u4e00-\u9fa5a-zA-Z0-9]{1,}$/.test(val))) return errmsg
      }
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
