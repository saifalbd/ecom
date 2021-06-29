export default {
  data () {
    return {
      districts: []
    }
  },
  methods: {
    async fetchDistricts () {
      this.busy = true
      try {
        const type = 'district'
        const url = this.$apiUrl('app.location.index', { type }, false)
        const { data } = await this.$axiosWithoutToken.get(url)
        this.districts = data
      } catch (error) {
        console.error(error)
      }
      this.busy = false
    }
  },
  created () {
    this.fetchDistricts()
  }
}
