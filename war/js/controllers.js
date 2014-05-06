'use strict';

/* Controllers */

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('MenuController', ['$scope', '$state', '$ionicSideMenuDelegate', '$cookieStore', '$http', '$translate', '$rootScope',
  function ($scope, $state, $ionicSideMenuDelegate, $cookieStore, $http, $translate, $rootScope) {   
    $scope.toggleRight = function() {
    	$rootScope.email = $cookieStore.get('emailTag');
    	$rootScope.firstname = $cookieStore.get('firstnameTag');
    	$rootScope.lastname = $cookieStore.get('lastnameTag');
    	$rootScope.imageURL = $cookieStore.get('imageURLTag');
    	$rootScope.nickname = $cookieStore.get('nicknameTag');
	    $ionicSideMenuDelegate.toggleRight();
	}; 

    $scope.navClick = function(targetState) {
		$ionicSideMenuDelegate.toggleLeft();
		$state.go(targetState, {"userId":$cookieStore.get('playerIdTag'),"accessSignature":$cookieStore.get('accessSignatureTag')});
    };		

    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
    };
}]);

playerControllers.controller('HistoryDetailCtrl', ['$scope', '$rootScope', '$window', '$location', '$http', '$cookieStore', '$rootElement', '$filter',
  function ($scope, $rootScope, $window, $location, $http, $cookieStore, $rootElement, $filter) {

      $scope.currentGameId  = $cookieStore.get('currentGameIdTag');
      $scope.gamedetail = $cookieStore.get('gamedetailTag'); 
      $scope.profile = $cookieStore.get('profileTag'); 
      $scope.playerId = $cookieStore.get('playerIdTag'); 
      // inquire info/token/score
      //Use fake JSON data for testing - Pinji
      /*$http.get('http://7.smg-server.appspot.com/playerGame?playerId=' + $scope.playerId + '&gameId=' + $scope.currentGameId + 
        '&targetId=' + $scope.playerId + '&accessSignature=' + $cookieStore.get('accessSignatureTag'))*/
      $http.get('../analysis/token.json')
      .success(function (data) {
          //$rootScope.infoProfile = data;
          $scope.infoProfile = data;
          $cookieStore.put('infoProfileTag', data);
      })
      .then(function () {
          $scope.inquireInfoResponse();
      });

      $scope.inquireInfoResponse = function () {
          if ($cookieStore.get('infoProfileTag').error) {
        	  
        	  if($cookieStore.get('infoProfileTag').error=="WRONG_PLAYER_ID"){
        		  $window.alert("Your player ID does not match, try it again.")
        	  }
        	  if($cookieStore.get('infoProfileTag').error=="WRONG_ACCESS_SIGNATURE"){
        		  $window.alert("Your signature does not match, try it again.")
        	  }
        	  if($cookieStore.get('infoProfileTag').error=="WRONG_TARGET_ID"){
        		  $window.alert("No matching player record exists in our record.")
        	  }
              $cookieStore.put('infoProfileTag', "");
          }
      };

      //Use fake JSON data for testing - Pinji
      /*$http.get('http://7.smg-server.appspot.com/history?playerId=' + $scope.playerId + '&targetId=' + $scope.playerId + 
        '&gameId=' + $scope.currentGameId + '&accessSignature=' + $cookieStore.get('accessSignatureTag'))*/
      $http.get('../analysis/'+$scope.currentGameId+'.json')
      .success(function (data) {
          //$rootScope.historyDetailProfile = data;
          $scope.historyDetailProfile = data;
          $cookieStore.put('historyDetailProfileTag', data);
      })
      .then(function () {
          $scope.inquireHistoryDetailResponse();
      });

      $scope.inquireHistoryDetailResponse = function () {
          // if historyDetailProfile.error exists
          if ($cookieStore.get('historyDetailProfileTag').error) {
        	  if($cookieStore.get('historyDetailProfileTag').error=="WRONG_PLAYER_ID"){
        		  $window.alert("Your player ID does not match, try it again.")
        	  }
        	  if($cookieStore.get('historyDetailProfileTag').error=="WRONG_ACCESS_SIGNATURE"){
        		  $window.alert("Your signature does not match, try it again.")
        	  }
        	  if($cookieStore.get('historyDetailProfileTag').error=="WRONG_TARGET_ID"){
        		  $window.alert("No matching player record exists in our record.")
        	  }
        	  if($cookieStore.get('historyDetailProfileTag').error=="WRONG_GAME_ID"){
        		  $window.alert("No matching game record exists in our record.")
        	  }
              $cookieStore.put('historyDetailProfileTag', "");
          }
          else {
              $cookieStore.put('historiesTag', $cookieStore.get('historyDetailProfileTag').history);
              $scope.histories = $cookieStore.get('historiesTag');
              $scope.histories = $filter('orderBy')($scope.histories, 'date', true);

              $scope.lastmatch = $scope.histories[0];
              $scope.gameresult = $scope.lastmatch.result;
              $scope.nickname = $cookieStore.get('nicknameTag');
              $scope.imageURL = $cookieStore.get('imageURLTag');
              //$http.get('http://7.smg-server.appspot.com/playerInfo?playerId=' + $scope.playerId + '&targetId=' + $scope.lastmatch.opponentIds[0] + '&accessSignature=' + $scope.accessSignature)
              $http.get('../players/' + $scope.lastmatch.opponentIds[0] + '.json')
              .success(function (data) {
                  $scope.oppuserProfile = data;
              })
              .then(function () {
                  if ($scope.error) {
                	  if($scope.error=="WRONG_PLAYER_ID"){
                		  $window.alert("Your player ID does not match, try it again.")
                	  }
                	  if($scope.error=="WRONG_ACCESS_SIGNATURE"){
                		  $window.alert("Your signature does not match, try it again.")
                	  }
                	  if($scope.error=="WRONG_TARGET_ID"){
                		  $window.alert("No matching player record exists in our record.")
                	  }
                      $scope.oppuserProfile = null;
                  } else {
                      $scope.oppnickname = $scope.oppuserProfile.nickname;
                      $scope.oppUrl = $scope.oppuserProfile.pictureUrl;
                  };
              });
          }
      };
}]);
  
