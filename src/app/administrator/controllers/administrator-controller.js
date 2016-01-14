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
  .controller('administratorCtrl', ['$scope', '$rootScope', '$location', '$anchorScroll', '$http', 'AuthenticationService',  'Upload',  '$timeout' , 
  
  function ($scope, $rootScope, $location, $anchorScroll, $http, AuthenticationService, Upload, $timeout ) {
    
    var vm = this;
    $scope.addProduct = function(file) {
        file.upload = Upload.upload({
            url: 'http://122.116.108.112:8888/api/photo/upload',
            withCredentials: true,
            data: {file: file, username: $scope.username},
        }).then(function (resp) {
            //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            //console.log('resp.data.fileimage: ' + resp.data.fileimage);
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
            vm.addProductMsg = "新增商品失敗 : 上傳檔案不成功(" +  resp.status + ")!!"  ;
        }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            //console.log('progress: ' + file.progress + '% ' + evt.config.data.file.name);
        });
    };
    
    /*
    $scope.categoryChange =  function() {
        console.log(' addProduct.category!  = ' + vm.updateProduct.category);
        //""addProduct.category = ""
    } ; 
    
    $scope.category = [ 
      { name :'clothes'},
      { name :'shoes'},
      { name :'accessory'}
    ];
    */
  
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
    
    (function initController() {
        //console.log('$rootScope.globals.currentUser' + $rootScope.globals.currentUser) ; 
        if( $rootScope.globals.currentUser !== undefined){
            if( $rootScope.globals.currentUser.username === 'admin' ){
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
            }else{
                $location.url('/signin');
            }
        }else{
            $location.url('/signin');
        }
           
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
    
    $scope.gotoRegister = function() {
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
    
    $scope.getOrders = function() {
      $http({
                url: 'http://122.116.108.112:8888/api/getOrders',
                method: "GET",
                withCredentials: true,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               vm.orders = response;
          }).error(function(error) {
              
          });
    };
    
    $scope.removeOrder = function(orderId) {
      $http({
                
                url: 'http://122.116.108.112:8888/api/removeOrder',
                method: "POST",
                withCredentials: true,
                params: { orderId: orderId },
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               $http({
                    url: 'http://122.116.108.112:8888/api/getOrders',
                    method: "GET",
                    withCredentials: true,
                    headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                    }
                }).success(function (response) {   
                    vm.orders = response;
                }).error(function(error) {
                    
                });
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
    
    $scope.removeMember = function(memberId) {
      $http({
                
                url: 'http://122.116.108.112:8888/api/removeMember',
                method: "POST",
                withCredentials: true,
                params: { memberId: memberId },
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               $http({
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
          }).error(function(error) {
              
          });
    };
    
    
    $scope.approveMember = function(memberId) {
      $http({
                
                url: 'http://122.116.108.112:8888/api/approveMember',
                method: "POST",
                withCredentials: true,
                params: { memberId: memberId },
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               $http({
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
