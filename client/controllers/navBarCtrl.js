var navBarCtrl = angular.module('navBarCtrl', []);

navBarCtrl.controller('navBarCtrl', function($rootScope, $scope, dataService){
    $rootScope.totalSum = 0;
    $rootScope.sidemenu = true;
    $rootScope.sidemenuOverlay = true;
    $scope.toggleSideMenu = function(){
        $rootScope.sidemenu = true;
        $rootScope.sidemenuOverlay = true;
        $scope.testList = dataService.getData();
        for(var i = 0; i <= $scope.testList.length-1; i++){
            $rootScope.totalSum += $scope.testList[i].price * $scope.testList[i].quant;
            console.log($rootScope.totalSum);
        }
    }
});
