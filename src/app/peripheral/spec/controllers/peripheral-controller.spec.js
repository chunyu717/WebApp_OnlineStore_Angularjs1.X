(function() {
  'use strict';
describe('Controller: peripheralCtrl', function () {
// load the controller's module
  beforeEach(module('hosen'));
  
  var peripheralCtrl,
      scope;
// Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    peripheralCtrl = $controller('peripheralCtrl', {
      $scope: scope
    });
  }));
  /*
  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
  */
});
})();
