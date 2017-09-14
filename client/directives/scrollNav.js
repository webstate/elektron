var scrollNav = angular.module('scrollNav', []);

scrollNav.directive('scrollNav', function($window){
    return function(scope, element, attrs){
        angular.element($window).bind('scroll', function(){
            if(this.pageYOffset >= 300){
                scope.scrollBar = true;
            }else{
                scope.scrollBar = false;
            }
            scope.$apply()
        })
    }
})
