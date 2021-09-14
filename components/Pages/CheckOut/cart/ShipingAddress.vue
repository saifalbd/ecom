<template>
  <div class="login-box">
    <b-overlay :show="busy">
      <b-card v-if="!shipingAddresses" header-tag="header">
        <template #header>
          <h4 class="mb-0">
            CREATE AN ACCOUNT
          </h4>
        </template>
        <b-card-text>
          <CreateAddress @done="createdAddress" />
        </b-card-text>
      </b-card>
      <b-card-group v-else deck>
        <b-card
          v-for="address in shipingAddresses"
          :key="address.id"
          header-tag="header"
          footer="Card Footer"
          footer-tag="footer"
        >
          <template #header>
            <h4 class="mb-0">
              Shiping {{ address.type }} Address
            </h4>
          </template>
          <b-card-text>
            <div>Name: {{ address.name }}</div>
            <div>Name: {{ address.phone }}</div>
            <div v-if="address.alt_phone">
              Alternative Phone: {{ address.alt_phone }}
            </div>
            <div>
              {{ address.details }}
            </div>
            <div>{{ address.city }},{{ address.country }}</div>
          </b-card-text>
          <template #footer>
            <div class="d-flex justify-content-between">
              <b-button
                v-if="address.id == selectedShipAddress"
                variant="success"
                @click.stop="selectedShipAddress = address.id"
              >
                <BIconCheck2Circle />
                Selected for shipingAddresses
              </b-button>
              <b-button
                v-else
                variant="outline-success"
                @click.stop="selectedShipAddress = address.id"
              >
                <BIconHandThumbsUp />
                Select Home Address for Shiping
              </b-button>
              <ShipingAddressEdit :edit-item="address" @done="addOrEdit">
                <template #default="{ on }">
                  <b-button
                    variant="outline-primary"
                    size="sm"
                    class="m-1"
                    @click="on"
                  >
                    <BIconPencilFill />
                    Edit
                  </b-button>
                </template>
              </ShipingAddressEdit>
            </div>
          </template>
        </b-card>
      </b-card-group>
    </b-overlay>
  </div>
</template>

<script>
import { head, lowerCase } from 'lodash'
import {
  BIconPencilFill,
  BIconCheck2Circle,
  BIconHandThumbsUp
} from 'bootstrap-vue'
import { mapActions, mapState } from 'vuex'
import CreateAddress from './CreateAddress.vue'
import ShipingAddressEdit from './ShipingAddressEdit.vue'
export default {
  components: {
    CreateAddress,
    ShipingAddressEdit,
    BIconPencilFill,
    BIconHandThumbsUp,
    BIconCheck2Circle
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      shipingAddresses: null,
      busy: false
    }
  },
  computed: {
    ...mapState('CheckOut', ['selectedAddress']),
    selectedShipAddress: {
      get () {
        return this.selectedAddress
      },
      set (val) {
        this.set_selected_address(val)
      }
    }
  },
  mounted () {
    this.fetchShipingAddresses()
  },
  methods: {
    ...mapActions('CheckOut', ['set_selected_address']),
    addOrEdit (item) {
      const index = this.shipingAddresses.findIndex((el) => {
        return (
          parseInt(el.id) === parseInt(item.id) ||
          lowerCase(el.type) === lowerCase(item.type)
        )
      })
      if (index > -1) {
        // eslint-disable-next-line vue/no-mutating-props
        this.shipingAddresses.splice(index, 1, item)
      } else {
        // eslint-disable-next-line vue/no-mutating-props
        this.shipingAddresses.push(item)
      }
      this.$emit('update:withRegister', false)
      this.$emit('update:selectedAddress', item.id)
    },
    createdAddress (address) {
      if (this.shipingAddresses) {
        this.shipingAddresses.push(address)
      } else {
        this.shipingAddresses = [address]
        this.set_selected_address(address.id)
      }
    },
    async fetchShipingAddresses () {
      const user = this.user.id
      try {
        this.busy = true
        const url = this.$apiUrl(
          'app.user.shipingAddress.index',
          { user },
          false
        )
        const { data } = await this.$authAxios(this.$auth).get(url)

        if (data.length) {
          const selectedAddress = head(data) ? head(data).id : null
          this.set_selected_address(selectedAddress)
          this.shipingAddresses = data
        }

        Promise.resolve({ data })
      } catch (error) {
        console.error(error)
      }
      this.busy = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
