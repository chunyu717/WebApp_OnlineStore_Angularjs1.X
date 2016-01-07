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
  .controller('administratorCtrl', ['$scope', '$location', '$anchorScroll', '$http', 'AuthenticationService',  'Upload',  '$timeout' , 
  
  function ($scope, $location, $anchorScroll, $http, AuthenticationService, Upload, $timeout ) {
    
    var vm = this;
    $scope.addProduct = function(file) {
        file.upload = Upload.upload({
            url: 'http://122.116.108.112:8888/api/photo/upload',
            data: {file: file, username: $scope.username},
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            console.log('resp.data.fileimage: ' + resp.data.fileimage);
            vm.addProduct.fileimage = resp.data.fileimage;
            $http({
                url: 'http://122.116.108.112:8888/api/addProduct',
                method: "POST",
                withCredentials: true,
                params: "",
                data :  vm.addProduct,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               $http({
                    url: 'http://122.116.108.112:8888/api/getAllProducts',
                    method: "GET",
                    withCredentials: true,
                    headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                    }
                }).success(function (response) {   
                    vm.allProducts = response;
                     vm.addProductMsg = "新增商品成功!!" ;
                }).error(function(error) {
                  
                });
          }).error(function(error) {
                 vm.addProductMsg = "新增商品失敗：更新資料庫不成功!!" ;
          });
        }, function (resp) {
            //console.log('Error status: ' + resp.status);
            vm.addProductMsg = "新增商品失敗 : 上傳檔案不成功(" +  resp.status + ")!!"  ;
        }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            console.log('progress: ' + file.progress + '% ' + evt.config.data.file.name);
        });
    };

    
    $scope.navbar = {
      title: "CxN Boutique",
      peripheral : '最新商品',
      groupBuying : '會員團購專區',
      signIn : '登入',
      registerTitle : '加入會員'  
    };
    
    
    vm.title = "CxN Boutique";
    vm.IsSignin = true;
    vm.error = false;
    vm.captchaSuccess = false;    
 
   
    (function initController() {
        
         $http({
                url: 'http://122.116.108.112:8888/api/getAllProducts',
                method: "GET",
                withCredentials: true,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               vm.allProducts = response;
          }).error(function(error) {
              
          });
         
    })();

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
    
    $scope.getProducts = function() {
        $http({
                url: 'http://122.116.108.112:8888/api/getAllProducts',
                method: "GET",
                withCredentials: true,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               vm.allProducts = response;
          }).error(function(error) {
              
          });
    };
    
    $scope.getMembers = function() {
       $http({
                //url: 'http://cxn.com.tw:8888/api/getShoesProducts',
                url: 'http://122.116.108.112:8888/api/getMembers',
                method: "GET",
                withCredentials: true,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               vm.members = response;
          }).error(function(error) {
              
          });
    };
    
    $scope.getApplies = function() {
      $http({
                //url: 'http://cxn.com.tw:8888/api/getShoesProducts',
                url: 'http://122.116.108.112:8888/api/getApplies',
                method: "GET",
                withCredentials: true,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               vm.applies = response;
          }).error(function(error) {
              
          });
    };
    
    $scope.removeProduct = function(productId) {
      $http({
                
                url: 'http://122.116.108.112:8888/api/removeProduct',
                method: "POST",
                withCredentials: true,
                params: { productId: productId },
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               $http({
                    url: 'http://122.116.108.112:8888/api/getAllProducts',
                    method: "GET",
                    withCredentials: true,
                    headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                    }
                }).success(function (response) {   
                    vm.allProducts = response;
                }).error(function(error) {
                    
                });
          }).error(function(error) {
              
          });
    };
    
   
    
    $scope.addProductDB = function() {
           
      $http({
                url: 'http://122.116.108.112:8888/api/addProduct',
                method: "POST",
                withCredentials: true,
                params: "",
                data :  vm.addProduct,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               $http({
                    url: 'http://122.116.108.112:8888/api/getAllProducts',
                    method: "GET",
                    withCredentials: true,
                    headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                    }
                }).success(function (response) {   
                    vm.allProducts = response;
                }).error(function(error) {
                    
                });
          }).error(function(error) {
              
          });
    };
    
    $scope.updateProduct = function() {
      $http({
                
                url: 'http://122.116.108.112:8888/api/updateProduct',
                method: "POST",
                withCredentials: true,
                params: "",
                data :  vm.updateProduct,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               $http({
                    url: 'http://122.116.108.112:8888/api/getAllProducts',
                    method: "GET",
                    withCredentials: true,
                    headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                    }
                }).success(function (response) {   
                    vm.allProducts = response;
                    vm.updateProductMsg = "修改商品成功!!" ;
                }).error(function(error) {
                    
                });
          }).error(function(error) {
               vm.updateProductMsg = "修改商品失敗!!" ;
          });
    };
    
  }]);
 })();
