/* eslint-disable*/
// Add a rule.

const phone = {
  validate: value => {
    var limit = 11

    const isCcodePlus = {
      is() {
        const v = value.slice(0, 1)
        const has = '+' === v

        return has
      }
    }
    const isCcode = {
      v: '88',
      is() {
        const v = value.slice(0, this.v.length)
        return v.search(this.v) > -1
      }
    }
    if (isCcodePlus.is()) {
      limit = 14
    } else if (isCcode.is()) {
      limit = 13
    } else {
      limit = 11
    }
    if (value.length > limit) {
      return false
    }
    var num

    if (value.length > 4) {
      if (isCcodePlus.is()) {
        if (value.slice(0, 4) !== '+880') {
          return false
        }
      } else if (isCcode.is()) {
        if (value.slice(0, 3) !== '880') {
          return false
        }
      } else {
        if (value.slice(0, 1) !== '0') {
          return false
        }
      }
    }
    if (value.length === 14) {
      const v = value.slice(0, 4)
      num = value.slice(v.length, value.length)
    } else if (value.length === 13) {
      const v = value.slice(0, 3)
      num = value.slice(v.length, value.length)
    } else {
      const v = value.slice(0, 1)
      num = value.slice(v.length, value.length)
    }

    if (isNaN(num)) {
      // not number
      return false
    }

    return true
  },
  message: 'phone number not valid'
}

export default {
  phone,
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
