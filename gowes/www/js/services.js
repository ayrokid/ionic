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

.factory('LoginService', function($q, $http){
  if (window.localStorage['profile']) {
      var _user = JSON.parse(window.localStorage['profile']);
   }
   var setUser = function (session) {
      _user = session;
      window.localStorage['profile'] = JSON.stringify(_user);
   }
  return {
    loginUser: function(data) {
      var deffered = $q.defer();
      var promise  = deffered.promise;
      var link = 'http://localhost/development/pos/api/auth';

      return $http.post(link,data,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
      /*
      if (email == 'user@gmail.com' && pass == 'secret') {
        deffered.resolve("Welcome " + email + '!');
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
      */
    },
    setUser: function(){
      _user = true;
    },
    isLoggedIn: function () {
       return _user ? true : false;
    },
    getUser: function () {
       return _user;
    },
    logout: function () {
       window.localStorage.removeItem("profile");
       //window.localStorage.removeItem("profile");
       _user = null;
    }
  }
})
.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://silvanix.firebaseio.com/items");
  return $firebaseArray(itemsRef);
})