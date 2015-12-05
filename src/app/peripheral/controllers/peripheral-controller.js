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
  .controller('peripheralCtrl', ['$scope','$rootScope', '$location', '$anchorScroll', '$http', 'AuthenticationService' ,
  function ($scope, $rootScope , $location, $anchorScroll, $http, AuthenticationService) {
  //.controller('peripheralCtrl', function ($scope) {
    
    $scope.navbar = {
      title: "CxN Boutique",
      peripheral : '最新商品',
      groupBuying : '會員團購專區',
      signIn : '登入' 
    };
    
    var vm = this;
  
    vm.newsTitle = '最新消息' ;
    vm.priceAndServiceTitle  = '服務項目' ;
    vm.locationTitle = "交通指南" ;
    vm.contactUS = "聯絡我們"; 
    vm.IsClothes = true;
    vm.IsShoes = false;
    /*
    vm.accessoryItems = [
                { id : '01', pic : 'assets/images/0001.jpg', price: '$50', title: 'title01' , desc : 'itemDesc', star : '5' , reviews:'10' },
                { id : '01', pic : 'assets/images/0002.jpg', price: '$50', title: 'title01' , desc : 'itemDesc', star : '5' , reviews:'10' },
                { id : '01', pic : 'assets/images/0003.jpg', price: '$50', title: 'title01' , desc : 'itemDesc', star : '5' , reviews:'10' },
                { id : '01', pic : 'assets/images/0004.jpg', price: '$50', title: 'title01' , desc : 'itemDesc', star : '5' , reviews:'10' },
                { id : '01', pic : 'assets/images/0005.jpg', price: '$50', title: 'title01' , desc : 'itemDesc', star : '5' , reviews:'10' },
                { id : '01', pic : 'assets/images/0006.jpg', price: '$50', title: 'title01' , desc : 'itemDesc', star : '5' , reviews:'10' },
                { id : '01', pic : 'assets/images/0007.jpg', price: '$50', title: 'title01' , desc : 'itemDesc', star : '5' , reviews:'10' },
                { id : '01', pic : 'assets/images/0008.jpg', price: '$50', title: 'title01' , desc : 'itemDesc', star : '5' , reviews:'10' },
               ];
    */
    //vm.item_1-1-Review = 100;
    
   
    $rootScope.$watch('globals', function(newVal, oldVal) {
            vm.IsLogin = ($rootScope.globals.currentUser);
            if(vm.IsLogin) {
               $scope.navbar.signIn = '登出' ;
            } else {
               $scope.navbar.signIn = '登入' ;
            }
    }, true); 
    
    
    
    $scope.signInOut = function() {
      console.log('vm.IsLogin = ' + vm.IsLogin) ; 
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
              console.log('response = ' + response) ;
               //vm.clothesItems = response;
          }).error(function(error) {
              console.log('Error: ' + error);
          });
          
       }
    }

    $scope.gotoGroupBuying = function() {
        if(vm.IsLogin){
          $location.url('/groupbuying');
        } else {
          $location.url('/signin');
        }
    }
    
    $scope.gotoLocation = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.url('/#Location');

      // call $anchorScroll()
      $anchorScroll();
    };
    
    $scope.gotoPrice = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
       $location.url('/#Price');

      // call $anchorScroll()
      $anchorScroll();
    };
    
    $scope.gotoNews = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
       $location.url('/#News');

      // call $anchorScroll()
      $anchorScroll();
    };
    
    $scope.gotoContactUS = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
       $location.url('/#ContactUS');

      // call $anchorScroll()
      $anchorScroll();
    };

    
    $scope.setCategory = function(value) {
 
      if(value === 'clothes'){
        vm.IsClothes = true;
        vm.IsShoes = false;
        vm.IsAccessory = false;
        
        $http({
                //url: 'http://cxn.com.tw:8888/api/getClothesProducts',
                url: 'http://122.116.108.112:8888/api/getClothesProducts',
                
                method: "GET",
                withCredentials: true,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
              //console.log('response = ' + response) ;
               vm.clothesItems = response;
          }).error(function(error) {
              console.log('Error: ' + error);
          });
          
      }else if(value === 'shoes'){
         vm.IsClothes = false;
         vm.IsShoes = true;
         vm.IsAccessory = false;
         
         $http({
                //url: 'http://cxn.com.tw:8888/api/getShoesProducts',
                url: 'http://122.116.108.112:8888/api/getShoesProducts',
                method: "GET",
                withCredentials: true,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
              //console.log('response = ' + response) ;
               vm.shoesItems = response;
          }).error(function(error) {
              console.log('Error: ' + error);
          });
          
      }else if(value === 'accessory'){
         vm.IsClothes = false;
         vm.IsShoes = false;
         vm.IsAccessory = true;

         
         $http({
                //url: 'http://cxn.com.tw:8888/api/getAccessoryProducts',
                url: 'http://122.116.108.112:8888/api/getAccessoryProducts',
                method: "GET",
                withCredentials: true,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               vm.accessoryItems = response;
          }).error(function(error) {
              console.log('Error: ' + error);
              vm.accessoryItems = []; 
          });
                
      }
       
    }
    
    var picIndex = 0;
    vm.imageUrl = '';
    $scope.enlargeImageUrl = function(url, id, long_description, name) {
       vm.imageUrl = url;
       vm.enlargeImageUrl = url.slice(0, url.indexOf(','));
      
       vm.name = name;
       vm.long_description = long_description;
       //$rootScope.imageId_reviewNum = $rootScope.imageId + 1 ;
       picIndex = 0 ;
       console.log('id = ' + id) ; 
       $http({
                url: 'http://122.116.108.112:8888/api/itemReview',
                method: "POST",
                withCredentials: true,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                },
                params: {
                  'id' : id
            }
        }).success(function (response) {   
              //vm.accessoryItems = response;
        }).error(function(error) {
            console.log('Error: ' + error);
            //vm.accessoryItems = []; 
        });
    }
    
    $scope.changeModalPic = function() {
       var vStr = vm.imageUrl.split(',');
       vm.enlargeImageUrl = vStr[(picIndex + 1)% vStr.length] ; 
       picIndex = picIndex + 1;    
    }
    
  }]);
})();
