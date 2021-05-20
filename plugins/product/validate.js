import { schema } from './Schema'

export default (item) => {
  try {
    schema.validate(item)

    return item
  } catch (error) {
    console.error(error)
    return false
  }
}
