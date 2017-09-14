var productElement = angular.module('productElement', []);

productElement.directive('productElement', function(){
    return {
        restrict: 'E',
        scope: {
            name: "=",
        },
        replace: true,

        link: function(scope, element, attrs){
            console.log(scope.name);
            /*element.bind('click', function(event){
                var t = event.target.parentNode.parentNode.parentNode;
                var infoBox = angular.element(t.querySelector('.test'));
                infoBox.html("<div data='{{test}}' style='background-color:white; height: 100px; width: 100%;'></div>");
            })*/
        }
    }
})
