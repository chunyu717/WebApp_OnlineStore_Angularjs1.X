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
   .controller('registerCtrl', ['$scope', '$rootScope','$location', '$anchorScroll', '$http', 'AuthenticationService' , '$window',  'config', 
  
  function ($scope, $rootScope, $location, $anchorScroll, $http, AuthenticationService, $window, config) {
    
    var vm = this;
    
    $scope.navbar = {
      title: "CxN Boutique",
      peripheral : '最新商品',
      groupBuying : '會員團購專區',
      signIn : '登入',
      registerTitle : '加入會員'  
    };

    (function initController() {
        console.log('config.myDomianName  = ' +  config.myDomianName) ;
    })();

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

    
    $scope.registerMember = function() {
        if( vm.registerInfo.password !==  vm.registerInfo.password2 ){
            vm.errorMsg = "密碼不符";
            return false;
        }
        $http({
                url: config.myDomianName + '/api/register',
                method: "POST",
                withCredentials: true,
                data :  vm.registerInfo,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {         
              vm.errorMsg = "申請成功，請等待核可通知!";
          }).error(function(error) {           
              vm.errorMsg = "申請失敗，請確認資料!";
          });
    };
  
  }]);
 })();