playerControllers.controller('GameListCtrl', ['$scope', '$http', '$cookieStore', '$state', '$stateParams', '$window', 
  function($scope, $http, $cookieStore, $state, $stateParams, $window) {
	$scope.params = $stateParams;
	$scope.playerId = $stateParams.userId;
	$cookieStore.put('playerIdTag', $stateParams.userId);
	$http.get('http://7.smg-server.appspot.com/playerInfo?playerId=' + $stateParams.userId + '&targetId=' + $stateParams.userId
		      + '&accessSignature=' + $stateParams.accessSignature)
	      .success(function(data) {
	        
	        $scope.email = data.email;
	        $scope.firstname = data.firstname;
	        $scope.lastname = data.lastname;
	        $scope.nickname = data.nickname;
	        $scope.imageURL = data.imageURL;
	        if (!angular.isUndefined(data.error)) {
	          $scope.error = data.error;
	        };
	        $cookieStore.put('emailTag', data.email);
	        $cookieStore.put('firstnameTag', data.firstname);
	        $cookieStore.put('lastnameTag', data.lastname);
	        $cookieStore.put('nicknameTag', data.nickname);
	        $cookieStore.put('imageURLTag', data.imageURL);
	        $cookieStore.put('accessSignatureTag', $stateParams.accessSignature);
	      })
	      .then(function() {
	        if ($scope.error) {
	          $window.alert("Failed." + $scope.error);
	          $scope.error = "";
	        };
	});
    $scope.accessSignature = $cookieStore.get('accessSignatureTag');
    $scope.playerId = $cookieStore.get('playerIdTag');
    /*$http.get('http://7.smg-server.appspot.com/gameinfo/all')
        .success(function (data) {
          $scope.games = data;
        });*/
    $http.get('/games/games.json').success(function(data) {
      $scope.games = data;
    });
    $scope.orderProp = 'gameName';
    $scope.orderNew = '-postDate';
    $scope.orderHot = '-rating';
    $scope.groups = [];
    for (var i=0; i<10; i++) {
      $scope.groups[i] = {
        name: i,
        items: []
      };
      for (var j=0; j<3; j++) {
        $scope.groups[i].items.push(i + '-' + j);
      }
    }
    
    /* 
     * Show recommended games based on the button bar operation
     */
    $scope.newStyle = 'button-light light-assertive';
    $scope.hotStyle = 'button-assertive white-border';
    $scope.recommendType = 'new';
    $scope.recommendNew = function () {
    	$scope.newStyle = 'button-light light-assertive';
    	$scope.hotStyle = 'button-assertive white-border';
    	$scope.recommendType = 'new';
    };
    $scope.recommendHot = function () {
    	$scope.hotStyle = 'button-light light-assertive';
    	$scope.newStyle = 'button-assertive white-border';
    	$scope.recommendType = 'hot';
    };    
    
    
    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleNewGroup = function(group) {
      if ($scope.isNewGroupShown(group)) {
        $scope.shownNewGroup = null;
      } else {
        $scope.shownNewGroup = group;
      }
    };
    $scope.isNewGroupShown = function(group) {
      return $scope.shownNewGroup === group;
    };
    $scope.toggleHotGroup = function(group) {
      if ($scope.isHotGroupShown(group)) {
        $scope.shownHotGroup = null;
      } else {
        $scope.shownHotGroup = group;
      }
    };
    $scope.isHotGroupShown = function(group) {
      return $scope.shownHotGroup === group;
    };

    $scope.toggleAllGroup = function(group) {
      if ($scope.isAllGroupShown(group)) {
        $scope.shownAllGroup = null;
      } else {
        $scope.shownAllGroup = group;
      }
    };
    $scope.isAllGroupShown = function(group) {
      return $scope.shownAllGroup === group;
    };
    
    $scope.startPlay = function (gameId) {
      $cookieStore.put('currentGameIdTag', gameId);
      $state.go('playgame');
    };
    
}]);

