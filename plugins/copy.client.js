import copy from 'copy-to-clipboard'

export default function ({ $notification }, inject) {
  inject('copy', function (content, options = {}) {
    const result = copy(content, options)
    if (result) {
      $notification.success('Sao chép thành công')
    } else {
      $notification.error('Sao chép thất bại')
    }

    return result
  })
}
