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
  
  run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        //console.log('$rootScope.globals  = ' +  $rootScope.globals) ;
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
        
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            //console.log(' inside $rootScope.globals  = ' +  $rootScope.globals) ;
            /*
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
            */
        });
        
    }

})();
