export const state = () => ({
  profile: undefined,
})

export const getters = {
  isAuthenticated({ profile }) {
    return !!profile
  },
}

export const actions = {}

export const mutations = {
  profile(state, profile) {
    state.profile = profile
  },
}
