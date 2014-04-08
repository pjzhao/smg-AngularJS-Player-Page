'use strict';

/* Controllers */

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('HistoryDetailCtrl', ['$scope', '$rootScope', '$window', '$location', '$http',
  function ($scope, $rootScope, $window, $location, $http) {
	//$http.get('http://3.smg-server.appspot.com/playerGame?playerId=' + $rootScope.profile.playerId + '&gameId=' + $rootScope.currentGameId + 
	//'&targetId=' + $rootScope.profile.playerId + '&accessSignature=' + $rootScope.profile.accessSignature)
	$http.get('../historys/' + $rootScope.profile.playerId + '/123456.json')
			.success(function (data) {
				$rootScope.infoProfile = data;
			})
			.then(function () {
 	            $scope.inquireInfoResponse();
			});

	$scope.inquireInfoResponse = function () {
		if ($rootScope.infoProfile.error) {
			$window.alert($rootScope.infoProfile.error);
			$rootScope.infoProfile.error = ""
		}
	};

	$http.get('http://3.smg-server.appspot.com/history?playerId=' + $rootScope.profile.playerId + '&targetId=' + $rootScope.profile.playerId + 
			'&gameId=' + $rootScope.currentGameId + '&accessSignature=' + $rootScope.profile.accessSignature)
			.success(function (data) {
				$rootScope.historyDetailProfile = data;
			})
			.then(function () {
				$scope.inquireHistoryDetailResponse();
			});

	$scope.inquireHistoryDetailResponse = function () {
		// if historyDetailProfile.error exists
		if ($rootScope.historyDetailProfile.error) {
			$window.alert($rootScope.historyDetailProfile.error);
			$rootScope.historyDetailProfile = ""
		}
		// this is only when playerId=targetId
		else {
			$rootScope.histories = $rootScope.historyDetailProfile.history;
		}
	};
}]);
  
