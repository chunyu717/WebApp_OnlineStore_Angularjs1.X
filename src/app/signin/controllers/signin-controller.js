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
  .controller('signinCtrl', ['$scope', '$location', '$anchorScroll', 'AuthenticationService', //'FlashService',
  
  function ($scope, $location, $anchorScroll , AuthenticationService /*FlashService*/) {
    
    var vm = this;
    vm.title = "CxN Boutique";
    vm.IsSignin = true;
    vm.error = false;
    //vm.gender = 'male';
    //vm.login = login;
 
    (function initController() {
        // reset login status
        AuthenticationService.ClearCredentials();
    })();

    $scope.logIn = function () {
        //vm.dataLoading = true;
        //console.log('toastr = ' + toastr.options.timeOut ) ;
        //console.log('moment = ' + moment ) ;
        //console.log('cxnurl = ' + cxnurl ) ;
        
        AuthenticationService.Login(vm.account, vm.password, function (response) {
            if (response.success &&   response.auth === 'ok' ) {
                AuthenticationService.SetCredentials(vm.account, vm.password);
                console.log('yes!'); 
                $location.path('/');
            } else {
                console.log('no!'); 
                //FlashService.Error(response.message);               
                //vm.dataLoading = false;
                vm.error = true;
                vm.errorMsg = "帳號或密碼錯誤";
                //$location.path('/signin');
            }
        });
        
    };   
    
  $scope.register = function () {
      vm.error = true;
      vm.errorMsg = "認證信已傳送審核，審核通過會寄送email通知您! ";
      
  }  
  
  }]);
 })();
