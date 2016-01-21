(function() {
  'use strict';

  angular
    .module('hosen')
    .run(run);

  /** @ngInject */
  /*
  function runBlock($log) {

    $log.debug('runBlock end');
  }
  */
  
  run.$inject = ['$rootScope', '$location', '$cookieStore', '$http' , 'config'];
    function run($rootScope, $location, $cookieStore, $http, config) {
        
        // keep user logged in after page refresh

        $rootScope.globals = $cookieStore.get('globals') || {};

        //console.log('config.myDomianName  = ' +  config.myDomianName) ;
        //console.log('$rootScope.globals  = ' +  $rootScope.globals) ;
        //console.log('$rootScope.globals.currentUser  = ' +  $rootScope.globals.currentUser) ;
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            //console.log('$rootScope.globals.currentUser.name  = ' +  $rootScope.globals.currentUser.username) ;
            //console.log('$rootScope.globals.currentUser.authdata  = ' +  $rootScope.globals.currentUser.authdata) ;
        }

        /*
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            //console.log(' inside $rootScope.globals  = ' +  $rootScope.globals) ;
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
        */
    }

})();
