export default {
  url: 'http://127.0.0.1:8000',
  port: 8000,
  defaults: {},
  routes: {
    'app.items': {
      uri: 'json/items',
      methods: ['GET', 'HEAD']
    },
    'app.bannars': {
      uri: 'json/bannars',
      methods: ['GET', 'HEAD']
    },
    'app.categories': {
      uri: 'json/categories',
      methods: ['GET', 'HEAD']
    },
    'app.offer-bannars': {
      uri: 'json/offer-bannars',
      methods: ['GET', 'HEAD']
    },
    'app.register': {
      uri: 'json/register',
      methods: ['POST']
    },
    'app.login': {
      uri: 'json/login',
      methods: ['GET', 'HEAD']
    },
    'app.shopingCart.index': {
      uri: 'json/shoping-cart',
      methods: ['GET', 'HEAD']
    },
    'app.shopingCart.store': {
      uri: 'json/shoping-cart',
      methods: ['POST']
    },
    'app.shopingCart.show': {
      uri: 'json/shoping-cart/{shoping_cart}',
      methods: ['GET', 'HEAD']
    },
    'app.shopingCart.update': {
      uri: 'json/shoping-cart/{shoping_cart}',
      methods: ['PUT', 'PATCH']
    },
    'app.shopingCart.destroy': {
      uri: 'json/shoping-cart/{shoping_cart}',
      methods: ['DELETE']
    }
  }
}
