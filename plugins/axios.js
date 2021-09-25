export default function ({ $axios, redirect, error, $typeCheck, $notification }, inject) {
  $axios.setHeader('Accept', 'application/json');

  inject('formData', formData);

  $axios.onError(({ response }) => {
    if (response === undefined) return;

    if (response.status === 400) {
      $notification.error('Thông tin cung cấp không chính xác.')
      return;
    }

    if (response.status === 401) {
      $notification.error('Bạn cần phải đăng nhập.')
      return;
    }

    if (response.status === 419) {
      $axios.$get('../sanctum/csrf-cookie')
      $notification.info('Vui lòng thử lại sau.')
      return;
    }

    if (response.status === 422) {
      $notification.error('Vui lòng kiểm tra lại thông tin vừa nhập.')
    }
  });

  function formData(data, formData = new FormData(), initKey = null) {
    // Case: data is an object or list
    if ($typeCheck('Object|Array|FileList', data)) {
      Object.keys(data).forEach((key) => {
        if (initKey) {
          formData = formData(data[key], formData, `${initKey}[${key}]`);
        } else {
          formData = formData(data[key], formData, key);
        }
      });
    }

    // Case: data is Boolean type
    else if ($typeCheck('Boolean', data)) {
      formData.append(initKey, data ? 1 : 0);
    }

    // Case: data is NULL
    else if ($typeCheck('Null', data)) {
      formData.append(initKey, '');
    }

    // Case: data isn't undefined
    else if (!$typeCheck('Undefined', data)) {
      formData.append(initKey, data);
    }

    return formData;
  }
}
