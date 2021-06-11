const isBrowser = () => {
  try {
    return this === global
  } catch (e) {
    return false
  }
}
export default {
  async fetch (ctx) {
    try {
      const res = await ctx.$axios.get(
        'https://redcom.cloud/assets-media/1/content/confignew.json'
      )
      this.setResource(res.data, ctx)
    } catch (error) {
      console.error(error)
    }
  },
  setResource (resource, context) {
    context.$config._app.resource = resource
  },
  getResource (context) {
    if (!isBrowser()) {
      return context.$config._app.resource
    } else {
      return window.app
    }
  }
}
