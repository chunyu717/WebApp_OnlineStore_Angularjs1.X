(function() {
  'use strict';
/**
 * @ngdoc function
 * @name hosen.controller:peripheralCtrl
 * @description
 * # peripheralCtrl
 * Controller of the hosen
 */
angular.module('hosen')
  .controller('peripheralCtrl', ['$scope','$rootScope', '$location', '$anchorScroll', '$http', 'AuthenticationService' , '$window', 'config',
  function ($scope, $rootScope , $location, $anchorScroll, $http, AuthenticationService, $window, config) {
    
    $scope.navbar = {
      title: "CxN Boutique",
      peripheral : '最新商品',
      groupBuying : '會員團購專區',
      signIn : '登入',
      registerTitle : '加入會員' 
    };
    
    var vm = this;
  
    vm.IsClothes = true;
    vm.IsShoes = false;
   
    $rootScope.$watch('globals', function(newVal, oldVal) {
            vm.IsLogin = ($rootScope.globals.currentUser);
            if(vm.IsLogin) {
                $scope.navbar.IsLogin = true;
                $scope.navbar.signIn = '登出' ;
                $scope.navbar.username = $rootScope.globals.currentUser.username;
                vm.username = $rootScope.globals.currentUser.username;
            } else {
               $scope.navbar.signIn = '登入' ;
               $scope.navbar.IsLogin = false;
            }
    }, true); 

    $scope.purchaseProduct = function(file) {
        //$scope.purchaseProduction.username = vm.username;
        $http({
            url: config.myDomianName + '/api/purchaseProduct',
            method: "POST",
            withCredentials: true,
            params: "",
            data :  $scope.purchaseProduction,
            headers: {
                        'Content-Type': 'application/json; charset=utf-8'
            }
        }).success(function (response) {   
            vm.addProductMsg = "訂購商品成功!!" ;
        }).error(function(error) {
                vm.addProductMsg = "訂購商品失敗!!" ;
        });
    };

    $scope.setCategory = function(value) {
 
      if(value === 'clothes'){
        vm.IsClothes = true;
        vm.IsShoes = false;
        vm.IsAccessory = false;
        
        $http({
                url: config.myDomianName + '/api/getClothesProducts',
                method: "GET",
                withCredentials: true,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               vm.clothesItems = response;
               for(var i in vm.clothesItems ){
                  vm.clothesItems[i].long_description = vm.clothesItems[i].long_description.replace(/\n/g,"<br />");
               }
          }).error(function(error) {
              
          });
      }else if(value === 'shoes'){
         vm.IsClothes = false;
         vm.IsShoes = true;
         vm.IsAccessory = false;
         $http({
                url: config.myDomianName + '/api/getShoesProducts',
                method: "GET",
                withCredentials: true,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               vm.shoesItems = response;
          }).error(function(error) {
              
          });
          
      }else if(value === 'accessory'){
         vm.IsClothes = false;
         vm.IsShoes = false;
         vm.IsAccessory = true;

         $http({
                url: config.myDomianName + '/api/getAccessoryProducts',
                method: "GET",
                withCredentials: true,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               vm.accessoryItems = response;
          }).error(function(error) {
              
              vm.accessoryItems = []; 
          });
                
      }
       
    };
    
     $scope.modalShown = false;
    var picIndex = 0;
    vm.imageUrl = '';
    vm.enlargeImageUrlPics = [] ; 

    $scope.loggedIn = false;
    $scope.loggingIn = false;

    $scope.showLogin = function () {
        $scope.loggingIn = true;
    };

    $scope.logout = function () {
        // do your logout logic
        $scope.user = null;
        $scope.loggedIn = false;
    };

    $scope.login = function () {
        // do your login logic
        $scope.loggingIn = false;
        $scope.loggedIn = true;
    };


    //$scope.enlargeImageUrl = function(url, id, long_description, name) {
    $scope.enlargeImageUrl = function(item) {
       vm.imageUrl = item.icon;
       picIndex = 0 ;
       
       $scope.enlargeImage  = item ; 

       $http({
                url: config.myDomianName + '/api/itemReview',
                method: "POST",
                withCredentials: true,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                },
                params: {
                  'id' : item.id
            }
        }).success(function (response) {   
              
        }).error(function(error) {
            
        });
         
        $("#image-gallery").modal('show');
    };
    
    $scope.modalHide = function() {
        $("#image-gallery").modal('hide');
    }


    $scope.changeModalPic = function() {
       var vStr = vm.imageUrl.split(',');
       $scope.enlargeImageUrlPic = vStr[(picIndex + 1)% vStr.length] ; 
       picIndex = picIndex + 1;    
    };

    $scope.orderModalHide = function() {
        $("#purchaseProduct").modal('hide');
    }

    $scope.buyProduct = function(item) {
        $scope.purchaseProduction = item ;
        $scope.purchaseProduction.username = vm.username;
        //$scope.purchaseProduct.id = item.id;
        //$scope.purchaseProduct = vm.purchaseProduct;
         $("#purchaseProduct").modal('show');
    }

  }])
.directive('igProduct', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'modal.html'   
    }
  })
  .directive('igOrder', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'order.html' 
    }
  });

})();
