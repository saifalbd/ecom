import { isError, isFunction } from 'lodash'

export const formVError = (arg) => {
  const { error, vue, ref, callBack } = arg
  try {
    if (!error) {
      throw new ReferenceError('arg.error not found')
    }
    if (!isError(error)) {
      throw new ReferenceError('arg.error not type of error')
    }

    if (!vue) {
      throw new ReferenceError('this instance are no found')
    }

    const { response } = error
    if (response) {
      const { status, data } = response

      if (status == 422) {
        const r = vue.$refs[ref || 'form']
        if (!r) {
          alert(
            `validation obserber ref ${ref} not found please check correct spaling`
          )
          return false
        }

        r.setErrors(data.errors)
        if (callBack && isFunction(callBack)) {
          callBack(data)
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export default ({ app }, inject) => {
  inject('formVError', formVError)
}
