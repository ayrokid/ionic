// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ionicApp', ['ionic', 'ngSanitize'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });
})

.service('userService', function($http, $q) {
  var BASE_URL = "http://silvanix.com/api/news";
  var items = [];
  
  return {
    GetFeed: function(){
      var dfd = $q.defer();
      $http.get(BASE_URL+'/1').then(function(response){
        news = response.data.results;
        console.log(news);
        dfd.resolve(news);
      });
      return dfd.promise;
      /*
      return $http.get(BASE_URL+'/1').then(function(response){
        items = response.data.results;
        //$window.localStorage['news'] = JSON.stringify(items);
        return items;
      });
*/
    },
    GetNewUsers: function(row){
      var dfd = $q.defer();
      $http.get(BASE_URL+'/'+row).then(function(response){
        news = response.data.results;
        console.log(news);
        dfd.resolve(news);
      });
      return dfd.promise;
      /*
      //console.log(row);
      return $http.get(BASE_URL+'/'+row).then(function(response){
        items = response.data.results;
        
        return items;
      });
      */
    },
    GetId: function(newsId) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === parseInt(newsId)) {
          return items[i];
        }
      }
      return null;
      /*
      return $http.get('http://silvanix.com/api/news-detail/'+newsId).then(function(response){
        items = response.data.results;
        return items;
      });
      */
    }
  }
})

.controller('MainCtrl', function(){
  //console.log('Main Controller says: Hello World');
})

.controller('newsCtrl', function($scope, $state, userService){
  $scope.items = [];
  $scope.limit = 1;

  userService.GetFeed().then(function(items){
    $scope.items = items;
  });

  $scope.loadMore = function() {
    userService.GetNewUsers($scope.limit).then(function(items){
      $scope.items = $scope.items.concat(items);

      $scope.$broadcast('scroll.infiniteScrollComplete');

      //$window.localStorage['news'] = JSON.stringify($scope.items);
      $scope.limit += 1;
    });
  };

   $scope.back = function (){
        $state.go('main');
  };

})

.controller('ReadCtrl', function($scope, $stateParams, $state, userService){
  $scope.items = [];
  $scope.news_id = $stateParams.newsId;
  userService.GetId($stateParams.newsId).then(function(items){
    $scope.items = items;
  });

  $scope.back = function (){
        $state.go('news');
  };

})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('main', {
        url: '/main',
        templateUrl: 'templates/main.html',
        controller: 'MainCtrl'
    })
    .state('news', {
        url: '/news',
        templateUrl: 'templates/news.html',
        controller: 'newsCtrl',
        resolve: {
          allnews: function(userService) {
            return userService.GetFeed(); 
          }
        }
    })
    .state('read', {
        url: '/read/:newsId',
        templateUrl: 'templates/read.html',
        controller: 'ReadCtrl'
    });

    $urlRouterProvider.otherwise('/news');
});
