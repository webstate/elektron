var testtest = angular.module('testtest', []);

testtest.directive('testtest', function($http, $compile){
    return{

        restrict: 'AEC',
        scope: {
            value: "="
        },
        link: function(scope, elem, attrs){
            var value = scope.value;

            elem.bind('click', function(e){

                var row = angular.element(e.target).parent().parent().parent().parent();
                $http({method: 'GET', url:'products/product/' + e.target.id})
                .success(function(data){
                    scope.value.push(data);
                    console.log(value[0]);
                    var infoBar = $compile('<div>'+
                    '<div scroll-bookmark="info" class="product-picture--info" style="background-image:url('+ value[0].picture +')"><div ng-click="test($event)" class="product-info-exit"></div></div>' +
                    '</div>')(scope);
                    row.after(infoBar);
                    console.log(angular.element(elem).parent());

                    scope.test = function(e){
                        var random = angular.element(e.currentTarget).parent();
                        angular.element(random[0]).parent().html('');
                    }

                }).error(function(err){
                    
                })
            });
        }
    }
})
