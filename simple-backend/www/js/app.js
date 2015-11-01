// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ionicApp', ['ionic'])

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

.factory('userService', function($http) {
  return {
    getUsers: function(){
      return $http.get('https://randomuser.me/api/?results=10').then(function(response){
        return response.data.results;
      });
    }
  }
})

.controller('MainCtrl', function(){
  console.log('Main Controller says: Hello World');
})

.controller('Page2Ctrl', function($scope, userService){
  userService.getUsers().then(function(users) {
      $scope.users = users;
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('main', {
        url: '/main',
        templateUrl: 'templates/main.html',
        controller: 'MainCtrl'
    })
    .state('page2', {
        url: '/page2',
        templateUrl: 'templates/page2.html',
        controller: 'Page2Ctrl'
    });

    $urlRouterProvider.otherwise('/main');
});
