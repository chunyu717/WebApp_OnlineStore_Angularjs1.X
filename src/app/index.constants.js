/* global malarkey:false, toastr:false, moment:false*/
(function() {
  'use strict';

  angular
    .module('hosen')
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('config', {
        myDomianName: 'http://localhost:8888'
    });

})();
