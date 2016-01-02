(function() {
  'use strict';
/**
 * @ngdoc function
 * @name hosen.controller:signinCtrl
 * @description
 * # signinCtrl
 * Controller of the hosen
 */
angular.module('hosen')
  .controller('signinCtrl', ['$scope', '$location', '$anchorScroll', 'AuthenticationService', //'vcRecaptchaService',//'FlashService',
  
  function ($scope, $location, $anchorScroll, AuthenticationService ) {
    
    $scope.navbar = {
      title: "CxN Boutique",
      peripheral : '最新商品',
      groupBuying : '會員團購專區',
      signIn : '登入' 
    };
    
    var vm = this;
    vm.title = "CxN Boutique";
    vm.IsSignin = true;
    vm.error = false;
    vm.captchaSuccess = false;    
 
   
    (function initController() {
        // reset login status
        AuthenticationService.ClearCredentials();
         
    })();

    $scope.logIn = function () {
        
        AuthenticationService.Login(vm.account, vm.password, function (response) {
            if (response.success &&   response.auth === 'ok' ) {
                AuthenticationService.SetCredentials(vm.account, vm.password);
                $location.path('/');
            } else {
                //FlashService.Error(response.message);               
                //vm.dataLoading = false;
                vm.error = true;
                vm.errorMsg = "帳號或密碼錯誤";
                //$location.path('/signin');
            }
        });
        
    };   
    
    /*
  $scope.setCaptchaSuccess = function () {
      console.log('setCaptchaSuccess!');
      vm.captchaSuccess = true; 
  };  
  
  $scope.resetCaptcha = function () {
      console.log('resetCaptcha!');
      vm.captchaSuccess = false;    
  };  
  */
  
  }]);
 })();
