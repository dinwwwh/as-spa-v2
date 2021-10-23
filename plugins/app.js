const rechargedCard = {
  getStatus({ realFaceValue, faceValue, receivedValue, approverId }) {
    if (!approverId && !realFaceValue && !receivedValue)
      return {
        name: 'chờ duyệt',
        classes: 'bg-blue-100 text-blue-600',
      }

    if (approverId && !realFaceValue && !receivedValue)
      return {
        name: 'đang duyệt',
        classes: 'bg-yellow-100 text-yellow-600',
      }

    if (approverId && realFaceValue && receivedValue) {
      if (realFaceValue !== faceValue) {
        return {
          name: 'sai mệnh giá',
          classes: 'bg-pink-100 text-pink-600',
        }
      } else if (receivedValue === 0) {
        return {
          name: 'thất bại',
          classes: 'bg-red-100 text-red-600',
        }
      } else {
        return {
          name: 'thành công',
          classes: 'bg-green-100 text-green-600',
        }
      }
    }

    return {
      name: 'error error',
      classes: 'bg-gray-100 text-gray-600',
    }
  },
}

const account = {
  CHECKING_STATUS: 1,
  SELLING_STATUS: 2,
  BOUGHT_STATUS: 3,
  ERROR_STATUS: 4,
  getStatusMeaning({ status }) {
    switch (status) {
      case this.CHECKING_STATUS:
        return {
          name: 'đang kiểm tra',
          classes: 'bg-yellow-100 text-yellow-600',
          color: 'yellow',
        }
      case this.SELLING_STATUS:
        return {
          name: 'đang bán',
          classes: 'bg-green-100 text-green-600',
          color: 'green',
        }
      case this.BOUGHT_STATUS:
        return {
          name: 'đã bán',
          classes: 'bg-blue-100 text-blue-600',
          color: 'blue',
        }
      case this.ERROR_STATUS:
        return {
          name: 'sai thông tin',
          classes: 'bg-red-100 text-red-600',
          color: 'red',
        }
      default:
        return {
          name: 'không xác định',
          classes: 'bg-gray-100 text-gray-600',
          color: 'gray',
        }
    }
  },
}

const tag = {
  getColor({ type }) {
    if (type === null) return 'gray'
    if (type === 1) return 'indigo'
  },
}

const validatorable = {
  OTHER_TYPE: null,
  CREATED_TYPE: 1,
  UPDATED_TYPE: 2,
  BOUGHT_TYPE: 3,
  DAILY_TYPE: 4,
  WEEKLY_TYPE: 5,
  MONTHLY_TYPE: 6,
}

export default async function ({ $axios, store }, inject) {
  process.server && (await initApp())

  inject('app', {
    refresh: initApp,
    findConfig,
    rechargedCard,
    tag,
    account,
    validatorable,
  })

  async function initApp() {
    await initSettings()
  }

  async function initSettings() {
    const { data: settings } = await $axios.$get('settings/public', {
      params: {
        _sensitive: true,
      },
    })
    store.commit('app/settings', settings)
  }

  function findConfig(key, full = false) {
    const setting = store.state.app.settings.find(
      (setting) => setting.key === key
    )
    return full ? setting : setting?.value
  }
}
