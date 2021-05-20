/* eslint-disable*/
// Add a rule.

export default {
  secret: {
    validate: value => value === 'example',
    message: 'This is not the magic word'
  },
  greaterThan: {
    params: ['target'],
    validate(value, arg) {
      const { target } = arg
      return value > target
    },
    message: '{_field_} value must be gratter then {target}'
  },
  smallerThan: {
    params: ['target'],
    validate(value, arg) {
      const { target } = arg
      return value < target
    },
    message: '{_field_} value must be samller then {target}'
  },
  equalBy: {
    params: ['target'],
    validate(value, arg) {
      const { target } = arg
      return value === target
    },
    message: '{_field_} value must be equal by {target}'
  }
}

//https://logaretm.github.io/vee-validate/advanced/rules-object-expression.html#cross-field-validation
