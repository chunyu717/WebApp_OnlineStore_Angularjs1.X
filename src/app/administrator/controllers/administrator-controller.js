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
  .controller('administratorCtrl', ['$scope', '$rootScope', '$location', '$anchorScroll', '$http', 'AuthenticationService',  'Upload',  '$timeout' , 'config',
  
  function ($scope, $rootScope, $location, $anchorScroll, $http, AuthenticationService, Upload, $timeout , config ) {
    
    var vm = this;
    
    $scope.addProduct = function(file) {
        file.upload = Upload.upload({
            url: config.myDomianName + '/api/photo/upload',
            withCredentials: true,
            data: {file: file, username: $scope.username},
        }).then(function (resp) {
            vm.addProduct.fileimage = resp.data.fileimage;
            $http({
                url: config.myDomianName + '/api/addProduct',
                method: "POST",
                withCredentials: true,
                params: "",
                data :  vm.addProduct,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
            }).success(function (response) {   
               $http({
                    url: config.myDomianName + '/api/getAllProducts',
                    method: "GET",
                    withCredentials: true,
                    headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                    }
                }).success(function (response) {   
                    vm.allProducts = response;
                    for(var i in vm.allProducts ){
                        vm.allProducts[i].created_at = new Date(vm.allProducts[i].created_at).toLocaleString();
                        vm.allProducts[i].long_description = vm.allProducts[i].long_description.replace(/\n/g,"<br />");
                     }
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
        });
    };
    
  
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
        if( $rootScope.globals.currentUser !== undefined){
            if( $rootScope.globals.currentUser.username === 'admin' ){
                $http({
                        url: config.myDomianName + '/api/getAllProducts',
                        method: "GET",
                        withCredentials: true,
                        headers: {
                                    'Content-Type': 'application/json; charset=utf-8'
                        }
                }).success(function (response) {   
                    vm.allProducts = response;
                    for(var i in vm.allProducts ){
                        vm.allProducts[i].created_at = new Date(vm.allProducts[i].created_at).toLocaleString();
                        if(vm.allProducts[i].long_description != null)
                          vm.allProducts[i].long_description = vm.allProducts[i].long_description.replace(/\n/g,"<br />");
                     }
                }).error(function(error) {
                    
                });
            }else{
                $location.url('/signin');
            }
        }else{
            $location.url('/signin');
        }
           
    })();
    
    $scope.getProducts = function() {
        $http({
                url: config.myDomianName + '/api/getAllProducts',
                method: "GET",
                withCredentials: true,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               vm.allProducts = response;
               for(var i in vm.allProducts ){
                  vm.allProducts[i].created_at  = new Date(vm.allProducts[i].created_at).toLocaleString();
                  if(vm.allProducts[i].long_description != null)
                    vm.allProducts[i].long_description = vm.allProducts[i].long_description.replace(/\n/g,"<br />");
               }
          }).error(function(error) {
              
          });
    };
    
    $scope.getApplies = function() {
      $http({
                url: config.myDomianName + '/api/getApplies',
                method: "GET",
                withCredentials: true,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               vm.applies = response;
               for(var i in vm.applies ){
                  vm.applies[i].note = vm.applies[i].note.replace(/\n/g,"<br />");
               }
          }).error(function(error) {
              
          });
    };
    
    $scope.getOrders = function() {
      $http({
                url: config.myDomianName + '/api/getOrders',
                method: "GET",
                withCredentials: true,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               vm.orders = response;
               for(var i in vm.orders ){
                  vm.orders[i].created_at = new Date(vm.orders[i].created_at).toLocaleString();
                  if(vm.orders[i].additional_note != null)
                    vm.orders[i].additional_note = vm.orders[i].additional_note.replace(/\n/g,"<br />");
               }
          }).error(function(error) {
              vm.orders = null;
          });
    };
    
    $scope.removeOrder = function(orderId) {
      $http({
                
                url: config.myDomianName + '/api/removeOrder',
                method: "POST",
                withCredentials: true,
                params: { orderId: orderId },
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               $http({
                    url: config.myDomianName + '/api/getOrders',
                    method: "GET",
                    withCredentials: true,
                    headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                    }
                }).success(function (response) {   
                    vm.orders = response;
                    for(var i in vm.orders ){
                        vm.orders[i].created_at = new Date(vm.orders[i].created_at).toLocaleString();
                        if(vm.orders[i].additional_note != null)
                          vm.orders[i].additional_note = vm.orders[i].additional_note.replace(/\n/g,"<br />");
                     }
                }).error(function(error) {
                    
                });
          }).error(function(error) {
              
          });
    };
    
    $scope.removeProduct = function(productId) {
      $http({
                
                url: config.myDomianName + '/api/removeProduct',
                method: "POST",
                withCredentials: true,
                params: { productId: productId },
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               $http({
                    url: config.myDomianName + '/api/getAllProducts',
                    method: "GET",
                    withCredentials: true,
                    headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                    }
                }).success(function (response) {   
                    vm.allProducts = response;
                    for(var i in vm.allProducts ){
                        vm.allProducts[i].created_at = new Date(vm.allProducts[i].created_at).toLocaleString();
                        if(vm.allProducts[i].long_description != null)
                          vm.allProducts[i].long_description = vm.allProducts[i].long_description.replace(/\n/g,"<br />");
                     }
                }).error(function(error) {
                    
                });
          }).error(function(error) {
              
          });
    };

    $scope.updateProduct = function() {
      $http({    
                url: config.myDomianName + '/api/updateProduct',
                method: "POST",
                withCredentials: true,
                params: "",
                data :  vm.updateProduct,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               $http({
                    url: config.myDomianName + '/api/getAllProducts',
                    method: "GET",
                    withCredentials: true,
                    headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                    }
                }).success(function (response) {   
                    vm.allProducts = response;
                    for(var i in vm.allProducts ){
                        vm.allProducts[i].created_at = new Date(vm.allProducts[i].created_at).toLocaleString();
                        if(vm.allProducts[i].long_description != null)
                          vm.allProducts[i].long_description = vm.allProducts[i].long_description.replace(/\n/g,"<br />");
                     }
                    vm.updateProductMsg = "修改商品成功!!" ;
                }).error(function(error) {
                    
                });
          }).error(function(error) {
               vm.updateProductMsg = "修改商品失敗!!" ;
          });
    };
    
    $scope.getMembers = function() {
       $http({
                url: config.myDomianName + '/api/getMembers',
                method: "GET",
                withCredentials: true,
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               vm.members = response;
               for(var i in vm.members ){
                  if(vm.members[i].note != null)
                    vm.members[i].note = vm.members[i].note.replace(/\n/g,"<br />");
               }
          }).error(function(error) {
              
          });
    };

    $scope.removeMember = function(memberId) {
      $http({
                url: config.myDomianName + '/api/removeMember',
                method: "POST",
                withCredentials: true,
                params: { memberId: memberId },
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               $http({
                    url: config.myDomianName + '/api/getMembers',
                    method: "GET",
                    withCredentials: true,
                    headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                    }
                }).success(function (response) {   
                    vm.members = response;
                    for(var i in vm.members ){
                      if(vm.members[i].note != null)
                        vm.members[i].note = vm.members[i].note.replace(/\n/g,"<br />");
                    }
                }).error(function(error) {
                    
                });
          }).error(function(error) {
              
          });
    };
    
    
    $scope.approveMember = function(memberId) {
      $http({
                url: config.myDomianName + '/api/approveMember',
                method: "POST",
                withCredentials: true,
                params: { memberId: memberId },
                headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                }
          }).success(function (response) {   
               $http({
                    url: config.myDomianName + '/api/getApplies',
                    method: "GET",
                    withCredentials: true,
                    headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                    }
                }).success(function (response) {   
                    vm.applies = response;
                    for(var i in vm.applies ){
                        if(vm.applies[i].note != null)
                          vm.applies[i].note = vm.applies[i].note.replace(/\n/g,"<br />");
                     }
                }).error(function(error) {
                    
                });
          }).error(function(error) {
              
          });
    };
    
  }]);
 })();
