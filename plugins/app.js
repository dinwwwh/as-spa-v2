const rechargedCard = {
  getStatus({ realFaceValue, faceValue, receivedValue, approverId }) {
    if (approverId === null)
      return {
        name: 'chờ duyệt',
        classes: 'bg-blue-100 text-blue-600',
      }

    if (approverId && receivedValue === null)
      return {
        name: 'đang duyệt',
        classes: 'bg-yellow-100 text-yellow-600',
      }

    if (approverId && realFaceValue !== null && receivedValue !== null) {
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

const validation = {
  getValidationableLink(validation) {
    if (validation.validationableType === 'App\\Models\\Account') {
      return {
        name: 'tài khoản',
        route: {
          name: 'accounts-id',
          params: {
            id: validation.validationableId,
          },
        },
      }
    }

    return undefined
  },
  getStatusMeaning(validation) {
    if (validation.isApproving)
      return {
        name: 'đang phê duyệt',
        color: 'yellow',
        classes: 'bg-yellow-100 text-yellow-600',
      }

    if (validation.isError)
      return {
        name: 'thất bại',
        color: 'red',
        classes: 'bg-red-100 text-red-600',
      }

    if (validation.approverId)
      return {
        name: 'thành công',
        color: 'green',
        classes: 'bg-green-100 text-green-600',
      }

    return {
      name: 'đang chờ',
      color: 'blue',
      classes: 'bg-blue-100 text-blue-600',
    }
  },
}

export default async function ({ $axios, store, $dayjs }, inject) {
  process.server && (await initApp())

const account = {
  CHECKING_STATUS: 1,
  SELLING_STATUS: 2,
  BOUGHT_STATUS: 3,
  ERROR_STATUS: 4,
  getStatusMeaning({ status, confirmedAt }) {
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
        if(confirmedAt === null)
        return {
          name: 'đang phê duyệt',
          classes: 'bg-red-100 text-red-600',
          color: 'red',
        }
        else if ($dayjs().isBefore(confirmedAt))
        return {
          name: 'đang bán',
          classes: 'bg-blue-100 text-blue-600',
          color: 'blue',
        }
        return {
          name: 'đã bán',
          classes: 'bg-green-100 text-green-600',
          color: 'green',
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

  inject('app', {
    refresh: initApp,
    findConfig,
    rechargedCard,
    tag,
    account,
    validatorable,
    validation,
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
