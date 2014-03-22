'use strict';

/* Controllers */

var profileControllers = angular.module('profileControllers', []);
var gameControllers = angular.module('gameControllers', []);

profileControllers.controller('HistoryListCtrl', ['$scope', 'History',
  function($scope, History) {
    //$scope.historys = History.query({gameId: 'historys'});
	$scope.historys = History.query();
  }]);

profileControllers.controller('HistoryDetailCtrl', ['$scope', '$routeParams', 'History',
  function($scope, $routeParams, History) {
    $scope.history = History.get({gameId: $routeParams.gameId});
  }]);
  
profileControllers.controller('ProfileCtrl', ['$scope', 'Profile',
  function($scope, Profile) {
	$scope.profile = Profile.get();
	$scope.profileNickname = $scope.profile.nickname;
	$scope.profileEmail = $scope.profile.email;
	$scope.profilePicUrl = $scope.profile.pictureUrl;
	$scope.edit = function () {
	$scope.profile.nickname = $scope.profileNickname;
	$scope.profile.email = $scope.profileEmail;
	$scope.profile.pictureUrl = $scope.profilePicUrl;
	};
  }]);

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

