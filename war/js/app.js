'use strict';

/* App Module */

var playerApp = angular.module('playerApp', [
  'ngRoute',
  'profileFilters',
  'playerControllers',
  'profileServices'
]);

playerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/profile', {
        templateUrl: 'partials/view-profile.html',
        controller: 'ProfileCtrl'
      }).    
      when('/editprofile', {
        templateUrl: 'partials/edit-profile.html',
        controller: 'ProfileCtrl'
      }).       
      when('/history', {
        templateUrl: 'partials/history-list.html',
        controller: 'HistoryListCtrl'
      }).
      when('/history/:gameId', {
        templateUrl: 'partials/history-detail.html',
        controller: 'HistoryDetailCtrl'
      }).
      when('/choosegame', {
        templateUrl: 'partials/game-list.html',
        controller: 'GameListCtrl'
      }).
      when('/choosegame/:gameId', {
        templateUrl: 'partials/game-detail.html',
        controller: 'GameDetailCtrl'
      }).      
      otherwise({
        redirectTo: '/profile'
      });
  }]);
