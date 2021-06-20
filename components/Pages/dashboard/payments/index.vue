<template>
  <div>
    <b-overlay :show="busy">
      <b-table striped hover :items="items" :fields="fields">
        <template #[`cell(json)`]="{ item: { json } }">
          <ul v-if="json">
            <li v-for="(v, key) in json" :key="key">
              <b>{{ key }}</b>::- {{ v }}
            </li>
          </ul>
        </template>
        <template #[`cell(responses)`]="{ item }">
          <PaymentMessage :item="item">
            <template #activator="{on}">
              <b-button size="sm" @click.stop="on">
                message
                <b-badge variant="light">
                  {{ item.responses.length }}
                </b-badge>
              </b-button>
            </template>
          </PaymentMessage>
        </template>
      </b-table>
    </b-overlay>
  </div>
</template>

<script>
import PaymentMessage from '../sub/PaymentMessage.vue'
export default {
  components: {
    PaymentMessage
  },
  data () {
    return {
      busy: false,
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        {
          key: 'id',
          sortable: true
        },
        {
          key: 'amount',
          sortable: false
        },
        {
          key: 'balance',
          label: 'Balance',
          sortable: true,
          // Variant applies to the whole column, including the header and footer
          variant: 'danger'
        },
        {
          key: 'method',
          sortable: false
        },
        {
          key: 'json',
          label: 'Details',
          sortable: false
        },
        {
          key: 'note',
          sortable: false
        },
        {
          key: 'status',
          sortable: false
        },
        {
          key: 'date',
          sortable: false
        },
        {
          key: 'responses',
          label: 'message'
        }
      ],
      items: []
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      try {
        this.busy = true
        const url = this.$apiUrl('app.payment.index', {}, false)
        const { data } = await this.$authAxios(this.$auth).get(url)
        this.items = data
      } catch (error) {
        console.error(error)
      }
      this.busy = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
