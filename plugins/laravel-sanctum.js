export default function ({ $axios, $config }, inject) {
  process.client && initCsrf()

  inject('csrf', {
    fresh: initCsrf,
  })

  async function initCsrf() {
    await $axios.$get(
      $config.axios.baseURL.replace('/api/', '/') + 'sanctum/csrf-cookie'
    )
  }
}
