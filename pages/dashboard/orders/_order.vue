<template>
  <div class="order-show">
    <b-overlay :show="busy" style="min-height:500px;">
      <article v-if="!busy" class="card">
        <header class="card-header">
          My Orders / Tracking
        </header>
        <div class="card-body">
          <h6>Order ID: {{ order.order_id }}</h6>
          <article class="card">
            <div class="card-body row">
              <div class="col">
                <!-- <strong>Estimated Delivery time:</strong> <br>29 nov 2019 -->
              </div>
              <div class="col">
                <strong>Shipping BY:</strong> <br>
                {{ order.address.name }}, | <BIconPhone />
                {{ order.address.phone }}
              </div>
              <div class="col">
                <strong>Status:</strong> <br>
                {{ order.status.title }}
              </div>
              <div class="col">
                <strong>Tracking #:</strong> <br>
                {{ order.order_id }}
              </div>
            </div>
          </article>
          <div class="track-box">
            <div class="track">
              <div
                v-for="(item, index) in statusList"
                :key="index"
                class="step"
                :class="{ active: item.active }"
              >
                <span class="text" v-text="item.title" />
                <div class="color-line">
                  <div class="icon">
                    <component :is="item.com" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <b-table-simple v-if="order" hover small caption-top responsive>
            <colgroup>
              <col>
              <col>
            </colgroup>
            <colgroup>
              <col>
              <col>
              <col>
            </colgroup>
            <colgroup>
              <col>
              <col>
            </colgroup>
            <b-thead head-variant="dark">
              <b-tr>
                <b-th>Image</b-th>
                <b-th>Title</b-th>
                <b-th>Status</b-th>
                <b-th>Amount</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(item, index) in order.order_products" :key="index">
                <b-th>
                  <b-img v-bind="{ height: 100 }" :src="item.images[0].url" />
                </b-th>
                <b-td>
                  {{ item.title }}
                </b-td>
                <b-td v-text="item.status.title" />
                <b-td class="text-right" v-text="item.amount" />
              </b-tr>
            </b-tbody>
            <b-tfoot>
              <b-tr>
                <b-td colspan="4" variant="secondary" class="text-right">
                  Total Amount: <b v-text="order.amount" />
                </b-td>
              </b-tr>
            </b-tfoot>
          </b-table-simple>
          <hr>
          <b-button :to="{ name: 'dashboard' }">
            Back to orders
          </b-button>
        </div>
      </article>
    </b-overlay>
  </div>
</template>

<script>
import { BIconCheck, BIconShopWindow, BIconPhone } from 'bootstrap-vue'
import { lowerCase, sortBy } from 'lodash'

export default {
  components: {
    isStart: BIconCheck,
    isFinal: BIconShopWindow,
    BIconPhone
  },
  data () {
    return {
      busy: true,
      order: null
    }
  },
  fetchOnServer: false,
  async fetch () {
    this.busy = true
    try {
      // eslint-disable-next-line camelcase
      const order_id = this.$route.params.order
      const url = this.$apiUrl('app.order.show', { order_id }, false)
      const { data } = await this.$axiosWithoutToken.get(url)
      this.order = data
    } catch (error) {
      console.error(error)
      if (error.response) {
        if (error.response.status === 404) {
          this.$router.push({ name: 'not-found' })
        }
      }
    }
    this.busy = false
  },
  computed: {
    statusList () {
      const list = this.order.order_status_list.filter(e => !e.is_cancel)
      const findIndex = list.findIndex((e) => {
        return lowerCase(e.title) === lowerCase(this.order.status.title)
      })
      return sortBy(list, 'priority').map((s, index) => {
        const com = s.is_final ? 'isFinal' : 'isStart'
        s.com = com
        s.active = false
        if (index <= findIndex) {
          s.active = true
        }
        return s
      })
    }
  }
}
</script>
