var sideMenuOverlayCtrl = angular.module('sideMenuOverlayCtrl', []);

sideMenuOverlayCtrl.controller('sideMenuOverlayCtrl', function($rootScope, $scope){
    $rootScope.sidemenu = false;
    $rootScope.sidemenuOverlay = false;
    $scope.hideOverlay = function(){
        $rootScope.sidemenu = false;
        $rootScope.sidemenuOverlay = false;
    }
})
