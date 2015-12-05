(function() {
  'use strict';

  angular
    .module('hosen')
    .controller('MainController', ['$scope', '$location', '$anchorScroll', 'AuthenticationService', '$rootScope' , '$http',
  function ($scope, $location, $anchorScroll, AuthenticationService, $rootScope, $http) {
    
    
    $scope.navbar = {
      title: "CxN Boutique",
      peripheral : '最新商品',
      groupBuying : '會員團購專區',
      signIn : '登入' 
    };
    
    var vm = this;

  
    vm.newsTitle = '最新消息' ;
    vm.register = '註冊' ;
    vm.priceAndServiceTitle  = '服務項目' ;
    vm.locationTitle = "交通指南" ;
    vm.contactUS = "聯絡我們"; 
    //vm.isSignIn = false;
    
    vm.aboutTitle = '關於CxN Boutique' ;
    vm.aboutDesc = '為2007年創立的一家台灣網路郵購服飾品牌，其以UNIQLO的廉價時尚為構想，同時設計符合台灣副熱帶氣候的衣服，並加入多樣化圖案元素，而且由網路購物發跡，非實體店面。2016年營業額為臺灣網路服飾品牌第一，名稱CxN Boutique由來為創辦人Celia與Nina的縮寫';
        
    vm.newsDesc = '因教育訓練 8/19​(三)​~8/21​(五) 將暫停退貨處理及退貨退款作業, 8/24(一)恢復正常作業，期間不影響線上退貨申請作業​。造成您的不便，盡請見諒。<br>C&N 祝您平安順心';
    vm.priceAndServiceDesc = "<h1>洗車</h1>使用高壓沖水機將車身的砂粒、灰塵、污垢…等沖洗乾淨，配合高濃縮泡沫清潔劑將全車使用海綿清洗乾淨，將車身泡沫、污垢用高壓沖水機沖洗乾淨，接者使用高壓風槍將全車飾條、細縫、照後鏡、保險桿…等吹乾，車門、行旅箱用毛巾將水及污垢擦拭乾淨，使用輪胎油再配合輪胎刷塗抹均勻讓輪胎黑亮持久，鋁圈使用萬用清潔劑將污垢擦拭乾淨<br><h1>打腊</h1>德國原裝進口超分子奈米釉腊（原廠奈米証書）使用氣動上腊機將超分子奈米釉腊均勻的上至清洗乾淨的漆面上，氣動下腊波浪海棉將車漆呈現乾白狀的超分子奈米釉腊下腊乾淨，用潔淨柔軟的細纖維擦腊布將車漆的細縫殘留的腊配合牙刷清理乾淨，玻璃使用玻璃清潔劑擦拭乾淨<br><h1>內裝</h1>車內玻璃使用玻璃清潔劑和纖維玻璃巾擦拭，儀表板、中控台、門板、皮椅使用皮革保養油並配合海棉和牙刷擦拭清理細縫灰塵（冷氣出風口、排檔桿細縫 )塑膠腳踏墊使用高壓沖水機沖洗乾淨，地毯使用吸塵器吸塵及細小石頭。黏土粗造面處理→（包含車身工業粉塵、鐵粉、柏油等），以傳統手工方式抹上 A86，最後使用電動震動盤加壓下腊使漆面上形成一層保護膜、細緻的滑度、極高亮度超強潑水效果<br><h1>A86頂級上護釉理護膜</h1>使用高壓沖水機將車身的砂粒、灰塵、污垢…等沖洗乾淨，配合高濃縮泡沫清潔劑將全車使用海綿清洗乾淨";
    
    vm.openTimeTitle = '營業時間' ;
    vm.openTimeDesc = '周一至周六(10:00~22:00)' ; 
    vm.locationDesc = "地址：中壢市環中東路685巷85弄11號<br>經緯度：24°57\'16.5\"N 121°13\'57.2\"E";
    vm.facebook_url='https://www.facebook.com/pages/%E5%AE%8F%E6%98%87%E7%9B%B2%E4%BA%BA%E6%8C%89%E6%91%A9/477649398913384';
    
    vm.contactUSDesc = "<h3>facebook : <a>https://www.facebook.com/%E5%AE%B8%E8%AA%9E-X-%E5%AF%B6%E5%8C%85-562251587238177/</a></h3><h3>Line ID : <a>CxxN</a></h3>" ; 
      
    //vm.IsLogin = false;

    $rootScope.$watch('globals', function(newVal, oldVal) {
            vm.IsLogin = ($rootScope.globals.currentUser);
            if(vm.IsLogin) {
               $scope.navbar.signIn = '登出' ;
            } else {
               $scope.navbar.signIn = '登入' ;
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
    }
    
    $scope.gotoGroupBuying = function() {
        if(vm.IsLogin){
          $location.url('/groupbuying');
        } else {
          $location.url('/signin');
        }
    } 
      
    $scope.gotoTop = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('Top');

      // call $anchorScroll()
      $anchorScroll();
    };
    
    $scope.gotoLocation = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('Location');

      // call $anchorScroll()
      $anchorScroll();
    };
    
    $scope.gotoPrice = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('Price');

      // call $anchorScroll()
      $anchorScroll();
    };
    
    
    $scope.gotoContactUS = function() {
         
      $location.hash('ContactUS');

      // call $anchorScroll()
      $anchorScroll();
    };
    
    $scope.gotoNews = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('News');

      // call $anchorScroll()
      $anchorScroll();
    };

  }])
  .directive('navbar', function() {
    return {
      templateUrl: 'navbar.html'
    };
  });
})();