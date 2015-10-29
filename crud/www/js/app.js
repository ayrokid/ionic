// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        controller: 'tabCtrl',
        templateUrl: 'templates/tab.html'
      })
      .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })
    .state('tab.teman', {
      url: '/teman',
      views: {
        'tab-teman': {
          templateUrl: 'templates/dataTeman.html',
          controller: 'dataTemanCtrl'
        }
      }
    })
    .state('tab.teman-detail', {
        url: '/teman/:temanId',
        views: {
          'tab-teman': {
            templateUrl: 'templates/temanDetail.html',
            controller: 'temanDetailCtrl'
          }
        }
      })
    .state('tab.tambah', {
      url: '/tambah',
      views: {
        'tab-tambah': {
          templateUrl: 'templates/tambahTeman.html',
          controller: 'tambahTemanCtrl'
        }
      }
    });
    $urlRouterProvider.otherwise('/tab/home');
})


.directive("initFromForm", function ($parse) {
    return {
        link: function (scope, element, attrs) {
            var attr = attrs.initFromForm || attrs.ngModel || element.attrs('name'),
            val = attrs.value;
            $parse(attr).assign(scope, val);
        }
    };
})