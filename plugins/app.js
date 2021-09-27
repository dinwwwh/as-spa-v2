export default async function ({ $axios, store }, inject) {
  process.server && (await initApp())

  inject('app', {
    refresh: initApp,
    findConfig,
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
