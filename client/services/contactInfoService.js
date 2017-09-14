var contactInfoService = angular.module('contactInfoService', []);

contactInfoService.factory('contactInfoService', function($q, $http){
    return({
        getContactInfo: getContactInfo,
        updateContactInfo: updateContactInfo,
        createContactInfo:createContactInfo
    })
    function createContactInfo(info){
        console.log(info);
        var d = $q.defer();
        $http.post('products/info/info/add', {title: 'test', info:info})
        .success(function(data){
            d.resolve(data);
        })
        .error(function(err){
            d.reject(err);
        })
        return d.promise;
    }
    function getContactInfo(){
        var d = $q.defer();
        $http.post('products/info/get')
        .success(function(data){
            d.resolve(data);
        })
        .error(function(err){
            d.reject(err);
        })
        return d.promise;
    }
    function updateContactInfo(info){
        var d = $q.defer();
        $http.post('products/info', {info:info})
        .success(function(data){
            d.resolve(data);
        })
        .error(function(err){
            d.reject(err);
        })
        return d.promise;
    }
})
