<template>
  <div>
    <slot name="activator" :on="on" />
    <b-modal v-model="dialog" hide-footer title="Send Message">
      <b-container class="mt-3 mb-3 relative">
        <b-overlay :show="busy">
          <b-row>
            <b-col
              v-for="res in responses"
              :key="res.id"
              cols="12"
              :class="{ sender: res.sender }"
              v-text="res.message"
            />

            <b-col cols="12">
              <b-row>
                <b-col cols="12">
                  <b-textarea
                    v-model="message"
                    dense
                    class="mt-2"
                    label="message"
                    rows="1"
                    prepend-icon="mdi-comment"
                  />
                </b-col>
                <b-col cols="12" class="text-center pt-3">
                  <b-button size="sm" @click.stop="submit">
                    send
                  </b-button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-overlay>
      </b-container>
    </b-modal>
  </div>
</template>

<script>

export default {
  components: {},
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialog: false,
      busy: false,
      message: ''
    }
  },
  computed: {
    responses () {
      return this.item.responses.map((r) => {
        if (parseInt(r.user_id) === parseInt(this.item.user_id)) {
          r.sender = false
        } else {
          r.sender = true
        }
        return r
      })
    }
  },
  methods: {
    on () {
      this.dialog = !this.dialog
    },
    params () {
      const message = this.message
      return { message }
    },
    async submit () {
      if (!this.message) {
        return false
      }
      try {
        this.busy = true
        const payment = this.item.id

        const url = this.$apiUrl(
          'app.payment.response.store',
          { payment },
          false)
        const { data } = await this.$authAxios(this.$auth).post(url, this.params())
        // eslint-disable-next-line vue/no-mutating-props
        this.item.responses.push(data)
      } catch (error) {
        console.error(error)
      }
      this.busy = false
    }
  }
}
</script>

<style lang="scss" scoped>
.sender {
  color: rebeccapurple;
}
</style>
