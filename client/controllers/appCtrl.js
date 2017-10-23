var appCtrl = angular.module('appCtrl', []);

appCtrl.controller('appCtrl', function($scope, $state, $document, productService, $rootScope){
    $rootScope.itemsInBag = 0;
    $scope.keywords = '';
    var boom = [];
    $scope.searchInput = "";
    $scope.close = function(){
        $scope.showBoom = false;
        $document[0].body.className = "";
        $scope.searchInput = "";
    }
    productService.getProducts().then(function(data){
        $scope.products = data;

        var keywords = [];
        for (var i=0; i<data.length; i++) {
            keywords = keywords.concat(data[i].keyword.split(","));
        }

        $scope.keywords = keywords.join(',');

        var chunk = function(arr, size){
            var newArr = [];
            for(var i = 0; i < arr.length; i += size){
                newArr.push(arr.slice(i, i+size));
            }
            return newArr;
        }
        $scope.array = chunk(data, 4);

    }, function(error){
        //console.log(error);
    });
    $scope.openSearch = function(){
        $scope.showBoom = true;
    }
    productService.getProducts().then(function(data){
        $scope.data = data;
    }, function(err){
        console.log(err);
    })
    $scope.validateClick = function(id){
        productService.getProductById(id).then(function(data){
            //console.log(data);
            $scope.title = data.name;
            $scope.info = data.information;
            $scope.price = data.price;
            $scope.url = data.picture;
            $scope.sumprice = data.price;
        }, function(err){
            //console.log(err);
        })
    }
    $scope.test = function(keycode, e){
        if($state.current.name ==='landing' && !$rootScope.name && !$rootScope.email && !$rootScope.subject && !$rootScope.message && !$rootScope.request && !$rootScope.askForMore && !$rootScope.quantity){
            e.preventDefault();
            $document[0].body.className = "no-scroll";
            if(keycode === 8){
                $scope.searchInput = $scope.searchInput.slice(0, -1);
            }else if(keycode === 9 || keycode === 13 || keycode === 16 || keycode === 17 || keycode === 18
            || keycode === 19 || keycode === 20 || keycode === 33 || keycode === 34 || keycode === 35
            || keycode === 36 || keycode === 37 || keycode === 38 || keycode === 39 || keycode === 40 || keycode === 45 || keycode === 46){
                $scope.showBoom = false;
            }else if( keycode === 27){
                $scope.showBoom = false;
            }
            else{
                $scope.searchInput += String.fromCharCode(keycode).toLowerCase();
            }
            $scope.showBoom = true;
            $scope.$apply();
        }
    }
})
