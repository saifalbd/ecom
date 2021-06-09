export default (num) => {
  const isCcodePlus = {
    is () {
      const v = num.slice(0, 1)
      const has = v === '+'

      return has
    }
  }
  const isCcode = {
    v: '88',
    is () {
      const v = num.slice(0, this.v.length)
      return v.search(this.v) > -1
    }
  }
  if (isCcodePlus.is()) {
    return num.slice(3, num.length)
  } else if (isCcode.is()) {
    return num.slice(2, num.length)
  } else {
    return num
  }
}
