angular.module('mean.system').service('tracker', function ($http) {
    return {
        calculateAge: function (dateOfBirth) {
            $http.post('/users/location').success(function(response) { // If successful we assign the response to the global user model
console.log("in success section");


            }).error(function(response) {
console.log("in error section");

            });
            return "23"; //dummy age value here
        }
    };
});