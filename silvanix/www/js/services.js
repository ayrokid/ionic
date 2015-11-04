angular.module('starter.services', [])

.factory('newsServices', function($http) {
    var baseUrl = 'http://silvanix.com/api/';
    return {
        getAll: function() {
            return $http.get(baseUrl+'news/1');
        },
        getId: function (temanId){
            //return $http.get(baseUrl+'select_id.php?id='+temanId); 
            for (var i = 0; i < playlists.length; i++) {
                if (playlists[i].id === parseInt(newsId)) {
                  return playlists[i];
                }
            }
            return null;
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
    
});
