import createPersistedState from 'vuex-persistedstate'
export default ({ store }) => {
  createPersistedState({
    key: 'vuex-persisted',
    paths: ['ShopingCart', 'auth']
  })(store)
}
