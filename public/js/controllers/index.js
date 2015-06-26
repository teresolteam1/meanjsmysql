// angular.module('users', ['ui.bootstrap','countTo']);

angular.module('mean.system').controller('AuthenticationController', ['$scope', '$http', '$timeout', '$location', 'Global',
    function($scope, $http, $timeout, $location, Global) {
        $scope.global = Global;
        // $scope.global = Global;
        $scope.loginrequest = true;
        $scope.progressValue = 50;
console.log("hy");

if ($scope.global.user) $location.path('/intax');
if(!$scope.global.user) $location.path('/');
        // If user is signed in then redirect back home
        //if ($scope.global.user) $location.path('/');

        $scope.signup = function() {
            // $http.post('/auth/signup', $scope.credentials).success(function(response) {
            //     // If successful we assign the response to the global user model
            //     $scope.authentication.user = response;

            //     // And redirect to the index page
            //     $location.path('/');
            // }).error(function(response) {
            //     $scope.error = response.message;
            // });
        };
        console.log($scope.global.user)

        $scope.signin = function() {


            $scope.loginrequest = false;

            var amt = 100;
            console.log($scope.progressValue);
            $scope.progressValue = 50;
            $scope.counter = 10;
            $scope.max = 30;

            $timeout(function() {
                $scope.counter = $scope.counter + 31;
                $scope.dynamic = $scope.counter / $scope.max * 100;
            }, 100);
            //   $timeout(function() {
            $http.post('/users/session', $scope.credentials).success(function(response) { // If successful we assign the response to the global user model
                $scope.global.user = response;
                // console.log(response2);
                 console.log($scope.global.user)
                // if ($scope.global.user1) 
                $location.path('/intax');
                // And redirect to the index page

            }).error(function(response) {
                $scope.loginrequest = true;
                $scope.errorshow = true;
                $scope.error = response.message;
            });

            // }, 800);


        };
     //   console.log($scope.global.user)
    }
]);