angular.module('productFactory', [])
    .factory('productFactory', function($http) {

    return {
        get: function(file,callback,transform){
            $http.get( file, {transformResponse:transform} ).

                then(function(data, status) {
                    callback(data);
                },function(data,status) {
                	callback('error');
                });

        }
    }
});