playerControllers.controller('ProfileCtrl', ['$scope', '$rootScope', 'Profile', '$window', '$routeParams', '$location', '$http',
    function($scope, $rootScope, Profile, $window, $routeParams, $location, $http) {
	$scope.login = function () {
		//$http.get('http://2.smg-server.appspot.com/players/' + $scope.logPlayerId + '?password=' + $scope.logPassword)
		$http.get('http://3.smg-server.appspot.com/user/' + $scope.logPlayerId + '?password=' + $scope.logPassword)
		.success(function(data) {
			$rootScope.profile = data;
		})
		.then(function() {
			$scope.loginResponse();
		});
	};

	$scope.loginResponse = function () {
		if ($scope.profile.error == "WRONG_PASSWORD") {
			$window.alert("Failed. Wrong password.");
			$rootScope.profile.error = ""
		} else if ($scope.profile.error == "WRONG_USER_ID") {
			$window.alert("Failed. Wrong user ID.");
			$rootScope.profile.error = ""
		} else if ($scope.profile.accessSignature != null) {
			$rootScope.profile.playerId = $scope.logPlayerId;
			$rootScope.profile.password = $scope.logPassword;
			//$http.get('http://2.smg-server.appspot.com/playerInfo?playerId=' + $scope.profile.playerId + '&targetId=' + $scope.profile.playerId + '&accessSignature=' + $scope.profile.accessSignature)
			$http.get('http://3.smg-server.appspot.com/userinfo/' + $scope.profile.playerId + '?accessSignature=' + $scope.profile.accessSignature)
			.success(function(data) {
				$rootScope.profile.email = data.email;
				$rootScope.profile.firstname = data.firstName;
				$rootScope.profile.middlename = data.middleName;
				$rootScope.profile.lastname = data.lastName;
				$rootScope.profile.nickname = data.nickname;
			})
			.then(function() {
				$scope.loadProfile();
			});
		};
	};

	$scope.loadProfile = function () {
		if ($scope.profile.error == "WRONG_ACCESS_SIGNATURE") {
			$window.alert("Failed. Wrong access signature.");
			$rootScope.profile.error = ""
		} 
		else if($scope.profile.error=="WRONG_USER_ID"){
			$window.alert("Faild, User Id is not correct.");
			$rootScope.profile.error = ""
		}
		else if ($scope.profile.nickname != null) {
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
				"accessSignature" : $scope.profile.accessSignature,
				"email" : $scope.profileEmail,
				"password" : $scope.profilePassword,
				"firstname" : $scope.profileFirstname,
				"lastname" : $scope.profileLastname,
				"nickname" : $scope.profileNickname
				//"playerId" : $scope.profile.playerId,
				//"pictureUrl" : $scope.profilePicUrl
		};
		$scope.newProfileStr = angular.toJson($scope.newProfile);
		//Profile.save({playerId:$scope.profile.playerId}, newProfileStr)
		//$http.put('http://2.smg-server.appspot.com/players/' + $scope.profile.playerId, $scope.newProfileStr)
		$http.put('http://smg-server.appspot.com/userinfo/' + $scope.profile.playerId, $scope.newProfileStr)
		.success(function(data) {
			$scope.editResponse = data;
		})
		.then(function() {
			$scope.etResponse();
		});
	};

	$scope.etResponse = function() {
		if ($scope.editResponse.success == "UPDATED_PLAYER") {
			$window.alert("Edit profile successfully!");
			$location.path("/profile");
			//The profile should receive from the server when the API supports all the attributes -- Pinji
			$rootScope.profile = $scope.newProfile;
		} else if ($scope.editResponse.error == "WRONG_ACCESS_SIGNATURE") {
			$window.alert("Failed. Wrong access signature.");
			$scope.editResponse.error = ""
		} else if ($scope.editResponse.error == "WRONG_PLAYER_ID") {
			$window.alert("Failed. Wrong player ID.");
			$scope.editResponse.error = ""
	   } 
	};

	$scope.delete = function() {
		//var deleteResponse = Profile.delete({playerId:$scope.profile.playerId, accessSignature:$scope.profile.accessSignature});
		//$http.delete('http://2.smg-server.appspot.com/players/' + $scope.profile.playerId + '?accessSignature=' + $scope.profile.accessSignature)
		$http.delete('http://3.smg-server.appspot.com/user/' + $scope.profile.playerId + '?accessSignature=' + $scope.profile.accessSignature)
		.success(function(data) {
			$scope.deleteResponse = data;
		})
		.then(function() {
			$scope.dltResponse();
		});
	};

	$scope.dltResponse = function() {
		if ($scope.deleteResponse.success == "DELETED_USER") {
			$window.alert("Delete account successfully!");
			$location.path("/login");
		} else if ($scope.deleteResponse.error == "WRONG_ACCESS_SIGNATURE") {
			$window.alert("Failed. Wrong access signature.");
			$scope.deleteResponse.error = ""
		} else if ($scope.deleteResponse.error == "WRONG_PLAYER_ID") {
			$window.alert("Failed. Wrong player ID.");
			$scope.deleteResponse.error = ""
		}   
	 };

	 $scope.logout = function() {
		 $http.put('http://smg-server.appspot.com/userLogOut/' + $scope.profile.playerId + '?accessSignature=' + $scope.profile.accessSignature)
		 .success(function(data) {
			$scope.logOutInfo = data;
		})
		.then(function() {
			$scope.logOutResponse();
		});
	 };
	 
	 $scope.logOutResponse() = function(){
		 if($scope.logOutInfo.success){
			$rootScope = {};
			$location.path("/login");
			$scope.logOutInfo.success = ""
		 }else{
			$window.alert($scope.logOutInfo.error);
			$scope.logOutInfo.error = ""
		 }
	 }
}]);

playerControllers.controller('GameListCtrl', ['$scope', '$rootScope', '$http',
                                              function($scope, $rootScope, $http) {
	$http.get('http://3.smg-server.appspot.com/gameinfo/all')
	.success(function (data) {
			$rootScope.games = data;
	});
	$scope.orderProp = 'gameName';
}]);

playerControllers.controller('GameStatsCtrl', ['$scope', '$routeParams', '$http', '$window', '$rootScope', 
                                               function($scope, $routeParams, $http, $window, $rootScope) {

	$http.get('http://3.smg-server.appspot.com/gameinfo/stats?gameId=' + $routeParams.gameId)
	.success(function(data) {
		$scope.game = data;
	}).then(function(game) {
	     if ($scope.game.error == "NO_MATCH_RECORDS") {
	    	 $window.alert("NO_MATCH_RECORDS, No body played yet!");
	    	 $scope.game.error = ""
	     } else if ($scope.game.error == "WRONG_GAME_ID") {
	    	 $window.alert("WRONG_GAME_ID, No such game!");
	    	 $scope.game.error = ""
	     }
	});
	
	$scope.rate = function () {
		$rootScope.createRate = {
        "rating" : $scope.rating
      };
		
	$rootScope.createRateStr = angular.toJson($scope.createRate);

	$http({
		method: 'POST',
		url: 'http://3.smg-server.appspot.com/gameinfo/rating?gameId=' + $rootScope.currentGameId + 
		'&playerId=' + $rootScope.profile.playerId + '&accessSignature=' + $rootScope.profile.accessSignature,
		data: $rootScope.createRateStr,
		headers: {'Content-Type': 'application/json'}
	})
	.success(function(data) {
		$rootScope.rateResponse = data;
	})
	.then(function() {
		$scope.rtResponse(); 
	});
};

$scope.rtResponse = function () {
	if ($scope.rateResponse.error == "WRONG_RATING") {
		$window.alert("Failed. The rating is incorrectly formatted.");
		$scope.rateResponse.error = ""
	} else if ($scope.rateResponse.error == "WRONG_GAME_ID") {
		$window.alert("Failed. The gameId is wrong.");
		$scope.rateResponse.error = ""
	} else if ($scope.rateResponse.error == "WRONG_ACCESS_INFO") {
		$window.alert("Failed. The player access info is wrong.");
		$scope.rateResponse.error = ""
	} else if ($scope.rateResponse.rating != null) {
        $window.alert("Thank you for the rate for " + $rootScope.gamedetail.gameName);
	};
};
}]);

