import { findKey, lowerCase, capitalize } from 'lodash'
export default {
  methods: {
    statusIs (str = undefined) {
      const list = this.orderStatusList

      const index = list.findIndex(
        e => parseInt(this.order.status) === parseInt(e.value)
      )

      const status = list[index].text
      if (str !== undefined) {
        return lowerCase(str) === lowerCase(status)
      } else {
        return lowerCase(status)
      }
    },

    statusUpdate (str) {
      const list = this.order_status_list
      const key = findKey(list, (v, key) => {
        return lowerCase(key) === lowerCase(str)
      })
      this.order.status = list[key]
    },
    async cancel () {
      try {
        const url = this.$apiUrl(
          'app.dashboard.order.cancel',
          {
            order: this.order.id
          },
          false
        )

        const { data } = await this.$authAxios(this.$auth).get(url)
        this.statusUpdate('cancel')
      } catch (error) {
        console.error(error)
      }
    }
  },
  computed: {
    statusTxt () {
      return capitalize(this.statusIs())
    },
    isCancel () {
      return this.statusIs('cancel')
    },
    isPending () {
      return this.statusIs('panding')
    },
    isPacking () {
      return this.statusIs('packing')
    },
    isOnWay () {
      return this.statusIs('DELIVERD')
    }
  }
}
