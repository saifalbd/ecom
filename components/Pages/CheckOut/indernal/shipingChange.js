/* eslint-disable no-throw-literal */
/* eslint-disable no-unreachable */
import * as yup from 'yup'

import { mapState } from 'vuex'
const integer = yup
  .number()
  .required()
  .integer()
const schema = yup.array(
  yup.object().shape({
    greaterThan: integer,
    amount: integer,
    field: integer
  })
)

export default {
  computed: {
    ...mapState('CheckOut', ['selectedTariff']),
    chargeObject () {
      // bind on computed

      try {
        const total = this.sumOfPrices

        const collection = this.shipingCharges
        // eslint-disable-next-line no-throw-literal
        if (!collection.length) {
          // eslint-disable-next-line no-throw-literal
          console.error('this.shipingCharges can"t be empty')

          throw 'this.shipingCharges can"t be empty'
        }

        yup
          .number()
          .required('total must be required')
          .integer('total must be integer')
          .validate(total)

        schema.validate(collection)

        const isGreter = collection.findIndex((item) => {
          return total < item.greaterThan
        })
        console.log(isGreter, total)
        if (isGreter > -1) {
          const next = collection[isGreter - 1]
          if (next) {
            return next
          } else {
            return collection[isGreter]
          }
        } else {
          const obj = collection[collection.length - 1]

          return obj
        }
      } catch (error) {
        console.error(error)

        return {
          amount: 0
        }
      }
    },
    tariff () {
      const t = this.selectedTariff
      if (t) {
        const total = this.sumOfPrices
        if (t.free_on <= total) {
          return { amount: 0 }
        } else {
          return { amount: 0 }
        }
      }
    },

    shipCharge () {
      // bind on computed
      // return 50000
      // eslint-disable-next-line no-unreachable

      try {
        if (this.selectedTariff) {
          const chargeObject = this.tariff
          console.log('changed from tariff')
          return chargeObject.amount
        } else {
          const chargeObject = this.chargeObject
          console.log('changed from settings')
          return chargeObject.amount
        }
      } catch (error) {
        console.error(error)
        return 0
      }
    }
  },
  methods: {
    async fetchCharges () {
      try {
        if (window.app.shiping_charges === undefined) {
          // eslint-disable-next-line no-throw-literal
          throw 'window.app.shiping_charges not found'
        }
        this.shipingCharges = window.app.shiping_charges
        // updated to current changed
        const url = this.$apiUrl('app.shipingChargers', {}, false)
        const { data } = await this.$axiosWithoutToken.get(url)
        schema.validate(data)
        this.shipingCharges = data
      } catch (error) {
        console.error(error)
      }
    }
  }
}
