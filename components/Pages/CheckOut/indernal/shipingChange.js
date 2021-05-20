import * as yup from 'yup'
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
    chargeObject () {
      // bind on computed

      try {
        const total = this.sumOfPrices
        const collection = this.shipingCharges
        // eslint-disable-next-line no-throw-literal
        if (!collection.length) {
          // eslint-disable-next-line no-throw-literal
          throw 'this.shipingCharges can"t be empty'
        }

        yup
          .number()
          .required('total must be required')
          .integer('total must be integer')
          .validate(total)

        schema.validate(collection)

        const isGreter = collection.find((item) => {
          return total < item.greaterThan
        })
        if (isGreter) {
          return isGreter
        } else {
          return collection[collection.length - 1]
        }
      } catch (error) {
        console.error(error)
        return {
          amount: 0
        }
      }
    },

    shipCharge () {
      // bind on computed
      try {
        const chargeObject = this.chargeObject
        return chargeObject.amount
      } catch (error) {
        console.error(error)
        return 0
      }
    }
  },
  methods: {
    async fetchCharges () {
      try {
        if (window.app.shiping_charges == undefined) {
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
