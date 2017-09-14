var myApp = angular.module('myApp', [
    'ui.router',
    'addProductCtrl',
    'pictureService',
    'productService',
    'productCtrl',
    'allProductsCtrl',
    'testtest',
    'idService',
    'changeProductCtrl',
    'ngInitial',
    'sideMenuCtrl',
    'navBarCtrl',
    'sideMenuOverlayCtrl',
    'xeditable',
    'TextBtnCtrl',
    'ngSanitize',
    'textAngular',
    'contactInfoService',
    'mapCtrl',
    'landingContactCtrl',
    'addInfo',
    'landingProducts',
    'productElement',
    'premierController',
    'tweetbutton',
    'dataService',
    'scrollNav',
    'billingCtrl',
    'keyPress',
    'appCtrl',
    'scrollToBookmark',
    'ngAnimate',
    'mailService',
    'startFrom',
    'angularSlideables'

]);

myApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
  $stateProvider
    .state('landing', {
        url: '/',
        templateUrl: 'partials/landing.html',
        controller: 'productCtrl',
        access: {restricted: false}
    })
    .state('billing', {
        url: '/billing',
        templateUrl: 'partials/billing.html',
        controller: 'billingCtrl',
        access: {restricted: false}
    })
    .state('admin', {
      abstract: true,
      url: '/admin',
      templateUrl: 'partials/admin.html',
      access: {restricted: false}
    })
    .state('admin.products', {
        url:'/products',
        templateUrl: 'partials/products.html',
        access: {restricted:false}
    })
    .state('admin.contacts', {
        url:'/contacts',
        templateUrl: 'partials/contact-info-admin.html',
        access: {restricted: false}
    })
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .state('logout', {
      url: '/logout',
      controller: 'logoutController',
      access: {restricted: false}
    })
    .state('register', {
      url: '/register',
      templateUrl: 'partials/register.html',
      controller: 'registerController',
      access: {restricted: false}
    })
    .state('one', {
      url: '/one',
      template: '<h1>This is page one!</h1>',
      access: {restricted: false}
    })
    .state('two', {
      url: '/two',
      template: '<h1>This is page two!</h1>',
      access: {restricted: false}
    })
    .state('admin.addproduct', {
        url: '/addproduct',
        templateUrl: 'partials/add-product.html',
        controller: 'addProductCtrl',
        access: {restricted: false}
    })
    .state('products', {
        url:'/products',
        templateUrl:'partials/products.html',
        access: {restricted:false}
    })
    .state('change', {
        url: '/change',
        templateUrl: 'partials/change-product.html',
        controller: 'changeProductCtrl',
        access: {restricted: false}
    })
    .state('changeContact', {
        url: '/change/contact',
        templateUrl: 'partials/change-contact-info.html',
        controller: 'contactCtrl',
        access: {restricted: false}
    })
    .state('createContact', {
        url: '/create/contact',
        templateUrl: 'partials/create-contact.html',
        controller: 'addInfo',
        access: {restricted:false}
    })
    $urlRouterProvider.otherwise('/');
});

myApp.run(function ($rootScope, $location, $state, AuthService) {
  $rootScope.sidemenu = false;
  $rootScope.sidemenuOverlay = false;
  $rootScope.items = [];
  console.log($rootScope.sidemenu);
  $rootScope.$on('$stateChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');

        }
      });
  });
});
