var changeProductCtrl = angular.module('changeProductCtrl', []);

changeProductCtrl.controller('changeProductCtrl', function($scope, $rootScope, productService, idService, $location, $timeout){
    var id = idService.getId();
    productService.getProductById(id).then(function(data){
        $scope.name = data.name;
        $scope.price = data.price;
        $scope.information = data.information;
        $scope.quant = data.quantity;
        $scope.currency = data.currency;
    }, function(err){
        console.log(err);
    })
    $scope.saveProduct = function(){
        var name = "";
        var price = "";
        var currency = "";
        var information = "";
        var quant = "";
        if($scope.productForm.name === '{{name}}'){
            name = $scope.name;
        }else{
            name = $scope.productForm.name;
        }
        if($scope.productForm.price === '{{price}}'){
            price = $scope.price;
        }else{
            price = $scope.productForm.price;
        }
        if($scope.productForm.currency === '{{currency}}'){
            currency = $scope.currency;
        }else{
            currency = $scope.productForm.currency;
        }
        if($scope.productForm.information === '{{information}}'){
            information = $scope.information;
        }else{
            information = $scope.productForm.information;
        }
        if($scope.productForm.quantity === '{{quant}}'){
            quant = $scope.quant;
        }else{
            quant = $scope.productForm.quantity;
        }
        productService.updateProduct(id, name, price, currency, information, quant).then(function(data){
            console.log("im here");
            $timeout(function(){
                $location.path('admin/products');
            }, 1000);

        }, function(err){
            console.log(err);
        })
    }

})
