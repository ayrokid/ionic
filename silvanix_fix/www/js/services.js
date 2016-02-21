angular.module('starter.services', [])

.factory('newsServices', function($http) {
    var baseUrl = 'http://silvanix.com/api/';
    return {
        getAll: function(page) {
            return $http.get(baseUrl+'news/'+page);
        },
        getDetik: function(page) {
            return $http.get(baseUrl+'detik/'+page);
        },
        getOkezone: function(page) {
            return $http.get(baseUrl+'okezone/'+page);
        },
        getId: function (newsId){
            return $http.get(baseUrl+'news-detail/'+newsId);
        },
        create: function (datateman){
            return $http.post(baseUrl+'insert.php',datateman,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        update: function (datateman){
            return $http.post(baseUrl+'update.php',datateman,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        delete: function  (id){
            return $http.get(baseUrl+'delete.php?id='+id);
        }
    };

})

.service('LoginService', function($q){
  return {
    loginUser: function(name, pass) {
      var deffered = $q.defer();
      var promise  = deffered.promise;

      if (name == 'user' && pass == 'secret') {
        deffered.resolve("Welcome " + name + '!');
      } else {
        deffered.reject('Wrong credentials.');
      }
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }

      return promise;
    }
  }
})
.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://silvanix.firebaseio.com/items");
  return $firebaseArray(itemsRef);
})