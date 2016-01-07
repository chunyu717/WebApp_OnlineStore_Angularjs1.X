'use strict';
describe('Controller: registerCtrl', function () {
// load the controller's module
  beforeEach(module('hosen'));
  var registerCtrl,
      scope;
// Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    registerCtrl = $controller('registerCtrl', {
      $scope: scope
    });
  }));
  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
