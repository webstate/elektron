var landingContactCtrl = angular.module('landingContactCtrl', []);

landingContactCtrl.controller('landingContactCtrl', function($scope, contactInfoService, $sce, $rootScope, mailService){

    $rootScope.message = false;
    $rootScope.subject = false;
    $rootScope.email = false;
    $rootScope.name = false;

    contactInfoService.getContactInfo().then(function(data){
        $scope.info = $sce.trustAsHtml(data.info);
    }, function(err){
        console.log(err);
    })
    $scope.blur = function(item){
        if(item ==='name'){

            $rootScope.name = false;
        }
        else if(item ==='email'){

            $rootScope.email = false;
        }
        else if(item === 'subject'){

            $rootScope.subject = false;
        }
        else if(item === 'message'){

            $rootScope.message = false;
        }
    }
    $scope.focused = function(item){
        if(item ==='name'){
            console.log("name is focused");
            $rootScope.name = true;
        }
        else if(item ==='email'){
            console.log("email is focused");
            $rootScope.email = true;
        }
        else if(item === 'subject'){
            console.log("subject is focused");
            $rootScope.subject = true;
        }
        else if(item === 'message'){
            console.log("message is focused");
            $rootScope.message = true;
        }
    }
    $scope.sendEmail = function(){
        mailService.sendFeedBack($scope.sendEmailForm.name, $scope.sendEmailForm.email, $scope.sendEmailForm.subject, $scope.sendEmailForm.message).then(function(data){
            console.log(data);
            $scope.sendEmailForm = {};
        })
    }
});
