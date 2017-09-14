var allProductsCtrl = angular.module('allProductsCtrl', []);

allProductsCtrl.controller('allProductsCtrl', function($http, $scope, idService, $location){
    $http.get('products/all').success(function(data){
        //console.log(data);
        $scope.products = data;
    }, function(err){
        //console.log(err);
    })
    $scope.deleteProduct = function(id){
        $http.post('products/delete/' + id)
        .success(function(data){
            $scope.products = data;
        }, function(err){
            //console.log(err);
        })
    }
    $scope.changeProductInformation = function(id){
        idService.setId(id);
        $location.path('/change');
    }
})
