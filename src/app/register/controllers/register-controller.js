(function() {
  'use strict';
/**
 * @ngdoc function
 * @name hosen.controller:registerCtrl
 * @description
 * # registerCtrl
 * Controller of the hosen
 */
angular.module('hosen')
  //.controller('registerCtrl', function ($scope) {
   .controller('registerCtrl', ['$scope', '$location', '$anchorScroll', '$http', 'AuthenticationService' ,
  
  function ($scope, $location, $anchorScroll, $http, AuthenticationService) {
    
    $scope.navbar = {
      title: "CxN Boutique",
      peripheral : '最新商品',
      groupBuying : '會員團購專區',
      signIn : '登入',
      registerTitle : '加入會員'  
    };
    
    var vm = this;
    vm.title = "CxN Boutique";
    vm.IsSignin = true;
    vm.error = false;
    vm.captchaSuccess = false;    
 
   
    (function initController() {
        // reset login status
       
         
    })();

    $scope.signInOut = function() {
       if(!vm.IsLogin){
          $location.url('/signin');
       }
       else{
          AuthenticationService.ClearCredentials();
          $http({
                //url: 'http://cxn.com.tw:8888/api/logout',
                url: 'http://122.116.108.112:8888/api/logout',
                method: "POST",
                withCredentials: true,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
              console.log('response = ' + response) ;
               //vm.clothesItems = response;
          }).error(function(error) {
              console.log('Error: ' + error);
          });
       }
    };
    
    $scope.register = function() {
       $location.url('/register');
    };
    
    
    $scope.gotoGroupBuying = function() {
        if(vm.IsLogin){
          $location.url('/groupbuying');
        } else {
          $location.url('/signin');
        }
    };   
  
  }]);
 })();
