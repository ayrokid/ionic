// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'highcharts-ng'])

.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {

    // Check for network connection
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
          title: 'No Internet Connection',
          content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
        })
        .then(function(result) {
          if(!result) {
            ionic.Platform.exitApp();
          }
        });
      }
    }
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

  .state('app.dashboard', {
    cache: false,
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
        controller: 'dashCtrl'
      }
    }
  })

  .state('app.confirm-po', {
    cache: false,
    url: '/confirm-po',
    views: {
      'menuContent': {
        templateUrl: 'templates/confirm_po.html',
        controller : 'confirmCtrl'
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

  .state('app.budget', {
    cache: false,
    url: '/budget',
    views: {
      'menuContent': {
        templateUrl: 'templates/budget.html',
        controller : 'budgetCtrl'
      }
    }
  })

  .state('app.edit-budget', {
    cache: false,
    url: '/edit-budget',
    views: {
      'menuContent': {
        templateUrl: 'templates/edit_budget.html',
        controller : 'editBudgetCtrl'
      }
    }
  })

  .state('app.settings', {
    url: '/budget',
    views: {
      'menuContent': {
        templateUrl: 'templates/setting.html',
        controller : 'settingCtrl'
      }
    }
  })

  .state('app.welcome', {
    url: '/welcome',
    views: {
      'menuContent': {
        templateUrl: 'templates/welcome.html',
        controller: 'welcomeCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/welcome');
});
