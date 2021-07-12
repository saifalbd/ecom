/* eslint-disable camelcase */
// import { axiosWithoutToken } from '@/plugins/axios'
import { validate, mixer } from '@/plugins/product/index'
import { hasIn, isUndefined, head } from 'lodash'

const itemsMixer = (items) => {
  return items.map((item) => {
    validate(item)
    return mixer(item)
  })
}

const collectionMixer = (collection) => {
  return collection.map((obj) => {
    obj.busy = false
    obj.data = itemsMixer(obj.data)
    return obj
  })
}

export const asyncData = async function (ctx) {
  try {
    const url = ctx.$apiUrl('app.homePage', {}, false)

    const { data } = await ctx.$axiosWithoutToken.get(url)

    if (!hasIn(data, 'banners')) {
      // eslint-disable-next-line no-throw-literal
      throw 'data.banners missing'
    }
    if (!hasIn(data, 'offers')) {
      // eslint-disable-next-line no-throw-literal
      throw 'data.offers missing'
    }
    if (!hasIn(data, 'vendors')) {
      // eslint-disable-next-line no-throw-literal
      throw 'data.vendors missing'
    }
    if (!hasIn(data, 'categories')) {
      // eslint-disable-next-line no-throw-literal
      throw 'data.categories missing'
    }
    if (!hasIn(data, 'collection')) {
      // eslint-disable-next-line no-throw-literal
      throw 'data.collection missing'
    }
    if (!Array.isArray(data.collection)) {
      // eslint-disable-next-line no-throw-literal
      throw 'data.collection must be Array'
    }

    const banners = data.banners
    const offers = data.offers
    const categories = data.categories
    const vendors = data.vendors
    const collection = data.collection.map((item) => {
      item.busy = false
      item.data = itemsMixer(item.data)
      return item
    })
    return { collection, banners, offers, categories, vendors }
  } catch (error) {
    console.error(error)
  }
}

export const methods = {
  async loadMoreItems (index) {
    const obj = this.collection[index]
    // eslint-disable-next-line camelcase
    const category_id = obj.meta.category_id
    const offset = obj.meta.offset
    obj.busy = true
    try {
      if (isUndefined(category_id)) {
        // eslint-disable-next-line no-throw-literal
        throw 'category_id missing'
      }
      if (isUndefined(offset)) {
        // eslint-disable-next-line no-throw-literal
        throw 'offset are missing'
      }

      // const data = await this.hasOnSession(category_id,offset);
      const url = this.$apiUrl(
        'app.homePage.moreItems',
        { category_id, offset },
        false
      )
      const { data } = await this.$axiosWithoutToken.get(url)

      obj.data.push(...itemsMixer(data.data))

      obj.meta.offset = data.meta.offset
    } catch (error) {
      console.error(error)
    }
    obj.busy = false
  },
  nextCategoryId () {
    const fetchedCatagories = this.collection.map(item =>
      parseInt(item.meta.category_id)
    )
    const nextAll = this.categories.filter((item) => {
      return !fetchedCatagories.includes(parseInt(item))
    })
    return head(nextAll)
  },
  async nextCategoryItems (category_id) {
    try {
      const url = this.$apiUrl(
        'app.homePage.nextCategory',
        { category_id },
        false
      )
      const { data } = await this.$axiosWithoutToken.get(url)

      data.busy = false
      data.data = itemsMixer(data.data)
      this.collection.push(data)
      return Promise.resolve({ data })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async fetchNextAll () {
    const cats = this.categories
    for (let index = 0; index < cats.length; index++) {
      const next = this.nextCategoryId()
      if (next) {
        await this.nextCategoryItems(next)
      }
    }
  }
}