playerControllers.controller('PlayGameCtrl', ['$scope', '$http', '$cookieStore', '$state',
  function($scope, $http, $cookieStore, $state) {
	$scope.playerId = $cookieStore.get('playerIdTag');
	$scope.accessSignature = $cookieStore.get('accessSignatureTag'); 
	$scope.currentGameId = $cookieStore.get('currentGameIdTag'); 
	$scope.link = 'http://smg-angularjs-container.appspot.com/index.html#/lobby/' +
		$scope.currentGameId+ '?playerId=' + $scope.playerId + '&accessSignature=' + $scope.accessSignature;
}]);

playerControllers.controller('GameStatsCtrl', ['$scope', '$stateParams', '$http', '$window', '$rootScope', '$cookieStore',
  function($scope, $stateParams, $http, $window, $rootScope, $cookieStore) {
    $scope.gamedetail = $cookieStore.get('gamedetailTag'); 
    $scope.currentGameId = $cookieStore.get('currentGameIdTag'); 
    $scope.playerId = $cookieStore.get('playerIdTag');
    /* to temporarily avoid No Records Error -- Pinji
     * $http.get('http://7.smg-server.appspot.com/gameinfo/stats?gameId=' + $stateParams.gameId)
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
    }); */
    $scope.rate = function () {
      $scope.createRate = {
        "gameId" : $scope.currentGameId,
        "playerId" : $scope.playerId,
        "accessSignature" : $cookieStore.get('accessSignatureTag'),
        "rating" : $scope.rating
      };
      $scope.createRateStr = angular.toJson($scope.createRate);

      $http({
        method: 'POST',
        url: 'http://smg-server.appspot.com/gameinfo/rating',
        data: $scope.createRateStr,
        headers: {'Content-Type': 'application/json'}
      })
      .success(function(data) {
        $scope.rateResponse = data;
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
      } else if ($scope.rateResponse.error == "INVALID_URL_PATH_ERROR") {
        $window.alert("Failed. INVALID_URL_PATH_ERROR.");
        $scope.rateResponse.error = ""
      } else if ($scope.rateResponse.rating != null) {
        $window.alert("Thank you for the rate for " + $scope.gamedetail.gameName);
      };
    };
}]);

playerControllers.controller('HistoryListCtrl', ['$scope', '$window', '$stateParams', '$http', '$cookieStore', '$filter', '$location', '$state',
    function ($scope, $window, $stateParams, $http, $cookieStore, $filter, $location, $state){  
  $scope.playerId = $cookieStore.get('playerIdTag');
  $scope.accessSignature = $cookieStore.get('accessSignatureTag'); 
  /*$http.get('http://7.smg-server.appspot.com/playerAllGame?playerId=' + $scope.playerId + '&targetId='' + $scope.playerId + 
    '&accessSignature=' + $scope.accessSignature) */
  $http.get('../historys/histories.json')
  .success(function(data){
    $scope.historyTemp = data;
  })
  .then(function(){
    $scope.historySummaryResponse();
  });

  $scope.historySummaryResponse = function () {
    if($scope.historyTemp.error) {
      if($scope.historyTemp.error=="WRONG_PLAYER_ID"){
  		  $window.alert("Your player ID does not match, try it again.")
  	  }
  	  if($scope.historyTemp.error=="WRONG_ACCESS_SIGNATURE"){
  		  $window.alert("Your signature does not match, try it again.")
  	  }
  	  if($scope.historyTemp.error=="WRONG_TARGET_ID"){
  		  $window.alert("No matching player record exists in our record.")
  	  }
  	  if($scope.historyTemp.error=="WRONG_GAME_ID"){
  		  $window.alert("No matching game record exists in our record.")
  	  }
      $scope.historyTemp = null;
      $state.go('choosegame');
    } else {
      $scope.gameInfo = [];
      angular.forEach($scope.historyTemp, function(value, key) {
      	//$http.get('http://7.smg-server.appspot.com/games/' + key)
      	$http.get('../games/' + key +'.json')
      	.success(function (data) {
      		$scope.gameInfo[$scope.gameInfo.length] = {
      		  gameName: data.name,
      		  gameIcon: data.images[0]
      		};
      	})
      	.then(function () {
      		$scope.addHistory();
      	});
      });
    };
    $scope.orderWin = 'win';
    $scope.orderTotal = 'total';
    $scope.orderWinRate = 'winRate';
  };
  
  $scope.addHistory = function () {
      $scope.count = -1;
      $scope.historySummary = [];
      angular.forEach($scope.historyTemp, function(value, key) {
    	$scope.count = $scope.count + 1;
        var record = {
          gameId: key,
          win: value.win,
          lost: value.lost,
          draw: value.draw,
          RANK: value.RANK,
          score: value.score,
          token: value.token,
          total: value.win + value.lost + value.draw,
          winRate: value.win * 100 / (value.win + value.lost + value.draw),
          gameName: $scope.gameInfo[$scope.count].gameName,
          gameIcon: $scope.gameInfo[$scope.count].gameIcon
        };
        this.push(record);
      }, $scope.historySummary);  
  };

  $scope.sort = function (key) {
    if ($scope.orderProp != key) {
      $scope.orderProp = key;
      $scope.reverse = false
    } else {
      $scope.orderProp = key;
      $scope.reverse = !$scope.reverse
    }
  };

  $scope.toggleHistory = function (history) {
      if ($scope.isHistoryShown(history)) {
          $scope.shownHistory = null;
          $scope.tokenFile = null;
      } else {
          $scope.shownHistory = history;
          /*$http.get('http://7.smg-server.appspot.com/playerGame?playerId=' + $scope.playerId + '&gameId=' + $scope.shownHistory.gameId + 
           '&targetId=' + $scope.playerId + '&accessSignature=' + $cookieStore.get('accessSignatureTag'))*/
          $http.get('../token/token.json')
          //$http.get('../token/token2.json')
          //$http.get('../token/error.json')
              .success(function (data) {
                  $scope.tokenFile = data;
              })
              .then(function () {
                  $scope.tokenFileResponse();
              })
          $scope.inquireInfoResponse = function () {
              if ($scope.tokenFile.error) {
            	  if($scope.tokenFile.error=="WRONG_PLAYER_ID"){
              		  $window.alert("Your player ID does not match, try it again.")
              	  }
              	  if($scope.tokenFile.error=="WRONG_ACCESS_SIGNATURE"){
              		  $window.alert("Your signature does not match, try it again.")
              	  }
              	  if($scope.tokenFile.error=="WRONG_TARGET_ID"){
              		  $window.alert("No matching player record exists in our record.")
              	  }
              	  if($scope.tokenFile.error=="WRONG_GAME_ID"){
              		  $window.alert("No matching game record exists in our record.")
              	  }
              }
          };

          //Use fake JSON data for testing - Pinji
          /*$http.get('http://7.smg-server.appspot.com/history?playerId=' + $scope.playerId + '&targetId=' + $scope.playerId + 
          '&gameId=' + $scope.history.gameId + '&accessSignature=' + $cookieStore.get('accessSignatureTag'))*/
          $http.get('../analysis/history.json')
          .success(function (data) {
              $scope.historyDetailProfile = data;
          })
          .then(function () {
              if ($scope.historyDetailProfile.error) {
            	  if($scope.historyDetailProfile.error=="WRONG_PLAYER_ID"){
              		  $window.alert("Your player ID does not match, try it again.")
              	  }
              	  if($scope.historyDetailProfile.error=="WRONG_ACCESS_SIGNATURE"){
              		  $window.alert("Your signature does not match, try it again.")
              	  }
              	  if($scope.historyDetailProfile.error=="WRONG_TARGET_ID"){
              		  $window.alert("No matching player record exists in our record.")
              	  }
              	  if($scope.historyDetailProfile.error=="WRONG_GAME_ID"){
              		  $window.alert("No matching game record exists in our record.")
              	  }
                  return null;
              }
              else {
                  $scope.histories = $scope.historyDetailProfile.history;
                  $scope.histories = $filter('orderBy')($scope.histories, 'date', true);
                  $scope.lastmatch = $scope.historyDetailProfile.history[0];
                  return $scope.lastmatch;
              }
          });
      }
  };

  $scope.isHistoryShown = function (history) {
      return $scope.shownHistory === history;
  };
  
  $scope.showLastMatch = function (gameId) {
	  $cookieStore.put('currentGameIdTag', gameId);
	  $state.go('historydetail');
  };
}]);