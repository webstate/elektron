var billingCtrl = angular.module('billingCtrl', []);

billingCtrl.controller('billingCtrl', function($scope, dataService, mailService){
    $scope.completeOverlay = false;
    $scope.checkBox = {
        value: false
    };
    $scope.totalSum = 0;
    $scope.subTotal = 0;
    $scope.products = [];
    $scope.products = dataService.getData();
    $scope.terms = false;
    if($scope.products.length === 0){
        $scope.totalSum = 0;
        $scope.subTotal = 0;
        $scope.tax = 0;
    }else{
        for(i = 0; i < $scope.products.length; i++){
            console.log($scope.products);
            console.log("this is the price: " + $scope.products[i].price);
            $scope.subTotal += parseInt($scope.products[i].price)*parseInt($scope.products[i].quant);
        }
        $scope.totalSum = $scope.subTotal + ($scope.subTotal*0.2);
        $scope.tax = $scope.subTotal*0.2
    }
    $scope.sendBilling = function(){
        $scope.firstNameError = false;
        $scope.lastNameError = false;
        $scope.streetError = false;
        $scope.emailError = false;
        $scope.phoneError = false;
        $scope.checkError = false;
        $scope.apartmentError = false;
        $scope.townError = false;
        $scope.zipError = false;

        if(typeof($scope.firstName) === 'undefined'){
            $scope.firstNameError = true;
        }
        if(typeof($scope.lastName) === 'undefined'){
            $scope.lastNameError = true;
        }
        if(typeof($scope.street) === 'undefined'){
            $scope.streetError = true;
        }
        if(typeof($scope.emailBilling) === 'undefined'){
            $scope.emailError = true;
        }
        if(typeof($scope.phone) === 'undefined'){
            $scope.phoneError = true;
        }
        if(typeof($scope.apartment) === 'undefined'){
            $scope.apartmentError = true;
        }
        if(typeof($scope.town) === 'undefined'){
            $scope.townError = true;
        }
        if(typeof($scope.zip) === 'undefined'){
            $scope.zipError = true;
        }
        else{
            if(typeof($scope.state) === 'undefined'){
                $scope.state = "ei määratud";
            }
            if(typeof($scope.notes) === 'undefined'){
                $scope.notes = "ei määratud";
            }
            if(typeof($scope.notes) === 'undefined'){
                $scope.company = "ei määratud";
            }
            if(typeof($scope.vatNumber) === 'undefined'){
                $scope.vatNumber = "ei määratud";
            }
            mailService.placeOrder($scope.firstName, $scope.lastName, $scope.company,
            $scope.street, $scope.apartment, $scope.town, $scope.state, $scope.zip, $scope.emailBilling,
            $scope.phone, $scope.notes, $scope.products, $scope.vatNumber).then(function(data){
                $scope.firstName = "";
                $scope.lastName = "";
                $scope.company = "";
                $scope.street = "";
                $scope.apartment = "";
                $scope.town = "";
                $scope.state = "";
                $scope.zip = "";
                $scope.emailBilling = "";
                $scope.phone = "";
                $scope.notes = "";
                $scope.vatNumber = "";
                $scope.products = [];

                dataService.setData($scope.products);

                $scope.completeOverlay = true;
                console.log(data);
                $scope.orderNumb = data.number;
            })
        }

    }


})
