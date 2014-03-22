'use strict';

/* Controllers */

var gameControllers = angular.module('gameControllers', []);

gameControllers.controller('GameListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('games/games.json').success(function(data) {
      $scope.games = data;
    });

    $scope.orderProp = 'developerId';
  }]);

gameControllers.controller('GameDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('games/' + $routeParams.gameId + '.json').success(function(data) {
      $scope.game = data;
    });
  }]);