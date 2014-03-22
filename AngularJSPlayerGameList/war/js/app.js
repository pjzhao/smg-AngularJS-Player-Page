'use strict';

/* App Module */

var gamelistApp = angular.module('gamelistApp', [
  'ngRoute',
  'gameControllers'
]);

gamelistApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/games', {
        templateUrl: 'partials/game-list.html',
        controller: 'GameListCtrl'
      }).
      when('/games/:gameId', {
        templateUrl: 'partials/game-detail.html',
        controller: 'GameDetailCtrl'
      }).
      otherwise({
        redirectTo: '/games'
      });
  }]);