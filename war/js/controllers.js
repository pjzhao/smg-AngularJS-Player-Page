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
  
playerControllers.controller('ProfileCtrl', ['$scope', '$rootScope', 'Profile', '$window', '$routeParams', '$location', '$http',
  function($scope, $rootScope, Profile, $window, $routeParams, $location, $http) {

  	$scope.login = function () {
		//$scope.profile = Profile.get({playerId: $routeParams.playerId});
        //$rootScope.profile = Profile.get({playerId: $scope.logPlayerId, password: $scope.logPassword});
        
	    $http.get('http://1.smg-server.appspot.com/players/' + $scope.logPlayerId + '?password=' + $scope.logPassword)
	    	.success(function(data) {
	      		$rootScope.profile = data;
	    	})
	    	.then(function() {
	    		$scope.loginResponse();
			});
	};

	$scope.loginResponse = function () {
		if ($scope.profile.error == "WRONG_PASSWORD") {
			$window.alert("Failed. Wrong password.")
		} else if ($scope.profile.error == "WRONG_PLAYER_ID") {
			$window.alert("Failed. Wrong player ID.")
		} else if ($scope.profile.accessSignature != null) {
			$rootScope.profile.playerId = $scope.logPlayerId;
			$rootScope.profile.password = $scope.logPassword;
            $location.path("/profile") 
		};
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
		$scope.newProfile = {
		  "playerId" : $scope.profile.playerId,
		  "accessSignature" : $scope.profile.accessSignature,
		  "password" : $scope.profilePassword,
		  "firstname" : $scope.profileFirstname,
		  "lastname" : $scope.profileLastname,
		  "nickname" : $scope.profileNickname,
		  "email" : $scope.profileEmail,
		  "pictureUrl" : $scope.profilePicUrl
		};
		$scope.newProfileStr = angular.toJson($scope.newProfile);
    	//Profile.save({playerId:$scope.profile.playerId}, newProfileStr)
    	$http.put('http://1.smg-server.appspot.com/players/' + $scope.profile.playerId, $scope.newProfileStr)
	    	.success(function(data) {
	    		$scope.editResponse = data;
	    	})
	    	.then(function() {
	    		$scope.etResponse();
	    	});
	};

	$scope.etResponse = function() {
		// Wait for Lisa's confirmation about the response message -- Pinji
    	//if ($scope.editResponse.success == "UPDATED_PLAYER") {
    	if ($scope.editResponse.ACCESSSIGNATURE != null) {
            $window.alert("Edit profile successfully!");
            $location.path("/profile");
            //The profile should receive from the server when the API supports all the attributes -- Pinji
            $rootScope.profile = $scope.newProfile;
		} else if ($scope.editResponse.error == "WRONG_ACCESS_SIGNATURE") {
			$window.alert("Failed. Wrong access signature.");
		} else if ($scope.editResponse.error == "WRONG_PLAYER_ID") {
			$window.alert("Failed. Wrong player ID.");
		} 
	};
	
	$scope.delete = function() {
		//var deleteResponse = Profile.delete({playerId:$scope.profile.playerId, accessSignature:$scope.profile.accessSignature});
		$http.delete('http://1.smg-server.appspot.com/players/' + $scope.profile.playerId + '?accessSignature=' + $scope.profile.accessSignature)
	    	.success(function(data) {
	      		$scope.deleteResponse = data;
	    	})
	    	.then(function() {
	    		$scope.dltResponse();
			});
	};

	$scope.dltResponse = function() {
    	if ($scope.deleteResponse.success == "DELETED_PLAYER") {
            $window.alert("Delete account successfully!");
            $location.path("/login");
		} else if ($scope.deleteResponse.error == "WRONG_ACCESS_SIGNATURE") {
			$window.alert("Failed. Wrong access signature.");
		} else if ($scope.deleteResponse.error == "WRONG_PLAYER_ID") {
			$window.alert("Failed. Wrong player ID.");
		} 	
	};

	$scope.logout = function() {
		$rootScope = {};
		$location.path("/login");
	};

	/* $scope.init = function() {
		if ((!($location.path() == "/login" || $location.path() == "/signup")) && angular.isUndefined($scope.profile.accessSignature)) {
			$rootScope.loginFail = true;
			$location.path("/login");
			$rootScope.$apply();
		}
	};
	$scope.init();  */
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

playerControllers.controller('SignUpCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$window', '$location',
  function($scope, $rootScope, $routeParams, $http, $window, $location) {
	$scope.signup = function () {
		$rootScope.createProfile = {
		  "email" : $scope.suEmail,
		  "password" : $scope.suPassword,
		  "firstname" : $scope.suFirstname,
		  "lastname" : $scope.suLastname,
		  "nickname" : $scope.suNickname,
		  "pictureUrl" : $scope.suPicUrl
		};
		$rootScope.createProfileStr = angular.toJson($scope.createProfile);

		$http({
		    method: 'POST',
		    url: 'http://1.smg-server.appspot.com/players',
		    data: $scope.createProfileStr,
		    headers: {'Content-Type': 'application/json'}
		})
		.success(function(data) {
			$rootScope.signupResponse = data;
		})
		.then(function() {
			$scope.suResponse(); 
		});
    };

    $scope.suResponse = function () {
		if ($scope.signupResponse.error == "EMAIL_EXISTS") {
			$window.alert("Failed. The email already exists.")
		} else if ($scope.signupResponse.error == "PASSWORD_TOO_SHORT") {
			$window.alert("Failed. The password is too short. Please use at least 6 characters.")
		} else if ($scope.signupResponse.accessSignature != null) {
			$window.alert("Welcome, new player! Please remember your player ID:" + $scope.signupResponse.playerId);
			$rootScope.profile = $rootScope.createProfile;
			$rootScope.profile.playerId = $scope.signupResponse.playerId;
			$rootScope.profile.accessSignature = $scope.signupResponse.accessSignature;
            $location.path("/profile") 
		};
    };
  }]);