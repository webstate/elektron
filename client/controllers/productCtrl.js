var productCtrl = angular.module('productCtrl', []);


productCtrl.controller('productCtrl', function($scope, productService, contactInfoService){

    var vm = this;
    vm.name = "oskar";

    contactInfoService.getFooterInfo().then(function(data) {
        $scope.footer = data.info;
    });

    $scope.testAndmed= [];
    $scope.productDetail = true;
    var element = angular.element(document.querySelector('.overlay--product'));
    productService.getProducts().then(function(data){
        $scope.products = data;
        var chunk = function(arr, size){
            var newArr = [];
            for(var i = 0; i < arr.length; i += size){
                newArr.push(arr.slice(i, i+size));
            }
            return newArr;
        }
        $scope.array = chunk(data, 4);
        //console.log($scope.array);

    }, function(error){
        console.log(error);
    });
    $scope.hoverIn = function(){
        this.overlay = true;
    }
    $scope.hoverLeave = function(){
        this.overlay = false;
    }
    $scope.iwasclicked = function(event){
        productService.getProductById(event).then(function(data){
            //console.log(data);
            $scope.test = data;
        }, function(err){
            console.log(err);
        })

    }
});
