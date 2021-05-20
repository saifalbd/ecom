/* eslint-disable */

import { isPlainObject, sum, sumBy } from 'lodash'

// define your typings for the store state
export const ShopingCart = {
  namespaced: true,
  state: {
    carts: []
  },
  mutations: {
    SET_ITEMS(state, payload) {
      state.carts = payload
    },
    ADD_ITEM(state, payload) {
      if (state.carts.findIndex(c => c.id == payload.id) == -1) {
        state.carts.push(payload)
      } else {
        console.error(
          `you are trying duplicat item on cart item id ${payload.id} alredy exits on Cart items`
        )
      }
    },
    REMOVE_ITEM(state, payload) {
      const index = state.carts.findIndex(c => c.id == payload.id)
      if (index > -1) {
        state.carts.splice(index, 1)
      } else {
        console.error(
          `you are trying worng item on cart item id ${payload.id} not exists exits on Cart items`
        )
      }
    },
    REMOVE_ALL(state) {
      state.carts = []
    },
    UPDATE_QUANTITY(state, payload) {
      try {
        if (!payload.id) throw 'item id not found'
        if (!payload.quantity) throw 'can not set false value on quantity'
        const index = state.carts.findIndex(item => item.id == payload.id)

        if (index > -1) {
          //
          const item = state.carts[index]
          item.cartQuantities = payload.quantity
          state.carts.splice(index, 1, { ...item })
        }
      } catch (error) {
        alert(error)
      }
    }
  },
  actions: {
    setItems({ commit }, payload) {
      commit('SET_ITEMS', payload)
    },

    addItem({ commit }, payload) {
      if (payload && isPlainObject(payload)) {
        commit('ADD_ITEM', payload)
      } else {
        alert('you are trying wrong item on add on carts')
      }
    },
    removeItem({ commit }, payload) {
      commit('REMOVE_ITEM', payload)
    },
    removeAll({ commit }) {
      commit('REMOVE_ALL')
    },
    updateQuantity({ commit }, payload) {
      commit('UPDATE_QUANTITY', payload)
    }
  },
  getters: {
    show: state => id => {
      //getter in side function call on hasOn(id)
      return state.carts.find(item => item.id == id)
    },
    hasOnCart: state => id => {
      //getter in side function call on hasOn(id)
      return state.carts.findIndex(item => item.id == id) > -1
    },

    countCarts(state) {
      return state.carts.length
    },
    totalCartPrices(state) {
      return sumBy(state.carts, item => {
        return parseFloat(item.price.raw) * item.cartQuantities
      })
    }
  }
}
//# sourceMappingURL=AuthStore.js.map
