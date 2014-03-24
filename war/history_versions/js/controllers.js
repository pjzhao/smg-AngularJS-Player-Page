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
  
playerControllers.controller('ProfileCtrl', ['$scope', 'Profile', '$window', '$routeParams', 
  function($scope, Profile, $window) {
  	$scope.login = function () {
  		var sPlayerId = $scope.logPlayerId;
  		var sPassword =  $scope.logPassword;
		$scope.profile = Profile.get({playerId: sPlayerId, password: sPassword});
		//$scope.profile = Profile.get({playerId: $routeParams.playerId});
		/*if ($scope.profilePassword == null) 
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
			$scope.profilePicUrl = $scope.profile.pictureUrl;*/
	};
	
	$scope.edit = function () {
		/*$scope.profile.nickname = $scope.profileNickname;
		$scope.profile.email = $scope.profileEmail;
		$scope.profile.pictureUrl = $scope.profilePicUrl;*/
		
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
		/*} else if (deleteResponse.error == "WRONG_ACCESS_SIGNATURE") {
			$window.alert("Failed. Wrong access signature.");
		} else if (deleteResponse.error == "WRONG_PLAYER_ID") {
			$window.alert("Failed. Wrong player ID.");
		} */		
	};
  }]);

playerControllers.controller('GameListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('games/games.json').success(function(data) {
      $scope.games = data;
    });

    $scope.orderProp = 'developerId';
  }]);

playerControllers.controller('GameDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('games/' + $routeParams.gameId + '.json').success(function(data) {
      $scope.game = data;
    });
  }]);

