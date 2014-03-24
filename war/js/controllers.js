'use strict';

/* Controllers */

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('HistoryListCtrl', ['$scope', 'History',
  function($scope, History) {
    //$scope.historys = History.query({gameId: 'historys'});
	$scope.historys = History.query();
  }]);

playerControllers.controller('HistoryDetailCtrl', ['$scope', '$routeParams', 'History',
  function($scope, $routeParams, History) {
    $scope.history = History.get({gameId: $routeParams.gameId});
  }]);
  
playerControllers.controller('ProfileCtrl', ['$scope', '$rootScope', 'Profile', '$window', '$routeParams', '$location', '$route',
  function($scope, $rootScope, Profile, $window, $routeParams, $location, $route) {

  	$scope.login = function () {
		//$scope.profile = Profile.get({playerId: $routeParams.playerId});
        $rootScope.profile = Profile.get({playerId: $scope.logPlayerId, password: $scope.logPassword});
        $location.path("/profile");

		/*
		if ($scope.profile.error == "WRONG_PASSWORD") {
			$window.alert("Failed. Wrong password.")
		} else if ($scope.profile.error == "WRONG_PLAYER_ID") {
			$window.alert("Failed. Wrong player ID.")
		} else if ($scope.profile.accessSignature) {
            $location.path("/profile") 
		};*/
		/*$route.reload();
		$window.alert($scope.profile.accessSignature);
		$window.alert($scope.profile.error);
		$window.alert($rootScope.profile.accessSignature);
		$window.alert($rootScope.profile.error);*/
			
	};

	$scope.edit = function () {
	    if ($scope.profilePassword == null) 
			$scope.profilePassword = $scope.profile.password;	
	    if ($scope.profileFirstname == null) 
			$scope.profileFirstname = $scope.profile.firstname;			
	    if ($scope.profileLastname == null) 
			$scope.profileLastname = $scope.profile.lastname;		
	    if ($scope.profileNickname == null) 
			$scope.profileNickname = $scope.profile.nickname;
		if ($scope.profileEmail == null)
			$scope.profileEmail = $scope.profile.email;
		if ($scope.profilePicUrl == null)
		    $scope.profilePicUrl = $scope.profile.pictureUrl;
		var newProfile = {
		  "playerId" : $scope.profile.playerId,
		  "accessSignature" : $scope.profile.accessSignature,
		  "password" : $scope.profilePassword,
		  "firstname" : $scope.profileFirstname,
		  "lastname" : $scope.profileLastname,
		  "nickname" : $scope.profileNickname,
		  "email" : $scope.profileEmail,
		  "pictureUrl" : $scope.profilePicUrl
		};
    	var editResponse = Profile.save({playerId:$scope.profile.playerId}, newProfile);
    	//if (editResponse.success == "UPDATED_PLAYER") {
            $window.alert("Edit profile successfully!");
            $location.path("/profile");
		/*} else if (editResponse.error == "WRONG_ACCESS_SIGNATURE") {
			$window.alert("Failed. Wrong access signature.");
		} else if (editResponse.error == "WRONG_PLAYER_ID") {
			$window.alert("Failed. Wrong player ID.");
		} */
	};
	
	$scope.delete = function() {
		var deleteResponse = Profile.delete({playerId:$scope.profile.playerId, accessSignature:$scope.profile.accessSignature});
    	//if (deleteResponse.success == "DELETED_PLAYER") {
            $window.alert("Delete account successfully!");
            $location.path("/login");
		/*} else if (deleteResponse.error == "WRONG_ACCESS_SIGNATURE") {
			$window.alert("Failed. Wrong access signature.");
		} else if (deleteResponse.error == "WRONG_PLAYER_ID") {
			$window.alert("Failed. Wrong player ID.");
		} */		
	};

	$scope.init = function() {
		if ($location.path() !== "/login" && angular.isUndefined($scope.profile.accessSignature)) {
			$rootScope.loginFail = true;
			$location.path("/login");
			$rootScope.$apply();
		}
	};
	$scope.init(); 
  }]);

playerControllers.controller('GameListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('/games/games.json').success(function(data) {
      $scope.games = data;
    });

    $scope.orderProp = 'developerId';
  }]);

playerControllers.controller('GameDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('/games/' + $routeParams.gameId + '.json').success(function(data) {
      $scope.game = data;
    });
  }]);

