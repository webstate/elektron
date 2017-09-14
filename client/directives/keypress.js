var keyPress = angular.module('keyPress', []);

keyPress.directive('keyPress', function(){
    return{
        restrict: 'A',
        link: function(scope, elm, attrs){
            var test = scope.$eval(attrs.keyPress);
            elm.on('keydown', function(e){
                test(e.which, e);
            })
        }
    }
})
