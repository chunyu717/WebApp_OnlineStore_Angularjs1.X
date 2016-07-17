/* global malarkey:false, toastr:false, moment:false*/
(function() {
  'use strict';

  angular
    .module('hosen')
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('config', {
        myDomianName: 'http://122.116.214.159'
    });

})();
