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
                Personal information
              </legend>
              <b-button
                v-if="readonly"
                size="sm"
                variant="outline-primary"
                @click="readonly = false"
              >
                Change personal information
              </b-button>
            </div>

            <div class="col" :class="{ readonly }">
              <!-- start vp -->
              <Vp
                v-slot="{ valid, errors }"
                name="Name"
                vid="name"
                :rules="{ required: true }"
                tag="div"
              >
                <b-form-group
                  label-class="font-weight-bold"
                  :invalid-feedback="errors[0]"
                  :state="vs(valid, errors)"
                  label="Name:"
                  label-for="name"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input
                    id="name"
                    v-model="info.name"
                    :size="inputSize"
                    :readonly="readonly"
                  />
                </b-form-group>
              </Vp>
              <!-- start end -->

              <!-- start vp -->
              <Vp
                v-slot="{ valid, errors }"
                name="Birth Date"
                vid="brith_date"
                :rules="{ required: true }"
                tag="div"
              >
                <b-form-group
                  label-class="font-weight-bold"
                  :invalid-feedback="errors[0]"
                  :state="vs(valid, errors)"
                  label="Birth Date:"
                  label-for="nested-brith"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input
                    id="nested-brith"
                    v-model="info.brith_date"
                    :readonly="readonly"
                    :size="inputSize"
                    type="date"
                  />
                </b-form-group>
              </Vp>
              <!-- start end -->
              <!-- start vp -->
              <Vp
                v-slot="{ valid, errors }"
                name="City"
                vid="city"
                :rules="{ required: true }"
                tag="div"
              >
                <b-form-group
                  label-class="font-weight-bold"
                  :invalid-feedback="errors[0]"
                  :state="vs(valid, errors)"
                  label="City:"
                  label-for="nested-city"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input
                    id="nested-city"
                    v-model="info.city"
                    :readonly="readonly"
                    :size="inputSize"
                  />
                </b-form-group>
              </Vp>
              <!-- start end -->

              <!-- start vp -->
              <Vp
                v-slot="{ valid, errors }"
                name="State"
                vid="state"
                :rules="{ required: true }"
                tag="div"
              >
                <b-form-group
                  label-class="font-weight-bold"
                  :invalid-feedback="errors[0]"
                  :state="vs(valid, errors)"
                  label="State:"
                  label-for="nested-state"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input
                    id="nested-state"
                    v-model="info.state"
                    :readonly="readonly"
                    :size="inputSize"
                  />
                </b-form-group>
              </Vp>
              <!-- start end -->
              <!-- start vp -->
              <Vp
                v-slot="{ valid, errors }"
                name="Country"
                vid="state"
                :rules="{ required: true }"
                tag="div"
              >
                <b-form-group
                  label-class="font-weight-bold"
                  :invalid-feedback="errors[0]"
                  :state="vs(valid, errors)"
                  label="Country:"
                  label-for="nested-country"
                  label-cols-sm="3"
                  label-align-sm="right"
                >
                  <b-form-input
                    id="nested-country"
                    v-model="info.country"
                    :readonly="readonly"
                    :size="inputSize"
                  />
                </b-form-group>
              </Vp>
              <!-- start end -->

              <b-form-group
                v-slot="{ ariaDescribedby }"
                label-class="font-weight-bold"
                label="Gender:"
                label-cols-sm="3"
                label-align-sm="right"
                class="mb-0"
              >
                <b-form-radio-group
                  v-model="info.gender"
                  :size="inputSize"
                  :readonly="readonly"
                  class="pt-2"
                  :options="['Male', 'Female', 'Transgender']"
                  :aria-describedby="ariaDescribedby"
                />
              </b-form-group>
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
    <!-- <rd-error-message
      v-model="errorDialog"
      :message="errorMessage"
      title-pad-right="422"
    /> -->
  </b-overlay>
</template>

<script>
// import { RdErrorMessage } from '../../../index.js'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { update } from './internal/api'
export default {
  name: 'PersonalInformation',
  components: {
    // RdErrorMessage,
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
        update_type: 'genaral',
        name: '',

        brith_date: '',
        city: '',
        state: '',
        country: '',
        gender: ''
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
          if (!this.info[key]) {
            this.info[key] = this.profile[key]
          }
        }
      }
    }
  }
}
</script>
