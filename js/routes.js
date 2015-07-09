var handlers = require('./handlers.js');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: handlers.home
  },

  // {
  //   method: 'GET',
  //   path: '/analytics',
  //   handler: handlers.analytics
  // },

  {
    method: 'POST',
    path: '/newUser',
    handler: handlers.newUser
  },

  {
    method: 'POST',
    path: '/addAnalytics',
    handler: handlers.addAnalytics
  },
  
  { //route for all css, images and js files
    method: 'GET',
    path: '/static/{path*}',
    handler:  {
      directory: {
        path: './'
      }
    }
  }
];