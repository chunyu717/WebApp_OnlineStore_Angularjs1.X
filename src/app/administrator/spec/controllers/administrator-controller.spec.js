'use strict';
describe('Controller: administratorCtrl', function () {
// load the controller's module
  beforeEach(module('hosen'));
  var administratorCtrl,
      scope;
// Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    administratorCtrl = $controller('administratorCtrl', {
      $scope: scope
    });
  }));
  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
