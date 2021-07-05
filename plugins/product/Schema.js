import * as yup from 'yup'
const id = slug =>
  yup
    .number(`${slug} must be number`)
    .required(`${slug} required`)
    .positive(`${slug} must be positive number`)
    .integer(`${slug} must be integer number`)
const str = slug =>
  yup.string(`${slug} must be string`).required(`${slug} required`)
const url = slug =>
  yup.string(`${slug} must be string`).url(`${slug} are not valid`)
const unit = yup.object().shape({
  id: id('unit id'),
  slug: id('unit slug'),
  title: str('unit title')
})
const price = yup.object().shape({
  raw: id('price.raw'),
  formatted: str('price.formatted'),
  formatted_with_symbol: str('price.formatted_with_symbol'),
  formatted_with_code: str('price.formatted_with_code')
})
const categories = yup.array(
  yup.object().shape({
    id: id('categories object id'),
    slug: str('categories object slug'),
    title: str('categories object title')
  })
)
const images = yup.array(
  yup.object().shape({
    id: id('image id'),
    name: str('image name'),
    url
  })
)
const brand = yup
  .object()
  .shape({
    id: id('brand id'),
    slug: str('brand slug'),
    title: str('brand title')
  })
  .nullable()

export const schema = yup.object().shape({
  id: id('id'),
  slug: id('product slug'),
  group_id: id('group_id slug'),
  sku: yup.string().nullable(),
  title: str('title'),
  name: str('name'),
  available_quantity: yup
    .number('available_quantity must be number')
    .required('available_quantity must be required')
    .integer('available_quantity must be integer'),
  price,
  unit,
  brand,
  categories,
  images,
  description: yup.string().nullable(),
  specification: yup.array('specification must be array'),
  variant_options: yup.array(),
  available_variant_options: yup.array()
  // group: yup.object().shape({
  //   id: id('product group'),
  //   unit,
  //   brand,
  //   categories,
  //   images,
  //   description: yup.string().nullable(),
  //   specification: yup.array('specification must be array'),
  //   available_variant_options: yup.array(
  //     'available_variant_option must be array'
  //   )
  // })
})
