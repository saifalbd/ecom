<template>
  <client-only>
    <b-row>
      <b-col cols="12">
        <b-card no-body width="100%">
          <b-tabs pills card>
            <b-tab title="Orders">
              <b-card-text>
                <order />
              </b-card-text>
            </b-tab>
            <b-tab title="Account" active>
              <b-card-text>
                <account />
              </b-card-text>
            </b-tab>
            <b-tab title="Payments">
              <b-card-text>
                <Payment />
              </b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </client-only>
</template>

<script>
import Order from '@/components/Pages/dashboard/order/Index.vue'
import Account from '@/components/Pages/dashboard/account/index.vue'
import Payment from '@/components/Pages/dashboard/payments/index.vue'

export default {
  auth: true,
  components: {
    Order,
    Account,
    Payment
  }
}
</script>
