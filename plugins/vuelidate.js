import Vue from 'vue'
import Vuelidate from 'vuelidate'
import {
  required,
  requiredIf,
  minLength,
  maxLength,
  minValue,
  maxValue,
  between,
  alpha,
  alphaNum,
  numeric,
  integer,
  decimal,
  email,
  ipAddress,
  macAddress,
  sameAs,
  url,
  helpers,
} from 'vuelidate/lib/validators'
Vue.use(Vuelidate)

const rules = {
  required,
  requiredIf,
  minLength,
  maxLength,
  minValue,
  maxValue,
  between,
  alpha,
  alphaNum,
  numeric,
  integer,
  decimal,
  email,
  ipAddress,
  macAddress,
  sameAs,
  url,
  in(values) {
    return (val) => !helpers.req(val) || values.includes(val)
  },
  equal(value) {
    return (val) => !helpers.req(val) || value === val
  },
  gte(value) {
    return (val) => {
      if (!value) return true
      return !helpers.req(val) || value <= val
    }
  },
  lte(value) {
    return (val) => {
      if (!value) return true
      return !helpers.req(val) || value >= val
    }
  },
  json(value) {
    if (!helpers.req(value)) return true

    try {
      JSON.parse(value)
      return true
    } catch (error) {
      return false
    }
  },
  unique(callback) {
    return async (value) => {
      if (value === '') return true
      return await callback(value)
    }
  },
}
const messages = {
  required: ':name là bắt buộc.',
  minLength: ':name quá ngắn, vui lòng bổ sung thêm.',
  maxLength: ':name quá dài, vui lòng rút ngắn lại.',
  minValue: ':name giá trị quá nhỏ, vui lòng tăng thêm.',
  maxValue: ':name giá trị quá lớn, vui lòng giảm xuống.',
  between: ':name có giá trị không hợp lệ',
  alpha: ':name phải là chữ cái, vui lòng loại bỏ các ký tự không hợp lệ.',
  alphaNum:
    ':name phải là chữ cái hoặc số, vui lòng loại bỏ các ký tự không hợp lệ.',
  numeric: ':name phải là số.',
  integer: ':name phải là số nguyên dương.',
  decimal: ':name có giá trị không hợp lệ',
  email: ':name phải là một email hợp lệ.',
  sameAs: ':name có giá trị xác nhận không chính xác.',
  ipAddress: ':name phải là một địa chỉ IP hợp lệ.',
  macAddress: ':name phải là một đại chỉ MAC hợp lệ.',
  url: ':name phải là một địa chỉ URL hợp lệ.',
  in: ':name có giá trị không hợp lệ',
  equal: ':name có giá trị không hợp lệ',
  gte: ':name giá trị phải lớn hơn',
  lte: ':name giá trị phải nhỏ hơn',
  json: ':name phải tuân theo cú pháp JSON',
  unique: ':name đã được sử dụng trên hệ thống',
}

export default function (context, inject) {
  inject('vuelidate', {
    message: getValidatorErrorMessage,
    rules,
  })
}

function getValidatorErrorMessage(validator, name = 'trường này') {
  if (!validator.$error) return null

  let errorMessage

  Object.keys(rules).some((field) => {
    if (validator[field] === false) {
      errorMessage = messages[field]?.replaceAll(':name', name)
      errorMessage =
        errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
      return true
    }

    return false
  })

  return errorMessage || 'Trường này không hợp lệ.'
}
