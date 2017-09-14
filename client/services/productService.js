var productService = angular.module('productService', []);

productService.factory('productService', function($q, $timeout, $http){
    function getProducts(){
        var d = $q.defer();
        $http.get('/products/all')
        .success(function(data){
            d.resolve(data);
        }).error(function(err){
            d.reject();
        })
        return d.promise;
    }
    function addProduct(name, priceMethod, currency, price, info, quantity, serial,pictureArray, mainImage){
        var d = $q.defer();
        $http.post('products/add', {name:name, priceMethod:priceMethod, currency:currency, price:price, information:info,quantity:quantity, serial:serial, pictureArray:pictureArray, mainImage:mainImage})
        .success(function(data, status){
            if(status === 200 && data.status){
                d.resolve(data);
            }else{
                d.reject(data);
            }
        }).error(function(err){
            d.reject(err);
        })
        return d.promise;
    }
    function getProductById(id){
        var d = $q.defer();
        $http.get('products/product/' + id)
        .success(function(data){
            d.resolve(data);
        }).error(function(err){
            d.reject(err);
        })
        return d.promise;
    }
    function updateProduct(id, name, price, currency, information, quant){
        var d = $q.defer();
        $http.post('products/update', {id:id, name:name, price:price, currency:currency, information: information, quant:quant})
        .success(function(data){
            d.resolve(data);
        }).error(function(err){
            d.resolve(err);
        })
        return d.promise;
    }
    function updateMainImage(path){
        var d = $q.defer();
        $http.post('products/imageupdate', {path:path})
        .success(function(data){
            d.resolve(data);
        }).error(function(err){
            d.resolve(err);
        })
        return d.promise;
    }

    /*function fetchCurrency(){
        var d = $q.defer();
        console.log('asd');
        $http.get('http://www.apilayer.net/api/live?access_key=8012292b617b73a0d9273055e427034c')
            .success(function(data){
                d.resolve(data);
            }).error(function(err){
            d.reject(err);
        })
        return d.promise;
    }*/


    return({
        addProduct:addProduct,
        getProducts: getProducts,
        getProductById: getProductById,
        updateProduct: updateProduct,
        updateMainImage: updateMainImage
    })
})
