export default ({ app }, inject) => {
  const isDev = (is, or = null) => {
    return process.env.NODE_ENV != 'production' ? is : or
  }
  inject('isDev', isDev)
}
