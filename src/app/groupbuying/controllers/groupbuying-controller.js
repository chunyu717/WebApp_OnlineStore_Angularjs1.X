(function() {
  'use strict';
/**
 * @ngdoc function
 * @name hosen.controller:groupbuyingCtrl
 * @description
 * # groupbuyingCtrl
 * Controller of the hosen
 */
angular.module('hosen')
  .controller('groupbuyingCtrl', ['$scope','$rootScope', '$location', '$anchorScroll', '$http', 'AuthenticationService' , '$window',
  function ($scope, $rootScope , $location, $anchorScroll, $http, AuthenticationService, $window) {
    
    var vm = this;
    $scope.navbar = {
      title: "CxN Boutique",
      peripheral : '最新商品',
      groupBuying : '會員團購專區',
      signIn : '登入',
      registerTitle : '加入會員' 
    };
    
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
    
    $scope.gotoRegister = function() {
       $location.url('/register');
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
