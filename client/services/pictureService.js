var pictureService = angular.module('pictureService', []);

pictureService.factory('pictureService', function($q, $timeout, $http){
    function saveImage(fd){
        var d = $q.defer();
        $http.post('products/product/picture', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).success(function(data){
            d.resolve(data);

        }).error(function(err){
            d.reject(err);
        })
        return d.promise;
    }
    return({
        saveImage:saveImage
    })
})
