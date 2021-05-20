import Vue from 'vue'
import VueSplide from '@splidejs/vue-splide'
// ValidationProvider, ValidationObserver,
import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import customRules from '@/plugins/validate/customRules'

Vue.use(VueSplide)
const R = rules
Object.keys(R).forEach((rule) => {
  extend(rule, R[rule])
})
for (const key in customRules) {
  extend(key, customRules[key])
}
