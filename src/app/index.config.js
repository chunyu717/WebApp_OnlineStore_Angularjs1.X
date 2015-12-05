(function() {
  'use strict';

 
 /*
 angular.module('hosen', ['reCAPTCHA'])
       .config(function (reCAPTCHAProvider) {
            // required: please use your own key :)
            reCAPTCHAProvider.setPublicKey('---KEY---');

            // optional: gets passed into the Recaptcha.create call
            reCAPTCHAProvider.setOptions({
                theme: 'clean'
            });
        })
   */     
 
  angular
    .module('hosen')
    .config(config);

  function config($logProvider, toastr) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;
    
    //cxnurl = 'http://cxn.com.tw:8888';
    
  }
  

})();
