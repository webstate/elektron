var button = angular.module('button', []);

button.directive('button', function(){
    return{
        restrict: 'A',
        link: function(scope, element){
            element.bind('click', function(e){
                
            })
        }
    }
})
