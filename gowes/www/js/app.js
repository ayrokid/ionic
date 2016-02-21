// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ui.router', 'starter.controllers', 'starter.services', 'highcharts-ng', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.charts', {
    cache: false,
    url: '/charts',
    views: {
      'menuContent': {
        templateUrl: 'templates/charts.html',
        controller: 'dashCtrl'
      }
    }
  })

  .state('app.sales', {
    cache: false,
    url: '/sales',
    views: {
      'menuContent': {
        templateUrl: 'templates/sales.html',
        controller : 'salesCtrl'
      }
    }
  })

  .state('app.okezone', {
    cache: false,
      url: '/okezone',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'OkezoneCtrl'
        }
      }
    })

  .state('app.detik', {
    cache: false,
      url: '/detik',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'DetikCtrl'
        }
      }
    })

    .state('app.playlists', {
      cache: false,
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:newsId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.item', {
    cache: false,
    url: '/item',
    views: {
      'menuContent': {
        templateUrl: 'templates/items.html',
        controller: 'ItemCtrl'
      }
    }
  })

  .state('app.welcome', {
    url: '/welcome',
    views: {
      'menuContent': {
        templateUrl: 'templates/welcome.html',
        controller: 'welcomeController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/welcome');
});
