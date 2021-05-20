<template>
  <div class="thank-you" :style="`background-image: url('${flower}')`">
    <div class="box">
      <div class="title">
        ThankYou
      </div>

      <div v-if="user.userName && user.password" class="subtitle">
        Newly Created User
      </div>
      <div v-if="user.userName" class="ordertitle">
        <dir>
          User Name
        </dir>
        <dir class="order-id">
          {{ user.userName }}
        </dir>
      </div>
      <div v-if="user.password" class="ordertitle">
        <dir>
          Password
        </dir>
        <dir class="order-id">
          {{ user.password }}
        </dir>
      </div>
      <div class="subtitle">
        For your happy Shoping
      </div>

      <div class="ordertitle">
        <dir>
          Your order id
        </dir>
        <dir class="order-id">
          {{ orderId }}
        </dir>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import flower from '@/assets/flower.png'
import { has } from 'lodash'
export default {
  props: {},
  data() {
    return {
      orderId: '',
      flower,
      // jodi order korar somy auto user create hoy tahole userName and password set hobe
      user: {
        userName: '',
        password: ''
      }
    }
  },
  mounted() {
    const query = this.$route.query

    if (has(query, 'userName')) {
      this.user.userName = query.userName
    }
    if (has(query, 'password')) {
      this.user.password = query.password
    }
    this.orderId = this.$route.query.order_id
  },
  created() {}
}
</script>
