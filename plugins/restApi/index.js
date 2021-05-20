import ___GetAll from './AllGet'
import ___Put from './Put'

export const restApi = {
  context: null,
  ctx (context) {
    this.context = context
    return this
  },
  getIs () {
    return new ___GetAll(this.context)
  },
  put () {
    return new ___Put(this.context)
  }
}

export default restApi
