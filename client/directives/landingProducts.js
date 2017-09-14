var landingProducts = angular.module('landingProducts', []);

landingProducts.directive('landingProducts', function(){
    return{
        restrict: 'AEC',
        transclude: false,
        templateUrl: 'partials/products-landing.html',
        scope:  {
            products: '='
        },
        link: function(scope, element, attrs){
            var li = element.find('li');
            console.log(element.find('li'));
        }
    }
})
