export default (isProd) => {
  const host = isProd ? 'https://ghorerbazar.shop' : 'http://ginnibazar.lara'
  return {
    url: host,
    port: null,
    defaults: [],
    routes: {
      'app.info': {
        uri: 'json/app',
        methods: ['GET', 'HEAD']
      },
      'app.': {
        uri: 'json/{any?}',
        methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
      },
      'app.aboutUs.show': {
        uri: 'json/about-us',
        methods: ['GET', 'HEAD']
      },
      'app.shipingChargers': {
        uri: 'json/shiping-chargers',
        methods: ['GET', 'HEAD']
      },
      'app.homePage': {
        uri: 'json/home',
        methods: ['GET', 'HEAD']
      },
      'app.homePage.moreItems': {
        uri: 'json/home-items',
        methods: ['GET', 'HEAD']
      },
      'app.item.index': {
        uri: 'json/items',
        methods: ['GET', 'HEAD']
      },
      'app.item.show': {
        uri: 'json/items/{item}',
        methods: ['GET', 'HEAD'],
        bindings: {
          product: 'id'
        }
      },
      'app.orders': {
        uri: 'json/orders',
        methods: ['GET', 'HEAD']
      },
      'app.bannars': {
        uri: 'json/bannars',
        methods: ['GET', 'HEAD']
      },
      'app.category': {
        uri: 'json/categories',
        methods: ['GET', 'HEAD']
      },
      'app.category.show': {
        uri: 'json/categories/{category}',
        methods: ['GET', 'HEAD'],
        bindings: {
          category: 'id'
        }
      },
      'app.offer-bannars': {
        uri: 'json/offer-bannars',
        methods: ['GET', 'HEAD']
      },
      'app.register': {
        uri: 'json/register',
        methods: ['GET', 'HEAD']
      },
      'app.login': {
        uri: 'json/login',
        methods: ['GET', 'HEAD']
      },
      'app.user.profile.update': {
        uri: 'json/user/profile/{profile}',
        methods: ['PUT', 'PATCH'],
        bindings: {
          user: 'id'
        }
      },
      'app.user.profile.show': {
        uri: 'json/user/profile/{profile}',
        methods: ['GET', 'HEAD'],
        bindings: {
          user: 'id'
        }
      },
      'app.user.profile': {
        uri: 'json/user/profile',
        methods: ['GET', 'HEAD']
      },
      'app.shipingAddress.index': {
        uri: 'json/address',
        methods: ['GET', 'HEAD']
      },
      'app.shipingAddress.store': {
        uri: 'json/address',
        methods: ['POST']
      },
      'app.shipingAddress.show': {
        uri: 'json/address/{address}',
        methods: ['GET', 'HEAD']
      },
      'app.shipingAddress.update': {
        uri: 'json/address/{address}',
        methods: ['PUT', 'PATCH']
      },
      'app.shipingAddress.destroy': {
        uri: 'json/address/{address}',
        methods: ['DELETE']
      },
      'app.orderPlace.index': {
        uri: 'json/palce-order',
        methods: ['GET', 'HEAD']
      },
      'app.orderPlace.store': {
        uri: 'json/palce-order',
        methods: ['POST']
      },
      'app.orderPlace.show': {
        uri: 'json/palce-order/{palce_order}',
        methods: ['GET', 'HEAD']
      },
      'app.orderPlace.update': {
        uri: 'json/palce-order/{palce_order}',
        methods: ['PUT', 'PATCH']
      },
      'app.orderPlace.destroy': {
        uri: 'json/palce-order/{palce_order}',
        methods: ['DELETE']
      },
      'app.dashboard.order': {
        uri: 'json/dashboard/orders',
        methods: ['GET', 'HEAD']
      },
      'app.dashboard.order.cancel': {
        uri: 'json/dashboard/orders/{order}/cancel',
        methods: ['GET', 'HEAD']
      }
    }
  }
}
