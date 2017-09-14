var mailService = angular.module('mailService', []);

mailService.factory('mailService', function($q, $timeout, $http){
    return{
        sendFeedBack: sendFeedBack,
        placeOrder: placeOrder,
        placeStockRequest: placeStockRequest,
        askForMore: askForMore
    }
    function sendFeedBack(name, email, subject, message){
        var d = $q.defer();
        $http.post('mail/contact', {name:name, email:email, subject:subject, message:message})
        .success(function(data){
            d.resolve(data);
        }).error(function(err){
            d.reject(err);
        })
        return d.promise;
    }

    function placeStockRequest(email, item){
        var d = $q.defer();
        $http.post('mail/stock', {
            email:email,
            item:item,
        })
        .success(function(data){
            d.resolve(data);
        }).error(function(err){
            d.reject(err);
        })
        return d.promise;
    }
    function askForMore(item, name, email, question){
        var d = $q.defer();
        $http.post('mail/more', {
            item: item,
            name: name,
            email: email,
            question: question
        })
        .success(function(data){
            d.resolve(data);
        }).error(function(err){
            d.reject(err);
        })
        return d.promise;
    }
    function placeOrder(firstName, lastName, company, street, apartment, town, state, zip, email, phone, notes, products, vat){
        var d = $q.defer();
        $http.post('mail/order', {
            firstName:firstName,
            lastName:lastName,
            company:company,
            street:street,
            apartment: apartment,
            town: town,
            state: state,
            zip:zip,
            email: email,
            phone:phone,
            notes: notes,
            products: products,
            vat: vat
        })
        .success(function(data){
            d.resolve(data);
        }).error(function(err){
            d.reject(err);
        })
        return d.promise;
    }
})
