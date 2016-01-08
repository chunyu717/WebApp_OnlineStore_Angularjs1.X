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
  .controller('signinCtrl', ['$scope', '$rootScope', '$location', '$anchorScroll', '$http', 'AuthenticationService', '$window',
  
  function ($scope, $rootScope, $location, $anchorScroll,$http , AuthenticationService, $window ) {
    
    $scope.navbar = {
      title: "CxN Boutique",
      peripheral : '最新商品',
      groupBuying : '會員團購專區',
      signIn : '登入',
      registerTitle : '加入會員'  
    };
    
    var vm = this;
    vm.captchaSuccess = false;    
 
    $rootScope.$watch('globals', function(newVal, oldVal) {
            vm.IsLogin = ($rootScope.globals.currentUser);
            if(vm.IsLogin) {
                $scope.navbar.IsLogin = true;
                $scope.navbar.signIn = '登出' ;
                $scope.navbar.username = $rootScope.globals.currentUser.username;
            } else {
               $scope.navbar.signIn = '登入' ;
               $scope.navbar.IsLogin = false;
            }
    }, true);
   
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
                vm.error = true;
                vm.errorMsg = "帳號或密碼錯誤";
            }
        });
    }; 
    
    $scope.signInOut = function() {
       if(!vm.IsLogin){
          $location.url('/signin');
       }
       else{
          AuthenticationService.ClearCredentials();
          $http({
                url: 'http://122.116.108.112:8888/api/logout',
                method: "POST",
                withCredentials: true,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
              
          }).error(function(error) {
              
          });
       }
    };
 
    $scope.register = function() {
       $location.url('/register');
    };
    
     $scope.setCaptchaSuccess = function () {
       console.log('setCaptchaSuccess!');
       vm.captchaSuccess = true; 
   };  
   
   $scope.resetCaptcha = function () {
       console.log('resetCaptcha!');
       vm.captchaSuccess = false;    
   }; 
    
    $scope.gotoGroupBuying = function() {
        if(vm.IsLogin){
          $location.url('/groupbuying');
        } else {
          setTimeout(function() {
            $window.alert('請先登入!');
          });
          $location.url('/signin');
        }
    };
  
  }]);
 })();