playerControllers.controller('GameDetailCtrl', ['$scope', '$routeParams', '$http', '$window', '$rootScope',
                                                function($scope, $routeParams, $http, $window, $rootScope) {
	$http.get('http://3.smg-server.appspot.com/games/' + $routeParams.gameId)
	.success(function(data) {
		$rootScope.gamedetail = data;
		$rootScope.currentGameId = $routeParams.gameId;
	}).then(function(gamedetail) {
		if ($rootScope.gamedetail.error == "WRONG_GAME_ID") {
			$window.alert("WRONG_GAME_ID, No such game!");
			$rootScope.gamedetail.error = ""
		}
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
				"nickname" : $scope.suNickname
				//"pictureUrl" : $scope.suPicUrl
		};
		$rootScope.createProfileStr = angular.toJson($scope.createProfile);

		$http({
			method: 'POST',
			url: 'http://3.smg-server.appspot.com/user',
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
			$window.alert("Failed. The email already exists.");
			$scope.signupResponse.error = ""
		} else if ($scope.signupResponse.error == "PASSWORD_TOO_SHORT") {
			$window.alert("Failed. The password is too short. Please use at least 6 characters.")
			$scope.signupResponse.error = ""
		} else if ($scope.signupResponse.accessSignature != null) {
			$window.alert("Welcome, new player! Please remember your player ID:" + $scope.signupResponse.playerId);
			$rootScope.profile = $rootScope.createProfile;
			$rootScope.profile.playerId = $scope.signupResponse.playerId;
			$rootScope.profile.accessSignature = $scope.signupResponse.accessSignature;
			$location.path("/profile") 
		};
	};
}]);

opponentControllers.controller('OpponentCtrl', ['$scope', '$rootScope', '$window', '$location', '$http', '$routeParams',
    function ($scope, $rootScope, $window, $location, $http, $routeParams) {
	
	$http.get('http://3.smg-server.appspot.com/userinfo/' + $routeParams.opponent + '?accessSignature=' + $rootScope.profile.accessSignature)
	.success(function(data) {
		$rootScope.oppProfile = data;
	})
	.then(function() {
		$scope.oppResponse();
	});
	
	$scope.oppResponse()=function(){
		if(oppProfile.error){
			$window.alert(oppProfile.error);
			$rootScope.oppProfile = ""
		}
	}
	
	$http.get('http://3.smg-server.appspot.com/playerGame?playerId=' + $rootScope.profile.playerId + '&gameId=' + $rootScope.currentGameId + 
			'&targetId=' + $routeParams.opponentId + '&accessSignature=' + $rootScope.profile.accessSignature)
	.success(function (data) {
	$scope.oppInfoProfile = data;
	})
	.then(function () {
	$scope.oppInquireInfoResponse();
	});

	$scope.oppInquireInfoResponse = function () {
		if ($rootScope.infoProfile.error) {
			$window.alert($rootScope.infoProfile.error);
			$rootScope.infoProfile.error = ""
		}
	};

	$http.get('http://3.smg-server.appspot.com/history?playerId=' + $rootScope.profile.playerId + '&targetId=' + $routeParams.opponentId + 
	'&gameId=' + $rootScope.currentGameId + '&accessSignature=' + $rootScope.profile.accessSignature)
	.success(function (data) {
	$rootScope.historyDetailProfile = data;
	})
	.then(function () {
   	$scope.inquireHistoryDetailResponse();
	});
	
	$scope.inquireHistoryDetailResponse = function () {
		// if historyDetailProfile.error exists
		if ($rootScope.historyDetailProfile.error) {
			$window.alert($rootScope.historyDetailProfile.error);
			$rootScope.historyDetailProfile = ""
		}
		// this is only when playerId=targetId
		else {
			$rootScope.histories = $rootScope.historyDetailProfile.history;
		}
	};
}]);
