var changeProductCtrl = angular.module('changeProductCtrl', []);

changeProductCtrl.controller('changeProductCtrl', function($scope, $rootScope, productService, idService, $location, $timeout, pictureService){
    var id = idService.getId();
    productService.getProductById(id).then(function(data){
        $scope.name = data.name;
        $scope.price = data.price;
        $scope.information = data.information;
        $scope.quant = isNaN(data.quantity) ? '' : data.quantity;
        $scope.currency = data.currency;
        $scope.productForm.information = data.information;
        $scope.pictureCarousel = data.picture;
        $scope.activeMenu = data.mainImage;
        $scope.keyword = data.keyword;
    }, function(err){
        console.log(err);
    })
    $scope.saveProduct = function(){
        var name = "";
        var price = "";
        var currency = "";
        var information = "";
        var quant = "";
        var keyword = "";
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
        if($scope.productForm.keyword === '{{keyword}}'){
            keyword = $scope.keyword;
        }else{
            keyword = $scope.productForm.keyword;
        }

        var index = $scope.pictureCarousel.indexOf($scope.activeMenu);
        if(index > -1){
            $scope.pictureCarousel.splice(index, 1);
        }
        $scope.pictureCarousel.unshift($scope.activeMenu);


        productService.updateProduct(id, name, price, currency, information, quant, $scope.pictureCarousel, $scope.activeMenu, keyword).then(function(data){
            console.log("im here");
            $timeout(function(){
                $location.path('admin/products');
            }, 1000);

        }, function(err){
            console.log(err);
        })
    }
    $scope.trixInitialize = function(e, editor){
        editor.setSelectedRange([0, 0]);
        editor.insertHTML($scope.productForm);
    }
    $scope.setMainImage = function(url, event){

        if (event.target.classList.contains('close')) {
            return;
        }

        console.dir(event);

        $scope.activeMenu = url;
        $scope.mainPictureStatus = true;
    }
    $scope.filesChanged = function(elm){
        $scope.files = elm.files;
        angular.forEach($scope.files, function(file){
            var fd = new FormData();
            fd.append('file', file);
            pictureService.saveImage(fd).then(function(file){
                $scope.pictureCarousel.push(file);
                $scope.pictureStatus = true;
            }, function(err){
            })
        })
    }
    $scope.deleteImage = function(image) {
        var index = $scope.pictureCarousel.indexOf(image);
        if (index > -1) {
            $scope.pictureCarousel.splice(index, 1);
        }
    }
})
