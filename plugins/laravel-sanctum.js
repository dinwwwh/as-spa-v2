export default async function ({ $axios, $config }, inject) {
  process.server && (await initCsrf())

  inject('csrf', {
    fresh: initCsrf,
  })

  async function initCsrf() {
    await $axios.$get(
      $config.axios.baseURL.replace('/api/', '/') + 'sanctum/csrf-cookie'
    )
  }
}
