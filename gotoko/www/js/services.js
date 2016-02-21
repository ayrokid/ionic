angular.module('starter.services', [])

.service('LoginService', function($q, $http){
    if (window.localStorage['profile']) {
        var _user = JSON.parse(window.localStorage['profile']);
    }

    var setUser = function (session) {
        _user = session;
        window.localStorage['profile'] = JSON.stringify(_user);
    }

    return {
        loginUser: function(data) {
            var link = 'http://pos.gotoko.id/api_v2/user/login';
            return $http.post(link,data,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },

        setUser: function(){
            _user = JSON.parse(window.localStorage['profile']);
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
        },

        changePassword: function(data) {
            var link = 'http://pos.gotoko.id/api_v2/user/change_password';

            return $http.post(link,data,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        }
    }
})