var addInfo = angular.module('addInfo', []);

addInfo.controller('addInfo', function($scope, contactInfoService){
    $scope.createContactInfo = function(){
        console.log($scope.infoForm.info);
        contactInfoService.createContactInfo($scope.infoForm.info).then(function(data){
            //console.log(data);
        }, function(err){
            //console.log(err);
        })
    }
})
