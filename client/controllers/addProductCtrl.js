var addProductCtrl = angular.module('addProductCtrl', []);

addProductCtrl.controller('addProductCtrl', function($scope, productService, pictureService){
    var picture = "";
    $scope.message = false;
    $scope.filesToSave = [];
    $scope.scroll = "";
    $scope.name = false;
    $scope.info = false;
    $scope.quant = false;
    $scope.price = false;
    $scope.currency = false;
    $scope.formStatus = false;
    $scope.pictureStatus = false;
    $scope.mainPictureStatus = false;

    /*$scope.$watch('filesToSave.length', function(){
        $scope.imagesFront = $scope.filesToSave;
        console.log("this is images front: " + $scope.imagesFront);
    }, true);*/
    $scope.setMainImage = function(url){
        $scope.activeMenu = url;
        $scope.mainPictureStatus = true;
    }
    $scope.filesChanged = function(elm){
        $scope.files = elm.files;
        angular.forEach($scope.files, function(file){
            var fd = new FormData();
            fd.append('file', file);
            pictureService.saveImage(fd).then(function(file){
                $scope.filesToSave.push(file);

                console.log($scope.filesToSave);
                $scope.checkAll();
                $scope.pictureStatus = true;
            }, function(err){
            })
        })
    }
    $scope.productName = function(){
        $scope.name = true;
        $scope.checkAll();
    }
    $scope.productInfo = function(){
        $scope.info = true;
        $scope.checkAll();
    }
    $scope.productQuant = function(){
        $scope.quant = true;
        $scope.checkAll();
    }
    $scope.productPrice = function(){
        $scope.price = true;
        $scope.checkAll();
    }

    $scope.checkAll = function(){
        if($scope.name === true && $scope.info === true && $scope.quant === true && $scope.price === true &&
        typeof($scope.productForm.name) !== 'undefined' && typeof($scope.productForm.price) !== 'undefined' && typeof($scope.productForm.information) !== 'undefined'
        && typeof($scope.productForm.price) !== 'undefined'){
            $scope.formStatus = true;
            console.log("everything is okay");
        }else{
            $scope.formStatus = false;
        }
    }
    $scope.addProduct = function(event){
        if(typeof($scope.productForm.quant) === 'undefined'){
            $scope.productForm.quant = 0;
        }
        var index = $scope.filesToSave.indexOf($scope.activeMenu);
        if(index > -1){
            $scope.filesToSave.splice(index, 1);
        }
        $scope.filesToSave.unshift($scope.activeMenu);
        productService.addProduct($scope.productForm.name, $scope.productForm.priceMethod, $scope.productForm.currency, $scope.productForm.price, $scope.productForm.information,$scope.productForm.quantity,"none serial", $scope.filesToSave, $scope.activeMenu)
        .then(function(data){
            $scope.productForm = {};
            $scope.filesToSave = [];
            $scope.formStatus = false;
            $scope.mainPictureStatus = false;
            $scope.pictureStatus = false;
            /*$scope.productForm = {};
            $scope.files = {};
            event.currentTarget.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.firstChild.nextSibling.style.border="1px dashed #cccccc";
            event.currentTarget.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.firstChild.nextSibling.style.backgroundImage="none";
            event.currentTarget.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.firstChild.nextSibling.firstChild.nextSibling.style.display="block";*/
            console.log("läks läbi");
        }, function(err){
            //console.log(err);
            $scope.message = true;
            $scope.cbMessage =err;
            $scope.productForm = {};
        })
    }

    $scope.names = ["Price per unit", "Price per kg", "Price per meter"];
})
