// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])

app.controller('listCtrl', function($scope, $ionicHistory){
  
  $scope.notes = [
    {
      title: 'First Note',
      description: 'This is my first note'
    },
    {
      title: 'Second Note',
      description: 'This is my second note'
    }
  ];

  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };

});

app.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
  .state('app', {
    url: '/',
    templateUrl: 'templates/home.html'
  })
  .state('list', {
    url: '/list',
    templateUrl: 'templates/list.html'
  })
  .state('edit', {
    url: '/edit',
    templateUrl: 'templates/edit.html'
  })

  $urlRouterProvider.otherwise('/list');

});

app.run(function($ionicPlatform) {
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
});


