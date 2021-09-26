import formatNumber from 'format-number'

export default function (context, inject) {
  inject('number', {
    format,
  })

  function format(number, option = {}) {
    return formatNumber()(number, option)
  }
}
