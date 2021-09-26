export default function ({ store, error }) {
  !store.getters['auth/isAuthenticated'] || error(404)
}
