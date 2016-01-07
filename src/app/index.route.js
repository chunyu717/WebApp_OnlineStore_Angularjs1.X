(function() {
  'use strict';

  angular
    .module('hosen')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('peripheral', {
        url: '/peripheral',
        templateUrl: 'app/peripheral/partials/peripheral.html',
        controller: 'peripheralCtrl',
        controllerAs: 'peripheral'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'app/signin/partials/signin.html',
        controller: 'signinCtrl',
        controllerAs: 'signin'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/register/partials/register.html',
        controller: 'registerCtrl',
        controllerAs: 'register'
      })
      .state('administrator', {
        url: '/administrator',
        templateUrl: 'app/administrator/partials/administrator.html',
        controller: 'administratorCtrl',
        controllerAs: 'administrator'
      })
      .state('groupbuying', {
        url: '/groupbuying',
        templateUrl: 'app/groupbuying/partials/groupbuying.html',
        controller: 'groupbuyingCtrl',
        controllerAs: 'groupbuying'
      });
      
    //$urlRouterProvider.otherwise('/');
  }

})();
