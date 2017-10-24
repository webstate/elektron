var allProductsCtrl = angular.module('allProductsCtrl', []);

allProductsCtrl.controller('allProductsCtrl', function($http, $scope, idService, $location, productService){
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
    $scope.onDropComplete = function (index, obj, evt) {
        var otherObj = $scope.products[index];
        var otherIndex = $scope.products.indexOf(obj);
        $scope.products[index] = obj;
        $scope.products[otherIndex] = otherObj;

        for(var i = 0; i < $scope.products.length; i++) {
            var product = $scope.products[i];
            productService.updateOrder(product._id, i);
        }
    }
})
