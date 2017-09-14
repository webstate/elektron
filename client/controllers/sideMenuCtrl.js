var sideMenuCtrl = angular.module('sideMenuCtrl', []);


sideMenuCtrl.controller('sideMenuCtrl', function($rootScope, $scope, dataService){

    $scope.totalSum = 0;
    $scope.products = dataService.getData();

    $scope.deleteProduct = function(name){
        dataService.deleteFromList(name);
        $scope.products = dataService.getData();
        for(var i = 0; i <= $scope.products.length; i++){
            $scope.totalSum = 0;
            $scope.totalSum += parseInt($scope.products[i].sum);
        }

    }
    $scope.$watch('products', function(){
        $rootScope.itemsInBag = $scope.products.length;
        $scope.totalSum = 0;
        for(var i = 0; i < $scope.products.length; i++){
            $scope.totalSum += parseInt($scope.products[i].price)*parseInt($scope.products[i].quant);
        }
    }, true);

    $scope.divide = function(name){
        for(var i = 0; i < $scope.products.length; i++){
            if($scope.products[i].name === name){
                if($scope.products[i].quant === 0){
                    break;
                }
                $scope.products[i].quant = $scope.products[i].quant-1;
                //$scope.products[i].sum = $scope.products[i].sum-$scope.products[i].price;
                //$rootScope.totalSum -= $scope.products[i].price;
                break;
            }
        }
    }
    $scope.add = function(name){

        for(var i = 0; i <= $scope.products.length-1; i++){
            if($scope.products[i].name === name){
                $scope.products[i].quant = $scope.products[i].quant+1;
                //$scope.products[i].sum = parseInt($scope.products[i].sum)+parseInt($scope.products[i].price);
                //$rootScope.totalSum += $scope.products[i].price;
                break;
            }
        }
    }
    $scope.emptyBag = function(){
        $scope.empty = [];
        dataService.setData($scope.empty);
        $scope.products = [];
        $scope.totalSum = 0;
    }
    $scope.hide = function(){
        $rootScope.sidemenu = false;
        $rootScope.sidemenuOverlay = false;
    }
})
