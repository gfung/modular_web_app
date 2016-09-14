'use strict';

angular.module('myApp.log_in', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login.html',
    controller: 'login'
  });
}])

.controller('login', [function() {

}]);