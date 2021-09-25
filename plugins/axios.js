export default function (
  { $axios, redirect, error, $checkType, $notification },
  inject
) {
  $axios.setHeader('Accept', 'application/json')

  inject('formData', formData)

  $axios.onError(({ response }) => {
    if (response === undefined) return

    if (response.status === 400) {
      $notification.error(
        'Thông tin cung cấp không chính xác, hoặc hành động bị từ chối.'
      )
      return response
    }

    if (response.status === 401) {
      $notification.error('Hành động yêu cầu phải đăng nhập.')
      return response
    }

    if (response.status === 403) {
      $notification.error('Bạn không đủ quyền để thực hiện chức năng này.')
      return response
    }

    if (response.status === 419) {
      $axios.$get('../sanctum/csrf-cookie')
      $notification.info('Vui lòng thử lại sau.')
      return response
    }

    if (response.status === 422) {
      $notification.error('Thông tin cung cấp không hợp lệ.')
      return response
    }
  })

  function formData(data, formData = new FormData(), initKey = null) {
    // Case: data is an object or list
    if ($checkType('Object|Array|FileList', data)) {
      Object.keys(data).forEach((key) => {
        if (initKey) {
          formData = formData(data[key], formData, `${initKey}[${key}]`)
        } else {
          formData = formData(data[key], formData, key)
        }
      })
    }

    // Case: data is Boolean type
    else if ($checkType('Boolean', data)) {
      formData.append(initKey, data ? 1 : 0)
    }

    // Case: data is NULL
    else if ($checkType('Null', data)) {
      formData.append(initKey, '')
    }

    // Case: data isn't undefined
    else if (!$checkType('Undefined', data)) {
      formData.append(initKey, data)
    }

    return formData
  }
}
