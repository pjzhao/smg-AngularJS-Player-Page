'use strict';

/* App Module */

var profileApp = angular.module('profileApp', [
  'ngRoute',
  'profileFilters',
  'profileControllers',
  'profileServices'
]);

profileApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/historys', {
        templateUrl: 'partials/history-list.html',
        controller: 'HistoryListCtrl'
      }).
      when('/historys/:gameId', {
        templateUrl: 'partials/history-detail.html',
        controller: 'HistoryDetailCtrl'
      }).
      otherwise({
        redirectTo: '/historys'
      });
  }]);
