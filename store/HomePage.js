
const state = () => {
  return {
    banners: [],
    offers: [],
    collection: []
  }
}

const mutations = {
  BANNERS (state, payload) {
    state.banners = payload
  },
  OFFERS (state, payload) {
    state.offers = payload
  },
  COLLECTION (state, payload) {
    state.collection = payload
  }
}
const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  },
  add_banners ({ commit }, payload) {
    commit('BANNERS', payload)
  },
  add_offers ({ commit }, payload) {
    commit('OFFERS', payload)
  },
  add_collection ({ commit }, payload) {
    commit('COLLECTION', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
