import { isPlainObject, lowerCase, trim } from 'lodash'
const state = () => ({
  selectedAddress: null,
  shipingChargesTariffs: [],
  selectedTariff: null
})

const mutations = {
  SELECTED_ADDRESS (state, payload) {
    state.selectedAddress = payload
  },
  SHIPING_CHANGES_TARIFF (state, payload) {
    state.shipingChargesTariffs = payload
  },
  SELECTED_TARIFF (state, payload) {
    // // if (!isPlainObject(payload)) {
    //   console.error('selectedTariff must be object')
    // }
    const city = trim(lowerCase(payload))

    state.selectedTariff = state.shipingChargesTariffs.find((item) => {
      const name = trim(lowerCase(item.district.name))
      const bnName = trim(lowerCase(item.district.bn_name))
      return name === city || bnName === city
    })
  }
}

const actions = {
  set_selected_address ({ commit }, payload) {
    commit('SELECTED_ADDRESS', payload)
  },
  set_selected_tariff ({ commit }, payload) {
    commit('SELECTED_TARIFF', payload)
  },
  async set_shiping_charge_tariff ({ commit }) {
    try {
      const url = this.$apiUrl('app.shipingChargeTariff.index', {}, false)
      const { data } = await this.$axiosWithoutToken.get(url)
      commit('SHIPING_CHANGES_TARIFF', data)
      return Promise.resolve({ data })
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
