/* eslint-disable */
import route from 'ziggy-js'
/* eslint-disable  no-explicit-any */
export const ziggyRoute = function(ziggy) {
  return function(name, params, absolute, config) {
    const ab = process.env.NODE_ENV === 'production' ? true : absolute
    return route(name, params, ab, config ? config : ziggy)
  }
}

export default ziggy => {
  return {
    methods: {
      route(name, params, absolute, config) {
        return ziggyRoute(ziggy)(name, params, absolute, config)
      }
    }
  }
}

//# sourceMappingURL=index.js.map
