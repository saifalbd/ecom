import { isPlainObject, lowerCase, trim } from 'lodash'
const state = () => ({
  selectedAddress: null,
  shipingChargesTariffs: [],
  selectedTariff: null,
  paymentType: 'cash_on_hand',
  createdUser: null
})

const mutations = {
  PAYMENT_TYPE (state, payload) {
    state.paymentType = payload
  },
  CREATED_USER (state, payload) {
    state.createdUser = payload
  },
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
  set_payment_type ({ commit }, payload) {
    commit('PAYMENT_TYPE', payload)
  },
  set_created_user ({ commit }, payload) {
    commit('CREATED_USER', payload)
  },
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
const getters = {
  charge: (state) => {
    const { selectedTariff, paymentType } = state
    if (!selectedTariff) {
      return 0
    }
    // eslint-disable-next-line camelcase
    const { charge_on_hand, charge_on_prepaid } = selectedTariff
    if (paymentType === 'cash_on_hand') {
      // eslint-disable-next-line camelcase
      return charge_on_hand
    } else {
      // eslint-disable-next-line camelcase
      return charge_on_prepaid
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
