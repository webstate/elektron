var allProductsCtrl = angular.module('allProductsCtrl', []);

allProductsCtrl.controller('allProductsCtrl', function($http, $scope, idService, $location){
    $http.get('products/all').success(function(data){
        //console.log(data);
        $scope.products = data;
        for(var i = 0; i < $scope.products.length; i++) {
            $scope.products[i].quantityStr = isNaN($scope.products[i].quantity) ? 'Unlimited' : $scope.products[i].quantity;
        }
        $scope.quantity = data.quantity;
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
