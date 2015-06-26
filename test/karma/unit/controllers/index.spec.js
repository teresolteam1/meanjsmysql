(function() {
    'use strict';

    describe('MEAN controllers', function() {

        describe('AuthenticationController', function() {

            // Load the controllers module
            beforeEach(module('mean.system'));

            var scope,
                AuthenticationController;

            beforeEach(inject(function($controller, $rootScope) {
                scope = $rootScope.$new();

                AuthenticationController = $controller('AuthenticationController', {
                    $scope: scope
                });
            }));

            it('should expose some global scope', function() {

                expect(scope.global).toBeTruthy();

            });

        });

    });

})();