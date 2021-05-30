/* eslint-disable */
import AppConfig from './AppConfig'
import { ShopingCart } from './ShopingCart'
import Search from './Search'

// import createPersistedState from "vuex-persistedstate";
import { isBoolean } from 'lodash'

// const dataState = createPersistedState({
//   paths: ['Auth', 'ShopingCart']
// })

export default {
  modules: {
    ShopingCart,
    Search,
    AppConfig
  },
  // plugins: [dataState],
  // plugins: [createPersistedState()],

  state: () => ({
    pageBusy: true,
    loginPopup: false,
    showCart: false,
    showResMenu: false,
    api_token: ''
  }),
  mutations: {
    API_TOKEN(state, payload) {
      state.api_token = payload
    },
    PAGE_BUSY(state, payload) {
      state.pageBusy = payload
    },
    SET_LOGIN_POPUP(state, payload) {
      state.loginPopup = payload
    },
    SET_SHOW_CART(state, payload) {
      if (isBoolean(payload)) {
        state.showCart = payload
      } else {
        state.showCart = !state.showCart
      }
    },
    SET_RES_MENU(state, payload) {
      if (isBoolean(payload)) {
        state.showResMenu = payload
      } else {
        state.showResMenu = !state.showCart
      }
    }
  },
  actions: {
    addApiToken({ commit }, payload) {
      if (payload) {
        commit('API_TOKEN', payload)
      }
    },
    pageBusy({ commit }, payload) {
      commit('PAGE_BUSY', payload)
    },
    setLoginPopup({ commit }, payload) {
      commit('SET_LOGIN_POPUP', payload)
    },
    toggleCart({ commit }, payload = undefined) {
      commit('SET_SHOW_CART', payload)
    },
    toggleResMenu({ commit }, payload = undefined) {
      commit('SET_RES_MENU', payload)
    }
  }
}
//# sourceMappingURL=index.js.map
