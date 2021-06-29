<template>
  <b-row class="order">
    <b-col cols="12">
      <b-card
        title="Orders"
        :sub-title="`Total Orders ${total_order_count}`"
        tag="div"
      >
        <Vo class="row mt-3" tag="div">
          <!-- start vp -->
          <Vp
            v-slot="{ valid, errors }"
            name="Order id"
            vid="order_id"
            :rules="{ required: false }"
            class="col-12 col-md-5"
            tag="div"
          >
            <!--   description="Let us know your name." -->
            <b-form-group
              :invalid-feedback="errors[0]"
              :state="vs(valid, errors)"
            >
              <b-input-group prepend="Order id">
                <b-form-input
                  v-model="finder.order_id"
                  placeholder="Order Id"
                  trim
                />
              </b-input-group>
            </b-form-group>
          </Vp>
          <!-- end vp -->

          <!-- start vp -->
          <Vp
            v-slot="{ valid, errors }"
            name="status"
            vid="status"
            :rules="{ required: false }"
            class="col-12 col-md-5"
            tag="div"
          >
            <!--   description="Let us know your name." -->
            <b-form-group
              :invalid-feedback="errors[0]"
              :state="vs(valid, errors)"
            >
              <b-input-group prepend="Status">
                <b-form-select
                  v-model="finder.status"
                  class="text-capitalize"
                  placeholder="Order Id"
                  :options="statusList"
                  value-field="id"
                  text-field="title"
                  trim
                />
              </b-input-group>
            </b-form-group>
          </Vp>
          <!-- end vp -->
          <b-col cols="12" md="2" class="text-left">
            <b-button
              size="sm"
              variant="outline-primary"
              class="px-4"
              @click.stop="find"
            >
              Find
            </b-button>
          </b-col>
        </Vo>
      </b-card>
    </b-col>
    <hr class="mt-3 mb-2">
    <b-col v-for="(order, index) in tempOrders" :key="index" cols="12">
      <OrderSingle :order="order" :order-status-list="order_status_list" />
    </b-col>
  </b-row>
</template>

<script>
/* eslint-disable camelcase */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { lowerCase, isEmpty } from 'lodash'
import OrderSingle from '@/components/Pages/dashboard/order/OrderSingle.vue'
export default {
  name: 'Orders',
  components: {
    OrderSingle,
    Vo: ValidationObserver,
    Vp: ValidationProvider
  },
  data () {
    return {
      finder: {
        statusList: [
          'canceled',
          'pending',
          'progressing',
          'packing',
          'ready',
          'on way',
          'All orders'
        ],
        order_id: '',
        status: ''
      },
      orders: [],
      tempOrders: [],
      order_status_list: [],
      total_order_count: 0
    }
  },
  computed: {
    statusList () {
      const list = this.order_status_list
      list.push({ id: '', title: 'All Orders' })
      return list
    }
  },
  created () {
    this.fetchOrders()
  },
  methods: {
    vs (valid, errors) {
      return errors[0] ? false : valid ? true : null
    },
    async fetchOrders () {
      try {
        const url = this.$apiUrl('app.dashboard.order', {}, false)
        const { data } = await this.$authAxios(this.$auth).get(url)

        this.orders = data.data
        this.tempOrders = data.data

        this.order_status_list = data.meta.order_status_list
        this.total_order_count = data.meta.total_order_count
      } catch (error) {
        console.error(error)
      }
    },
    find () {
      // eslint-disable-next-line camelcase
      const { order_id, status, statusList } = this.finder
      const orderIsEmpty = isEmpty(order_id) // sudu string ar belai kaj kore
      const statusIsEmpty = status === ''

      // console.log({ statusIsEmpty, orderIsEmpty })
      if (!statusIsEmpty && orderIsEmpty) {
        this.tempOrders = this.orders.filter(o => parseInt(o.status.id) === status)
      } else if (statusIsEmpty && !orderIsEmpty) {
        this.tempOrders = this.orders.filter(
          o => lowerCase(o.order_id) === lowerCase(order_id)
        )
      } else if (!statusIsEmpty && !orderIsEmpty) {
        this.tempOrders = this.orders.filter((o) => {
          return (
            parseInt(o.status.id) === status &&
            lowerCase(o.order_id) === lowerCase(order_id)
          )
        })
      } else {
        this.tempOrders = this.orders
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
