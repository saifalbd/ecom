/* eslint-disable */

import { isBoolean } from 'lodash'

// define your typings for the store state
export const Auth = {
  namespaced: true,
  state: {
    token: null,
    user: null
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload
    },
    REMOVE_TOKEN(state, payload) {
      state.token = payload
    },
    SET_USER(state, payload) {
      state.user = payload
    }
  },
  actions: {
    setToken({ commit }, payload) {
      commit('SET_TOKEN', payload)
    },
    removeToken({ commit }) {
      commit('SET_TOKEN', null)
    },
    setUser({ commit }, payload) {
      commit('SET_USER', payload)
    },
    removeUser({ commit }) {
      commit('SET_USER', null)
    }
  },
  getters: {
    token(state) {
      return state.token ? `Bearer ${state.token}` : null
    },
    user(state) {
      return state.user
    }
  }
}
//# sourceMappingURL=AuthStore.js.map
