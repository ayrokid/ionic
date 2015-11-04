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

.factory('userService', function($http, $window) {
  var BASE_URL = "http://silvanix.com/api/news";
  var items = [];
  
  return {
    GetFeed: function(){
      return $http.get(BASE_URL+'/1').then(function(response){
        items = response.data.results;
        $window.localStorage['news'] = JSON.stringify(items);
        return items;
      });
    },
    GetNewUsers: function(row){
      //console.log(row);
      return $http.get(BASE_URL+'/'+row).then(function(response){
        items = response.data.results;
        
        return items;
      });
    },
    GetId: function(newsId) {
      return $http.get('').then(function(response){
        items = JSON.parse($window.localStorage['news'] || '{}');
        console.log(items);
        return items;
      });
    }
  }
})

.controller('MainCtrl', function(){
  console.log('Main Controller says: Hello World');
})

.controller('Page2Ctrl', function($scope, $timeout, $window,userService){
  $scope.items = [];
  $scope.limit = 1;

  userService.GetFeed().then(function(items){
    $scope.items = items;
  });

  $scope.loadMore = function() {
    userService.GetNewUsers($scope.limit).then(function(items){
      $scope.items = $scope.items.concat(items);

      $scope.$broadcast('scroll.infiniteScrollComplete');

      $window.localStorage['news'] = JSON.stringify($scope.items);
      $scope.limit += 1;
    });
  };

})

.controller('ReadCtrl', function($scope, $stateParams, $state, $window, userService){
  $scope.items = JSON.parse($window.localStorage['news'] || '{}');
  $scope.news_id = $stateParams.newsId;
  /*userService.GetId($stateParams.newsId).then(function(items){
    $scope.items = items;
  });
*/
  $scope.back = function (){
        $state.go('page2');
  };

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
    })
    .state('read', {
        url: '/read/:newId',
        templateUrl: 'templates/read.html',
        controller: 'ReadCtrl'
    });

    $urlRouterProvider.otherwise('/main');
});
