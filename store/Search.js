/* eslint-disable */
import {
  hasIn,
  isBoolean,
  isEmpty,
  isFunction,
  isPlainObject,
  isUndefined
} from 'lodash'

const state = () => {
  return {
    searchItems: [],
    pagination: null,
    searchCount: 0,
    searchHistory: [],
    searchView: false,
    searchValue: '',
    searchBusy: false
  }
}

const mutations = {
  SET_DATA(state, payload) {
    try {
      if (isUndefined(payload)) {
        throw new Error('search data not found')
      }
      if (!isPlainObject(payload)) {
        throw new Error('search data must be object')
      }
      if (!hasIn(payload, 'links')) {
        throw new Error('search data.meta not found')
      }

      state.searchItems = payload.data.filter(item => item.images.length)

      state.pagination = payload.links
      state.searchCount = payload.data.length
    } catch (error) {
      console.log(error)
    }
  },
  SET_BUSY(state, payload) {
    if (!isBoolean(payload)) {
      console.error('SET_BUSY PARAMS MUST BE BOOLEAN')
      return null
    }
    state.searchBusy = payload
  },
  REMOVE_DATA(state) {
    state.searchView = false
    state.searchItems = []
    state.pagination = {}
    state.searchCount = 0
    state.searchValue = ''
    state.searchBusy = false
  },
  SET_SEARCH_VIEW(state, payload) {
    try {
      if (!isBoolean(payload)) {
        // eslint-disable-next-line no-throw-literal
        throw 'SET_SEARCH_VIEW PARAMS MUST BE BOOLEAN'
      }
      state.searchView = payload
    } catch (error) {
      alert(error)
    }
  },
  SET_VALUE(state, payload) {
    state.searchValue = payload
  }
}
const actions = {
  searchFetch({ commit }, payload) {},
  removeData({ commit }) {
    commit('REMOVE_DATA')
  },
  set_search_view({ commit }, payload) {
    commit('SET_SEARCH_VIEW', payload)
  },
  set_value({ commit }, payload) {
    commit('SET_VALUE', payload)
  },
  set_busy({ commit }, payload) {
    commit('SET_BUSY', payload)
  },
  set_data({ commit }, payload) {
    commit('SET_DATA', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
