/* eslint-disable */
const modifyData = meta => {
  // eslint-disable-next-line camelcase
  const { current_page, from, last_page, per_page, to, total } = meta
  const links = meta.links
    .filter(l => l.url)
    .map(link => {
      const active = link.active
      const label = link.label
      const params = {}

      for (const [key, value] of new URL(link.url).searchParams) {
        // eslint-disable-next-line eqeqeq
        const page = 'page'
        if (key == page) {
          params[key] = parseInt(value)
        } else {
          params[key] = value
        }
      }
      return { active, label, params }
    })

  return { links, current_page, from, last_page, per_page, to, total }
}

export default {
  info(meta) {
    const modify = modifyData(meta)
    for (const key in modify) {
      this[key] = modify[key]
    }
    return this
  },
  hasNext() {
    return this.current_page <= this.last_page
  },
  nextPage() {
    return (this.current_page += 1)
  },
  nextPageParams(mix = {}) {
    if (this.hasNext()) {
      const nextP = this.nextPage()
      const index = this.links.findIndex(
        // eslint-disable-next-line eqeqeq
        el => parseInt(el.params.page) == parseInt(nextP)
      )
      if (index > -1) {
        const { params } = this.links[index]
        const result = { ...params, ...mix }

        return result
      } else {
        console.error('somting error Pagination.js line 48')
      }
    }
  }
}
