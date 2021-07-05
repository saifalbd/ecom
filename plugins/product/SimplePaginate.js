export default {
  nextPageNumber: 0,
  info (links) {
    const con = (str) => {
      if (!str) {
        return 0
      }
      const params = new URL(str).searchParams
      const page = parseInt(params.get('page')) // is the number 18
      return page
    }
    this.nextPageNumber = con(links.next)
    return this
  },
  hasNext () {
    return !!this.nextPageNumber
  },
  nextPage () {
    return this.nextPageNumber
  },

  nextPageParams (mix = {}) {
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
