<template>
  <b-modal
    v-model="dialog"
    hide-footer
    :title="title"
    no-close-on-backdrop
    @hide="$emit('close', true)"
  >
    <div>
      <b-overlay :show="busy">
        <template #overlay>
          <div class="d-flex align-items-center">
            <b-spinner small type="grow" variant="secondary" />
            <b-spinner type="grow" variant="dark" />
            <b-spinner small type="grow" variant="secondary" />
            <!-- We add an SR only text for screen readers -->
            <span>
              {{ busyText }}
            </span>
          </div>
        </template>
        <Vo ref="shiping">
          <b-card bg-variant="light" no-footer border-variant="light">
            <Vp
              v-slot="{ valid, errors }"
              name="receiveNumber"
              :vid="`receiveNumber`"
              :rules="{ required: false, phone: true }"
              tag="div"
            >
              <b-form-group
                :invalid-feedback="errors[0]"
                :state="vs(valid, errors)"
                label="ReceiveNumber:*"
                label-for="receiveNumber"
                label-cols-sm="3"
                :label-cols-lg="labelColLg"
                label-align-sm="right"
              >
                <b-form-input
                  id="receiveNumber"
                  v-model="receiveNumber"
                  :size="size"
                />
              </b-form-group>
            </Vp>
            <Vp
              v-slot="{ valid, errors }"
              name="SenderNumber"
              :vid="`senderNumber`"
              :rules="{ required: false, phone: true }"
              tag="div"
            >
              <b-form-group
                :invalid-feedback="errors[0]"
                :state="vs(valid, errors)"
                label="SenderNumber:*"
                label-for="SenderNumber"
                label-cols-sm="3"
                :label-cols-lg="labelColLg"
                label-align-sm="right"
              >
                <b-form-input
                  id="SenderNumber"
                  v-model="senderNumber"
                  :size="size"
                />
              </b-form-group>
            </Vp>
            <Vp
              v-slot="{ valid, errors }"
              name="refarenceNumber"
              :vid="`refarenceNumber`"
              :rules="{ required: false, phone: true }"
              tag="div"
            >
              <b-form-group
                :invalid-feedback="errors[0]"
                :state="vs(valid, errors)"
                label="RefarenceNumber:*"
                label-for="RefarenceNumber"
                label-cols-sm="3"
                :label-cols-lg="labelColLg"
                label-align-sm="right"
              >
                <b-form-input
                  id="RefarenceNumber"
                  v-model="refarenceNumber"
                  :size="size"
                />
              </b-form-group>
            </Vp>

            <Vp
              v-slot="{ valid, errors }"
              name="amount"
              :vid="`amount`"
              :rules="{ required: false, phone: true }"
              tag="div"
            >
              <b-form-group
                :invalid-feedback="errors[0]"
                :state="vs(valid, errors)"
                label="Amount:*"
                label-for="amount"
                label-cols-sm="3"
                :label-cols-lg="labelColLg"
                label-align-sm="right"
              >
                <b-form-input id="amount" v-model="amount" :size="size" />
              </b-form-group>
            </Vp>

            <b-row align-h="end">
              <b-button squared variant="primary" @click="submit">
                Submit
              </b-button>
            </b-row>
          </b-card>
        </Vo>
      </b-overlay>
    </div>
  </b-modal>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
// import phoneConverter from '../../indernal/phoneConverter'
export default {
  components: {
    Vo: ValidationObserver,
    Vp: ValidationProvider
  },
  props: {
    title: {
      type: String,
      default: 'payment'
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      size: 'lg',
      busy: false,
      busyText: 'Please',
      labelColLg: 3,
      // fields
      receiveNumber: '01715745585',
      refarenceNumber: '',
      senderNumber: '01715045042',
      amount: 200,
      method: 'bkash'
    }
  },
  computed: {
    dialog: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    vs (valid, errors) {
      return errors[0] ? false : valid ? true : null
    },
    submit () {}
  }
}
</script>
