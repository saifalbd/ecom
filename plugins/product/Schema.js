import * as yup from 'yup'
const id = yup
  .number()
  .required()
  .positive()
  .integer()
const str = yup.string().required()
const url = yup.string().url()
const unit = yup.object().shape({
  id,
  slug: id,
  title: str
})
const price = yup.object().shape({
  raw: id,
  formatted: str,
  formatted_with_symbol: str,
  formatted_with_code: str
})
const categories = yup.array(
  yup.object().shape({
    id,
    slug: str,
    title: str
  })
)
const images = yup.array(
  yup.object().shape({
    id,
    name: str,
    url
  })
)
const brand = yup
  .object()
  .shape({
    id,
    slug: str,
    title: str
  })
  .nullable()

export const schema = yup.object().shape({
  id,
  slug: id,
  group_id: id,
  sku: yup.string().nullable(),
  title: str,
  name: str,
  available_quantity: yup
    .number()
    .required()
    .integer(),
  price,
  unit,
  brand,
  categories,
  images,
  description: yup.string().nullable(),
  specification: yup.string(),
  variant_options: yup.array(),
  available_variant_options: yup.array(),
  group: yup.object().shape({
    id,
    unit,
    brand,
    categories,
    images,
    description: yup.string().nullable(),
    specification: yup.string(),
    available_variant_options: yup.array()
  })
})
