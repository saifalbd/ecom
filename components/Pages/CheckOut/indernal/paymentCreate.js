export default {
  data () {
    return {
      bkashDialog: false
    }
  },
  methods: {
    paymentDailogOnClose () {
      this.paymentMethod = 'cash'
    },
    paymentDone (payment) {}
  },
  watch: {
    paymentMethod (newValue, oldValue) {
      if (newValue === 'bkash') {
        this.bkashDialog = true
      }
    }
  }
}
