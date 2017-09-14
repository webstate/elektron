var tweetbutton = angular.module('tweetbutton', []);

tweetbutton.directive('tweetbutton', function($compile, $timeout){
    return{
        scope: {
            title: "@title",
            info : "@info",
            price: "@price",
            sumprice: "@sumprice",
            url: "@url"

        },
        templateUrl: 'partials/test.html',
        controller: function($scope, $timeout, $rootScope, dataService){
            $scope.requestOverlay = false;
            $scope.counter = {
                value: 1,
            }
            $scope.showRequest = function(){
                $scope.requestOverlay = true;
            }
            $scope.closeRequest = function(){
                $scope.requestOverlay = false;
            }
            $scope.testRootScope = function(){
                var test = dataService.getData();
                var dataToBasket = {};
                if(test.length === 0){
                    dataToBasket.name = $scope.title;
                    dataToBasket.sum = parseInt($scope.sumprice);
                    dataToBasket.pic = $scope.url;
                    dataToBasket.quant = $scope.counter.value;
                    dataToBasket.price = parseInt($scope.price);

                    dataService.setData(dataToBasket);
                    $scope.counter.value = 1;
                    $scope.sumprice = parseInt($scope.price);
                }else{
                    if($scope.search(test, $scope.title) === true){
                        dataToBasket.name = $scope.title;
                        dataToBasket.sum = parseInt($scope.sumprice);
                        dataToBasket.pic = $scope.url;
                        dataToBasket.quant = $scope.counter.value + $scope.doubleCounter;
                        dataToBasket.price = parseInt($scope.price);

                        dataService.setData(dataToBasket);
                        $scope.counter.value = 1;
                        $scope.sumprice = parseInt($scope.price);
                    }else{
                        dataToBasket.name = $scope.title;
                        dataToBasket.sum = parseInt($scope.sumprice);
                        dataToBasket.pic = $scope.url;
                        dataToBasket.quant = $scope.counter.value;
                        dataToBasket.price = parseInt($scope.price);

                        dataService.setData(dataToBasket);
                        $scope.counter.value = 1;
                        $scope.sumprice = parseInt($scope.price);
                    }
                }

            }
            $scope.counterDivide = function(){
                if($scope.counter.value <= 0){
                    $scope.counter.value = 0;
                    $scope.sumprice = 0;
                }else{
                    $scope.counter.value = $scope.counter.value - 1;
                    $scope.sumprice = parseInt($scope.sumprice) - parseInt($scope.price);
                }



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
                $scope.sumprice = parseInt($scope.sumprice) + parseInt($scope.price);
            }



        },
        link: function(scope, element, attrs){
            $timeout(function(){
                angular.element(angular.element(angular.element(element).parent().find('li')).find('a')).bind('click', function(){
                    var result = document.getElementsByClassName("bonkers");
                    angular.forEach(result, function(result){
                        angular.element(result).addClass("bonkers");
                    })
                    angular.element(angular.element(this).parent().parent().parent().parent()).find('.bonkers').removeClass("bonkers");

                    if(element.hasClass("bonkers")){
                        element.removeClass("bonkers");
                    }
                })
            }, 500);
            angular.element(angular.element.find('.close--information')).bind('click', function(event){
                angular.element(angular.element(event.target).parent().parent().parent().parent()).addClass("bonkers");
                var result = document.getElementsByClassName("bonkers");
                console.log(event.target);
            });
        }
    }
});
