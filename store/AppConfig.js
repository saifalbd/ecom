const state = () => ({
  config: {}
})

const mutations = {
  ADD_CONFIG (state, payload) {
    console.log(payload)
    state.config = payload
  }
}

const actions = {
  async fetch_config ({ commit }, payload) {
    try {
      const url = 'https://redcom.cloud/assets-media/1/content/confignew.json'
      const res = await this.$axios.get(url)
      commit('ADD_CONFIG', res)
      console.log(res)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
