var premierController = angular.module('premierController', []);

premierController.controller('premierController', function($scope, productService, $rootScope, dataService, mailService){
    $rootScope.count = 0;
    $scope.requestOverlay = false;
    $scope.askForMoreOverlay = false;
    $rootScope.request = false;
    $rootScope.askForMore = false;
    $scope.arrowLeftShow = false;
    $scope.arrowRightShow = false;
    $scope.imageViewOverlay = false;
    $scope.num;
    var index = 0;
    var secondClick = false;
    var holder;
    $scope.counter = {
        value: 1,
    }
    $scope.productDetail = true;
    var element = angular.element(document.querySelector('.overlay--product'));
    productService.getProducts().then(function(data){
        $scope.products = data;
        //console.log(data);
        var chunk = function(arr, size){
            var newArr = [];
            for(var i = 0; i < arr.length; i += size){
                newArr.push(arr.slice(i, i+size));
            }
            return newArr;
        }
        $scope.array = chunk(data, 4);
        $scope.arrayLittle = chunk(data, 2);
        $scope.smallest = chunk(data, 1);

    }, function(error){
        //console.log(error);
    });

    productService.getProducts().then(function(data){
        $scope.data = data;
    }, function(err){
        //console.log(err);
    })
    $scope.bigForward = function(){
        $scope.picViewUrl = $scope.pictureCarousel[index >= $scope.pictureCarousel.length - 1 ? index = 0 : ++index];
    }
    $scope.bigBack = function(element){
        var testIndex = $scope.pictureCarousel.indexOf(element);
        var nextImage = (testIndex-1 + $scope.pictureCarousel.length) % $scope.pictureCarousel.length;
        $scope.picViewUrl = $scope.pictureCarousel[nextImage];
    }
    $scope.moveForward = function(element){

        //$scope.mainUrl = $scope.pictureCarousel[index >= $scope.pictureCarousel.length - 1 ? index = 0 : ++index];

        var testIndex = $scope.pictureCarousel.indexOf(element);
        // var nextImage = (testIndex-1 + $scope.pictureCarousel.length) % $scope.pictureCarousel.length;
        var nextImage = testIndex + 1;
        if (nextImage >= $scope.pictureCarousel.length) {
            nextImage = 0;
        }
        $scope.mainUrl = $scope.pictureCarousel[nextImage];




        //$scope.mainUrl = $scope.pictureCarousel[index++%$scope.pictureCarousel.length]
        /*if(index != $scope.pictureCarousel.length-1){
            $scope.mainUrl = $scope.pictureCarousel[index];
            index++;
            secondClick = false;
        }else{
            index = $scope.pictureCarousel.length-1;
            $scope.mainUrl = $scope.pictureCarousel[index];
        }*/
    }
    $scope.moveBack = function(element){
        var testIndex = $scope.pictureCarousel.indexOf(element);
        // var nextImage = (testIndex-1 + $scope.pictureCarousel.length) % $scope.pictureCarousel.length;
        var nextImage = testIndex - 1;
        if (nextImage < 0) {
            nextImage = $scope.pictureCarousel.length - 1;
        }
        $scope.mainUrl = $scope.pictureCarousel[nextImage];
        //$scope.mainUrl = $scope.pictureCarousel[index + $scope.pictureCarousel.length - 1 ? index = 0 : --index];
        //$scope.mainUrl = $scope.pictureCarousel[index--%$scope.pictureCarousel.length]
        /*if(index == 0 && secondClick === false){
            console.log("index is 0 and no second click");
            $scope.mainUrl = $scope.pictureCarousel[0];
            secondClick = true;
        }
        else if(index == 0 && secondClick === true){
            console.log("index is 0 and yes second click");
            $scope.mainUrl = holder;
            secondClick = false;
        }else{
            console.log("regular");
            index--;
            $scope.mainUrl = $scope.pictureCarousel[index];
        }*/
    }
    $scope.showArrowLeft = function(){
        $scope.arrowLeftShow = true;
    }
    $scope.hideArrowLeft = function(){
        $scope.arrowLeftShow = false;
    }
    $scope.showArrowRight = function(){
        $scope.arrowRightShow = true;
    }
    $scope.hideArrowRight = function(){
        $scope.arrowRightShow = false;
    }
    $scope.hoverIn = function(){
        this.overlay = true;
    }
    $scope.hoverLeave = function(){
        this.overlay = false;
    }
    $scope.showRequest = function(item){
        $scope.requestOverlay = true;
        $rootScope.request = true;
        $rootScope.requestItem = item;
    }
    $scope.closeRequest = function(){
        $scope.requestOverlay = false;
        $rootScope.request = false;
    }

    $scope.askForMore = function(){
        $rootScope.askForMore = true;
        $scope.askForMoreOverlay = true;
    }
    $scope.closeAskForMore = function(){
        $rootScope.askForMore = false;
        $scope.askForMoreOverlay = false;
    }

    $scope.sendRequestBig = function(){
        mailService.placeStockRequest($rootScope.requestEmailBig, $rootScope.requestItem).then(function(data){
            $scope.requestOverlay = false;
            $rootScope.requestEmailBig = "";
        })

    }
    $scope.sendRequestMedium = function(){
        mailService.placeStockRequest($rootScope.requestEmailMedium, $rootScope.requestItem).then(function(data){
            $scope.requestOverlay = false;
            $rootScope.requestEmailMedium = "";
        })

    }
    $scope.sendRequestSmall = function(){
        mailService.placeStockRequest($rootScope.requestEmailSmall, $rootScope.requestItem).then(function(data){
            $scope.requestOverlay = false;
            $rootScope.requestEmailSmall = "";
        })

    }
    $scope.openBigImageView = function(imageUrl){
        $scope.imageViewOverlay = true;
        $scope.picViewUrl = imageUrl;
    }
    $scope.closeImageView = function(){
        $scope.imageViewOverlay = false;
    }
    $scope.validateClick = function(id){
        console.log("clicked");
        productService.getProductById(id).then(function(data){
            $scope.title = data.name;
            $scope.info = data.information;
            $scope.price = data.price;
            $scope.priceMethod = data.priceMethod;
            $scope.currency = data.currency;
            $scope.url = data.picture;
            $scope.sumprice = data.price;
            $scope.quant = data.quantity;
            $scope.minOrderQuant = isNaN(data.minOrderQuantity) ? null : data.minOrderQuantity;
            $scope.mainUrl = data.picture[0];
            holder = data.mainImage;
            $scope.pictureCarousel = data.picture;
        }, function(err){
        })
    }
    $scope.changeShow = function(index){
        $scope.num = index;
        $scope.counter.value = 1;
    }

    $scope.testRootScope = function(){
        var test = dataService.getData();
        var dataToBasket = {};
        if(test.length === 0){
            dataToBasket.name = $scope.title;
            dataToBasket.sum = $scope.sumprice;
            dataToBasket.pic = $scope.url;
            dataToBasket.currency = $scope.currency;
            dataToBasket.quant = $scope.counter.value;
            dataToBasket.price = parseFloat($scope.price.replace(",", "."));

            dataService.setData(dataToBasket);
            $scope.counter.value = 1;
            $scope.sumprice = parseInt($scope.price);
        }else{
            if($scope.search(test, $scope.title) === true){
                dataToBasket.name = $scope.title;
                dataToBasket.sum = $scope.sumprice;
                dataToBasket.pic = $scope.url;
                dataToBasket.currency = $scope.currency;
                dataToBasket.quant = $scope.counter.value + $scope.doubleCounter;
                dataToBasket.price = parseFloat($scope.price.replace(",", "."));

                dataService.setData(dataToBasket);
                $scope.counter.value = 1;
                $scope.sumprice = parseInt($scope.price);
            }else{
                dataToBasket.name = $scope.title;
                dataToBasket.sum = $scope.sumprice;
                dataToBasket.pic = $scope.url;
                dataToBasket.currency = $scope.currency;
                dataToBasket.quant = $scope.counter.value;
                dataToBasket.price = parseFloat($scope.price.replace(",", "."));

                dataService.setData(dataToBasket);
                $scope.counter.value = 1;
                $scope.sumprice = parseInt($scope.price);
            }
        }

    }
    $scope.counterDivide = function(){
        if($scope.counter.value <= 0){
            $scope.counter.value = 0;
        }else{
            $scope.counter.value = $scope.counter.value - 1;
        }

        $scope.calc();



    }
    $scope.search = function(array, proov){
        $scope.doubleCounter = 0;
        for(i = 0; i <= array.length-1;i++){
            console.log(i);
            if(array[i].name === proov){
                //console.log("arrayst nimi: " +array[i].name);
                $scope.doubleCounter = array[i].quant;
                return true;
            }
            else if(i === array.length-1){
                return false;
            }
        }
    }
    $scope.counterAdd = function(){
        $scope.counter.value = $scope.counter.value + 1;
        $scope.calc();
    }
    $scope.closeModal = function(){
        $scope.num = -1;
    }

    $scope.askForMoreMedium = function(name){
        mailService.askForMore($scope.title,$rootScope.askForMoreNameMedium,$rootScope.askForMoreEmailMedium, $rootScope.askForMoreQuestionMedium).then(function(data){
            $rootScope.askForMoreNameMedium = "";
            $rootScope.askForMoreEmailMedium = "";
            $rootScope.askForMoreQuestionMedium = "";
            $rootScope.askForMore = false;
            $scope.askForMoreOverlay = false;

        })
    }
    $scope.askForMoreSmall = function(item){
        mailService.askForMore($scope.title,$rootScope.askForMoreNameSmall,$rootScope.askForMoreEmailSmall, $rootScope.askForMoreQuestionSmall).then(function(data){
            $rootScope.askForMoreNameSmall = "";
            $rootScope.askForMoreEmailSmall = "";
            $rootScope.askForMoreQuestionSmall = "";
            $rootScope.askForMore = false;
            $scope.askForMoreOverlay = false;
        })
    }
    $scope.isNaN = function(number){
        return isNaN(number);
    }
    $scope.focus = function() {
        $rootScope.quantity = true;
    }
    $scope.blur = function() {
        $rootScope.quantity = false;
    }
    $scope.calc = function() {
        if (isNaN(parseInt($scope.counter.value))) {
            $scope.sumprice = 0;
        } else {
            $scope.sumprice = (parseFloat($scope.price.replace(",", ".")) * parseInt($scope.counter.value)).toFixed(2);
        }
    }
})
