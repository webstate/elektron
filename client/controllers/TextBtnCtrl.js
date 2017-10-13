var TextBtnCtrl = angular.module('TextBtnCtrl', []);

TextBtnCtrl.controller('TextBtnCtrl', function($scope, contactInfoService){
    $scope.disabled = true;
    contactInfoService.getContactInfo().then(function(data){
        console.dir(data);
        $scope.htmlVariable = data.info;
    })
    contactInfoService.getFooterInfo().then(function(data){
        console.dir(data);
        $scope.footerVariable = data.info;
    })
    $scope.updateTest = function(){
        $scope.disabled= true;
        console.log($scope.htmlVariable);
        contactInfoService.updateContactInfo($scope.htmlVariable, $scope.footerVariable).then(function(data){
            console.log(data);
        }, function(err){
            console.log(err);
        })
    }
})
