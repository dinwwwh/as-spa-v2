export default function ({ store, redirect }) {
  store.getters['auth/isAuthenticated'] || redirect({ name: 'login' })
}
