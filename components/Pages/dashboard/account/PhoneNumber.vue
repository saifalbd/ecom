<template>
  <b-overlay :show="busy || innerBusy">
    <Vo ref="form">
      <b-card bg-variant="light">
        <fieldset class="form-group mb-0">
          <div class="form-row no-gutters">
            <div class="col-lg-3">
              <legend
                class="bv-no-focus-ring col-form-label col-form-label-lg font-weight-bold pt-0"
              >
                PhoneNumber
              </legend>
              <b-button
                v-if="readonly"
                size="sm"
                variant="outline-primary"
                @click="readonly = false"
              >
                Change PhoneNumber
              </b-button>
            </div>

            <div class="col" :class="{ readonly }">
              <!-- start vp -->
              <Vp
                v-slot="{ valid, errors }"
                name="PhoneNumber"
                vid="phone"
                :rules="{ required: true }"
                tag="div"
              >
                <b-form-group
                  label-class="font-weight-bold"
                  :invalid-feedback="errors[0]"
                  :state="vs(valid, errors)"
                  label="Phone:"
                  label-for="nested-phone"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input
                    id="nested-phone"
                    v-model="info.phone"
                    :readonly="readonly"
                    :size="inputSize"
                  />
                </b-form-group>
              </Vp>

              <b-row>
                <b-col offset-sm="2" class="text-center mt-4">
                  <b-button
                    variant="primary"
                    :disabled="readonly"
                    @click.stop="update"
                  >
                    save
                  </b-button>
                </b-col>
              </b-row>
              <div class="read-only-overley" />
            </div>
          </div>
        </fieldset>
      </b-card>
    </Vo>
  </b-overlay>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { update } from './internal/api'
export default {
  name: 'PhoneNumber',
  components: {
    Vo: ValidationObserver,
    Vp: ValidationProvider
  },
  props: {
    profile: {
      type: Object,
      required: true
    },
    busy: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      inputSize: 'lg',
      readonly: false,
      innerBusy: false,
      errorMessage: '',
      errorDialog: false,
      info: {
        update_type: 'phone',
        phone: ''
      }
    }
  },
  watch: {
    profile () {
      this.replace()
    }
  },

  mounted () {
    this.replace()
  },
  methods: {
    update,
    vs (valid, errors) {
      return errors[0] ? false : valid ? true : null
    },

    replace () {
      for (const key in this.profile) {
        if (this.info.hasOwnProperty.call(this.profile, key)) {
          this.info[key] = this.profile[key]
        }
      }
    }
  }
}
</script>
