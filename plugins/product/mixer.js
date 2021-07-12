import { cloneDeep } from 'lodash'

export default (item) => {
  item.selected_vartians = {}
  item.cartQuantities = 1
  item.loved = true

  return cloneDeep(item)
}
