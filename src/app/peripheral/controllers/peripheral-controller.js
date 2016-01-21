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
        vm.purchaseProduct.username = vm.username;
        $http({
            url: config.myDomianName + '/api/purchaseProduct',
            method: "POST",
            withCredentials: true,
            params: "",
            data :  vm.purchaseProduct,
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
    
    var picIndex = 0;
    vm.imageUrl = '';
    vm.enlargeImageUrlPics = [] ; 
    $scope.enlargeImageUrl = function(url, id, long_description, name) {
       vm.imageUrl = url;
       vm.enlargeImageUrlPic = url.slice(0, url.indexOf(','));
       
       //vm.enlargeImageUrlPics = url;
       vm.name = name;
       vm.long_description = long_description;
       //$rootScope.imageId_reviewNum = $rootScope.imageId + 1 ;
       picIndex = 0 ;
        
       $http({
                url: config.myDomianName + '/api/itemReview',
                method: "POST",
                withCredentials: true,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                },
                params: {
                  'id' : id
            }
        }).success(function (response) {   
              
        }).error(function(error) {
            
        });
    };
    
    $scope.changeModalPic = function() {
      //console.log('click!');
       var vStr = vm.imageUrl.split(',');
       vm.enlargeImageUrlPic = vStr[(picIndex + 1)% vStr.length] ; 
       picIndex = picIndex + 1;    
    };
    
  }]);
})();
