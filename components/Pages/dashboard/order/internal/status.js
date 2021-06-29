/* eslint-disable camelcase */
import { findKey, lowerCase, capitalize } from 'lodash'
export default {
  methods: {
    async cancel (status) {
      if (!status.is_start || !status.is_final) {
        try {
          this.busy = true
          const url = this.$apiUrl(
            'app.dashboard.order.cancel',
            {
              order: this.order.id
            },
            false
          )

          const { data } = await this.$authAxios(this.$auth).get(url)
          this.order.status = this.orderStatusList.find(item => item.is_cancel)
          this.busy = false
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  computed: {
    statusVariant () {
      const {
        status: { is_final, is_start, is_cancel }
      } = this.order
      if (is_start) {
        return 'outline-primary'
      } else if (is_cancel) {
        return 'outline-danger'
      } else if (is_final) {
        return 'outline-primary'
      }
      return 'primary'
    }
  }
}
