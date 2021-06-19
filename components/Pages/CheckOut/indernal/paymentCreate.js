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
    paymentDone (payment) {
      this.$bvModal.msgBoxOk('Payment successfully done', {
        title: '',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'success',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true
      })
      this.bkashDialog = false
    }
  },
  watch: {
    paymentMethod (newValue, oldValue) {
      if (newValue === 'bkash') {
        this.bkashDialog = true
      }
    }
  }
}
