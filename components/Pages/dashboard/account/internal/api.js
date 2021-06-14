import { isPlainObject } from 'lodash'

export const authProfile = async function () {
  const forUpdate = true
  try {
    const user = this.$auth.user

    if (!user) {
      throw new ReferenceError('auth user not found')
    }

    const url = this.$apiUrl(
      'app.user.profile.show',
      { profile: user.id, forUpdate },
      false
    )
    const { data } = await this.$authAxios(this.$auth).get(url)
    this.profile = data
    // return await this.ctx.$axios.get(url)
  } catch (error) {
    console.error(error)
  }
  this.busy = false
}

export const update = async function () {
  const isValid = await this.$refs.form.validate()
  if (!isValid) {
    return false
  }

  try {
    this.innerBusy = true
    const params = this.info

    const user = this.$auth.user
    const url = this.$apiUrl(
      'app.user.profile.update',
      { profile: user.id },
      false
    )
    if (!user) {
      throw new ReferenceError('auth user not found')
    }
    if (!params) {
      throw new SyntaxError('from input values are missing', 'api.js', 36)
    }
    if (!isPlainObject(params)) {
      throw new SyntaxError('from input values must be a Object', 'api.js', 36)
    }

    await this.$authAxios(this.$auth).put(url, params)
  } catch (error) {
    console.error(error)
    const callBack = (data) => {
      this.errorMessage = data.message
      this.errorDialog = true
    }

    this.$formVError({ error, vue: this, ref: 'form', callBack })
  }
  this.innerBusy = false
}
