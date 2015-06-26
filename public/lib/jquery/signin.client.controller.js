
// angular.module('users', ['ui.bootstrap','countTo']);
angular.module('app').controller('AuthenticationController', ['$scope', '$http', '$timeout', '$location', 'Authentication',
    function($scope, $http, $timeout, $location, Authentication) {
        $scope.authentication = Authentication;
        $scope.loginrequest = true;
        // If user is signed in then redirect back home
        if ($scope.authentication.user) $location.path('/');

        $scope.signup = function() {
            $http.post('/auth/signup', $scope.credentials).success(function(response) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = response;

                // And redirect to the index page
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        $scope.signin = function() {


            $scope.loginrequest = false;

            var amt = 100;

            $scope.countTo = amt;
            $scope.countFrom = 0;
            $timeout(function() {
                $scope.progressValue = amt;
                $scope.countFrom = amt;
            }, 100);
            $timeout(function() {
                $http.post('/auth/signin', $scope.credentials).success(function(response) { // If successful we assign the response to the global user model
                    $scope.authentication.user = response;
                    $location.path('/new');
                    // And redirect to the index page

                }).error(function(response) {
                    $scope.loginrequest = true;
                    $scope.errorshow = true;
                    $scope.error = response.message;
                });

            }, 800);


        };
    }
]);