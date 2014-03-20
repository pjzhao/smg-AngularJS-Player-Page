'use strict';

/* Controllers */

var profileControllers = angular.module('profileControllers', []);

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

