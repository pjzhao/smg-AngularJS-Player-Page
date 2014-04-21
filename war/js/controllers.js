'use strict';

/* Controllers */

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('HistoryDetailCtrl', ['$scope', '$rootScope', '$window', '$location', '$http', '$cookieStore', '$rootElement', 
  function ($scope, $rootScope, $window, $location, $http, $cookieStore, $rootElement) {

    //facebook init - Pinji
    window.fbAsyncInit = function() {
    FB.init({
      appId      : '234746240060785',
      status     : true,
      xfbml      : true
    });
    };

    (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/all.js";
     fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    var metaDesc = angular.element($rootElement.find('meta[name=fbtitle]')[0]);
    metaDesc.attr('content', 'SMG Player Achivements2');
    //end of facebook init

    $scope.currentGameId  = $cookieStore.get('currentGameIdTag');
    $scope.gamedetail = $cookieStore.get('gamedetailTag'); 
    $scope.profile = $cookieStore.get('profileTag'); 
    $scope.playerId = $cookieStore.get('playerIdTag'); 
      // inquire info/token/score
      //Use fake JSON data for testing - Pinji
      /*$http.get('http://4.smg-server.appspot.com/playerGame?playerId=' + $scope.playerId + '&gameId=' + $scope.currentGameId + 
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
              $window.alert($cookieStore.get('infoProfileTag').error);
              $cookieStore.put('infoProfileTag', "");
          }
      };

      //Use fake JSON data for testing - Pinji
      /*$http.get('http://4.smg-server.appspot.com/history?playerId=' + $scope.playerId + '&targetId=' + $scope.playerId + 
        '&gameId=' + $scope.currentGameId + '&accessSignature=' + $cookieStore.get('accessSignatureTag'))*/
        $http.get('../analysis/history.json')
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
              $window.alert($cookieStore.get('historyDetailProfileTag').error);
              $cookieStore.put('historyDetailProfileTag', "");
          }
          else {
                $cookieStore.put('historiesTag', $cookieStore.get('historyDetailProfileTag').history);
                $scope.histories = $cookieStore.get('historiesTag');
                $scope.lastmatch = $scope.histories[9];
                if ($scope.lastmatch.result == "DRAW") {
                    $scope.gameresult = "Draw";
                } else if ($scope.lastmatch.result == "WIN") {
                    $scope.gameresult = "You win! Good job.";
                } else if ($scope.lastmatch.result == "LOST") {
                    $scope.gameresult = "You lose! Never mind.";
                }
          }
      };

      //$http.get('http://4.smg-server.appspot.com/playerInfo?playerId=' + $scope.playerId + '&targetId=' + $scope.playerId + '&accessSignature=' + $cookieStore.get('accessSignatureTag'))
      $http.get('../players/1234.json')
      .success(function (data) {
          $scope.userProfile = data;
      })
      .then(function () {
          if ($scope.userProfile.error) {
              $scope.userProfile = null;
          } else {
              $scope.username = $scope.userProfile.firstname + " " + $scope.userProfile.lastname;
              $scope.usernickname = $scope.userProfile.nickname;
          };
      });
      //$http.get('http://4.smg-server.appspot.com/playerInfo?playerId=' + $scope.playerId + '&targetId=' + $scope.lastmatch.opponentIds[0] + '&accessSignature=' + $scope.accessSignature)
      $http.get('../players/1234.json')
      .success(function (data) {
          $scope.oppuserProfile = data;
      })
       .then(function () {
           if ($scope.error) {
               $scope.oppuserProfile = null;
           } else {
               $scope.oppname = $scope.oppuserProfile.firstname + " " + $scope.oppuserProfile.lastname;
               $scope.oppnickname = $scope.oppuserProfile.nickname;
           };
       });
}]);


playerControllers.controller('UserCtrl', ['$scope', '$window', '$routeParams', '$location', '$http', '$cookieStore',
  function($scope, $window, $routeParams, $location, $http, $cookieStore) {
    $scope.readOnly = true;
    $scope.params = $routeParams;
    $scope.myId = $cookieStore.get('playerIdTag');
    $http.get('http://4.smg-server.appspot.com/playerInfo?playerId=' + $scope.myId + '&targetId=' + $routeParams.userId
      + '&accessSignature=' + $cookieStore.get('accessSignatureTag'))
    .success(function(data) {
      $scope = data;
      $scope.playerId = $routeParams.userId;
    })
    .then(function() {
      if ($scope.error) {
        $window.alert($scope.error);
      };
    });
}]);

  
playerControllers.controller('ProfileCtrl', ['$scope', '$rootScope', '$window', '$routeParams', '$location', '$http', '$cookieStore', '$rootElement',
  function($scope, $rootScope, $window, $routeParams, $location, $http, $cookieStore, $rootElement) {

    $scope.params = $routeParams;

    $http.get('http://4.smg-server.appspot.com/playerInfo?playerId=' + $routeParams.userId + '&targetId=' + $routeParams.userId
      + '&accessSignature=' + $routeParams.accessSignature)
      .success(function(data) {
        
        $scope.playerId = $routeParams.userId;
        $scope.email = data.email;
        $scope.firstname = data.firstname;
        $scope.lastname = data.lastname;
        $scope.nickname = data.nickname;
        $scope.imageURL = data.imageURL;
        if (!angular.isUndefined(data.error)) {
          $scope.error = data.error;
        };
        $cookieStore.put('playerIdTag', $routeParams.userId);
        $cookieStore.put('emailTag', data.email);
        $cookieStore.put('firstnameTag', data.firstname);
        $cookieStore.put('lastnameTag', data.lastname);
        $cookieStore.put('nicknameTag', data.nickname);
        $cookieStore.put('imageURLTag', data.imageURL);
        $cookieStore.put('accessSignatureTag', $routeParams.accessSignature);
      })
      .then(function() {
        if ($scope.error) {
          $window.alert("Failed." + $scope.error);
          $scope.error = "";
        };
      });


    $scope.playerId = $cookieStore.get('playerIdTag');
    $scope.accessSignature = $cookieStore.get('accessSignatureTag'); 
    /*$http.get('http://4.smg-server.appspot.com/playerAllGame?playerId=' + $scope.playerId + '&targetId='' + $scope.playerId + 
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
        $window.alert($scope.historyTemp.error);
        $scope.historyTemp = null;
        $location.url("/profile/" + $scope.playerId + '?accessSignature=' + $scope.accessSignature);
      } else {
        $scope.historySummary = [];
        angular.forEach($scope.historyTemp, function(value, key) {
          var record = {
            gameId: key,
            win: value.win,
            lost: value.lost,
            draw: value.draw,
            RANK: value.RANK,
            score: value.score,
            token: value.token,
            total: value.win + value.lost + value.draw,
            winRate: value.win * 100 / (value.win + value.lost + value.draw)
          };
          this.push(record);
        }, $scope.historySummary);
      };
      $scope.orderWin = 'win';
      $scope.orderTotal = 'total';
      $scope.orderWinRate = 'winRate';
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
    /*$scope.delete = function() {
      $http.delete('http://4.smg-server.appspot.com/players/' + $scope.playerId + '?accessSignature=' + $cookieStore.get('accessSignatureTag'))
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
              $location.url("/login");
      } else if ($scope.deleteResponse.error == "WRONG_ACCESS_SIGNATURE") {
        $window.alert("Failed. Wrong access signature.");
        $scope.deleteResponse.error = ""
      } else if ($scope.deleteResponse.error == "WRONG_PLAYER_ID") {
        $window.alert("Failed. Wrong player ID.");
        $scope.deleteResponse.error = ""
      }   
    }; */

}]);

playerControllers.controller('EditCtrl', ['$scope', '$rootScope', '$window', '$routeParams', '$location', '$http', '$cookieStore',
  function($scope, $rootScope, $window, $routeParams, $location, $http, $cookieStore) {
    $scope.playerId = $cookieStore.get('playerIdTag');   
    if ($scope.profileFirstname == null)
      $scope.profileFirstname = $cookieStore.get('firstnameTag');
      //$scope.profileFirstname = $scope.profile.firstname;
    if ($scope.profileLastname == null)
      $scope.profileLastname = $cookieStore.get('lastnameTag');
      //$scope.profileLastname = $scope.profile.lastname;   
    if ($scope.profileNickname == null)
      $scope.profileNickname = $cookieStore.get('nicknameTag');
      //$scope.profileNickname = $scope.profile.nickname;
    if ($scope.profileEmail == null)
      $scope.profileEmail = $cookieStore.get('emailTag');
      //$scope.profileEmail = $scope.profile.email;
    if ($scope.profilePicUrl == null)
      //$scope.profilePicUrl = $scope.profile.pictureUrl;
    $scope.edit = function () {
      $scope.newProfile = {
        "playerId" : $scope.playerId,
        //"accessSignature" : $scope.profile.accessSignature,
        "accessSignature" : $cookieStore.get('accessSignatureTag'),
        "password" : $scope.profilePassword,
        "firstname" : $scope.profileFirstname,
        "lastname" : $scope.profileLastname,
        "nickname" : $scope.profileNickname,
        "email" : $scope.profileEmail,
        "pictureUrl" : $scope.profilePicUrl
      };
      $scope.newProfileStr = angular.toJson($scope.newProfile);
        $http.put('http://4.smg-server.appspot.com/players/' + $scope.playerId, $scope.newProfileStr)
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
      $location.url("/profile/" + $scope.playerId + '?accessSignature=' + $cookieStore.get('accessSignatureTag'));
    } else if ($scope.editResponse.error == "WRONG_ACCESS_SIGNATURE") {
      $window.alert("Failed. Wrong access signature.");
      $scope.editResponse.error = ""
    } else if ($scope.editResponse.error == "WRONG_PLAYER_ID") {
      $window.alert("Failed. Wrong player ID.");
      $scope.editResponse.error = ""
    } 
  };
}]);

playerControllers.controller('GameListCtrl', ['$scope', '$http', '$cookieStore',
  function($scope, $http, $cookieStore) {
    $scope.accessSignature = $cookieStore.get('accessSignatureTag');
    $scope.playerId = $cookieStore.get('playerIdTag');
    /*$http.get('http://4.smg-server.appspot.com/gameinfo/all')
        .success(function (data) {
          $scope.games = data;
        });*/
    $http.get('/games/games.json').success(function(data) {
      $scope.games = data;
    });
    $scope.orderProp = 'gameName';
    $scope.orderNew = '-postDate';
    $scope.orderHot = '-rating';
}]);

playerControllers.controller('GameStatsCtrl', ['$scope', '$routeParams', '$http', '$window', '$rootScope', '$cookieStore',
  function($scope, $routeParams, $http, $window, $rootScope, $cookieStore) {
    $scope.gamedetail = $cookieStore.get('gamedetailTag'); 
    $scope.currentGameId = $cookieStore.get('currentGameIdTag'); 
    $scope.playerId = $cookieStore.get('playerIdTag');
    $http.get('http://4.smg-server.appspot.com/gameinfo/stats?gameId=' + $routeParams.gameId)
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

playerControllers.controller('GameDetailCtrl', ['$scope', '$routeParams', '$http', '$window', '$cookieStore',
  function($scope, $routeParams, $http, $window, $cookieStore) {
    $scope.gameId = $cookieStore.get('currentGameIdTag');
    $scope.playerId = $cookieStore.get('playerIdTag');
    $scope.accessSignature = $cookieStore.get('accessSignatureTag');
    $http.get('http://4.smg-server.appspot.com/games/' + $routeParams.gameId)
    .success(function(data) {
      $scope.gamedetail = data;
      $cookieStore.put('gamedetailTag', $scope.gamedetail);
      $cookieStore.put('currentGameIdTag', $routeParams.gameId);
      $scope.currentGameId  = $cookieStore.get('currentGameIdTag');      
    }).then(function(gamedetail) {
      if ($scope.gamedetail.error == "WRONG_GAME_ID") {
        $window.alert("WRONG_GAME_ID, No such game!");
        $scope.gamedetail.error = ""
      }
    });
}]);

//Only for test and debug -- Pinji
playerControllers.controller('SignUpCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$window', '$location', '$cookieStore',
  function($scope, $rootScope, $routeParams, $http, $window, $location, $cookieStore) {
  $scope.signup = function () {
    $scope.createProfile = {
      "email" : $scope.suEmail,
      "password" : $scope.suPassword,
      "firstname" : $scope.suFirstname,
      "lastname" : $scope.suLastname,
      "nickname" : $scope.suNickname
    };
    $scope.createProfileStr = angular.toJson($scope.createProfile);

    $http({
        method: 'POST',
        url: 'http://4.smg-server.appspot.com/players',
        data: $scope.createProfileStr,
        headers: {'Content-Type': 'application/json'}
    })
    .success(function(data) {
      $scope.signupResponse = data;
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
        $cookieStore.put('accessSignatureTag', $scope.signupResponse.accessSignature);
        $scope.accessSignature = $cookieStore.get('accessSignatureTag');
        $cookieStore.put('playerIdTag', $scope.signupResponse.playerId);
        $scope.playerId = $cookieStore.get('playerIdTag');
        $location.url("/profile/" + $scope.playerId + '?accessSignature=' + $scope.accessSignature) 
      };
    };
}]); 

playerControllers.controller('AnalysisCtrl', ['$scope', '$rootScope', '$window', '$location', '$http', '$cookieStore',
  function ($scope, $rootScope, $window, $location, $http, $cookieStore) {

    $scope.gamedetail = $cookieStore.get('gamedetailTag'); 
    $scope.currentGameId  = $cookieStore.get('currentGameIdTag'); 
    $http.get('../analysis/history.json')
        .success(function (data) {
          $scope.history = data.history;
        })
        .then(function () {
          $scope.history[0].token = $scope.history[0].tokenChange;
          $scope.tokenMax = $scope.history[0].token;
          $scope.scoreMax = $scope.history[0].score;
          $scope.scoreMin = $scope.history[0].score;
          for (var i=1; i<10; i++) {
            $scope.history[i].token = $scope.history[i-1].token + $scope.history[i].tokenChange;
            if ($scope.history[i].token > $scope.tokenMax) {
              $scope.tokenMax = $scope.history[i].token;
            };
            if ($scope.history[i].score > $scope.scoreMax) {
              $scope.scoreMax = $scope.history[i].score;
            } else if ($scope.history[i].score < $scope.scoreMin) {
              $scope.scoreMin = $scope.history[i].score;
            };
          };
          $scope.tokenGap = $scope.tokenMax / 10;
          $scope.scoreMin = $scope.scoreMin - 10;
          $scope.scoreGap = ($scope.scoreMax - $scope.scoreMin) / 10;
        });

}]);

playerControllers.controller('OpponentCtrl', ['$scope', '$rootScope', '$window', '$location', '$http', '$routeParams', '$cookieStore',
    function ($scope, $rootScope, $window, $location, $http, $routeParams, $cookieStore) {
  
  $scope.playerId = $cookieStore.get('playerIdTag');
  $scope.accessSignature = $cookieStore.get('accessSignatureTag');   
  $scope.currentGameId  = $cookieStore.get('currentGameIdTag');       
  $scope.gamedetail = $cookieStore.get('gamedetailTag');                                     
  $http.get('http://4.smg-server.appspot.com/playerInfo?playerId=' + $scope.playerId + '&targetId=' + $routeParams.opponentId
      + '&accessSignature=' + $scope.accessSignature)
  .success(function(data) {
    $scope.oppProfile = data;
    $scope.oppProfile.playerId = $routeParams.opponentId;
  })
  .then(function() {
    $scope.oppResponse();
  });
  
  $scope.oppResponse = function() {
    if(oppProfile.error){
      $window.alert(oppProfile.error);
      $rootScope.oppProfile = ""
    }
  }
  
  $http.get('http://4.smg-server.appspot.com/playerGame?playerId=' + $scope.playerId + '&gameId=' + $scope.currentGameId + 
      '&targetId=' + $routeParams.opponentId + '&accessSignature=' + $scope.accessSignature)
      .success(function (data) {
        $scope.oppInfoProfile = data;
      })
      .then(function () {
        $scope.oppInquireInfoResponse();
      });
  
  $scope.oppInquireInfoResponse = function () {
    if ($scope.infoProfile.error) {
      $window.alert($scope.infoProfile.error);
      $scope.infoProfile.error = ""
    }
  };
  
  $http.get('http://4.smg-server.appspot.com/history?playerId=' + $scope.playerId + '&targetId=' + $routeParams.opponentId + 
      '&gameId=' + $scope.currentGameId + '&accessSignature=' + $scope.accessSignature)
      .success(function (data) {
        $scope.oppHistoryDetail = data;
      })
      .then(function () {
        $scope.oppInquireHistoryResponse();
      });
  
  $scope.oppInquireHistoryResponse = function () {
    // if historyDetailProfile.error exists
    if ($scope.oppHistoryDetail.error) {
      $window.alert($scope.oppHistoryDetail.error);
      $scope.historyDetailProfile = ""
    }
    // this is only when playerId=targetId
    else {
      $scope.oppHistories = $scope.oppHistoryDetail.history;
    }
  };
}]);

//Only for test and debug -- Pinji
playerControllers.controller('LoginCtrl', ['$scope', '$rootScope', '$window', '$routeParams', '$location', '$http', '$cookieStore',
  function($scope, $rootScope, $window, $routeParams, $location, $http, $cookieStore) {
    $scope.login = function() {
      $cookieStore.put('playerIdTag', $scope.logPlayerId);
      $cookieStore.put('passwordTag', $scope.logPassword);
      $http.get('http://4.smg-server.appspot.com/players/' + $scope.logPlayerId + '?password=' + $scope.logPassword)
      .success(function(data) {
        $scope.profile = data;
        //$rootScope.profile = data;
      })
      .then(function() {
        $scope.loginResponse();
      });
    };

    $scope.loginResponse = function () {
      if ($scope.profile.error == "WRONG_PASSWORD") {
        $window.alert("Failed. Wrong password.");
        $scope.profile.error = "";
        //$rootScope.profile.error = "";
      } else if ($scope.profile.error == "WRONG_PLAYER_ID") {
        $window.alert("Failed. Wrong player ID.");
        $scope.profile.error = "";
        //$rootScope.profile.error = ""
      } else if ($scope.profile.accessSignature != null) {
        //$rootScope.profile.playerId = $routeParams.userId;
        $cookieStore.put('accessSignatureTag', $scope.profile.accessSignature);
        $scope.accessSignature = $cookieStore.get('accessSignatureTag');
        $scope.playerId = $cookieStore.get('playerIdTag');
        $location.url("/profile/" + $scope.playerId + '?accessSignature=' + $scope.accessSignature);
      }
    };
}]);

playerControllers.controller('HistoryListCtrl', ['$scope', '$rootScope', '$window', '$routeParams', '$http', '$cookieStore', '$filter', '$location',
    function ($scope, $rootScope, $window, $routeParams, $http, $cookieStore, $filter, $location){  
  $scope.playerId = $cookieStore.get('playerIdTag');
  $scope.accessSignature = $cookieStore.get('accessSignatureTag'); 
  /*$http.get('http://4.smg-server.appspot.com/playerAllGame?playerId=' + $scope.playerId + '&targetId='' + $scope.playerId + 
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
      $window.alert($scope.historyTemp.error);
      $scope.historyTemp = null;
      $location.url("/profile/" + $scope.playerId + '?accessSignature=' + $scope.accessSignature);
    } else {
      $scope.historySummary = [];
      angular.forEach($scope.historyTemp, function(value, key) {
        var record = {
          gameId: key,
          win: value.win,
          lost: value.lost,
          draw: value.draw,
          RANK: value.RANK,
          score: value.score,
          token: value.token,
          total: value.win + value.lost + value.draw,
          winRate: value.win * 100 / (value.win + value.lost + value.draw)
        };
        this.push(record);
      }, $scope.historySummary);
    };
    $scope.orderWin = 'win';
    $scope.orderTotal = 'total';
    $scope.orderWinRate = 'winRate';
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
          /*$http.get('http://4.smg-server.appspot.com/playerGame?playerId=' + $scope.playerId + '&gameId=' + $scope.shownHistory.gameId + 
           '&targetId=' + $scope.playerId + '&accessSignature=' + $cookieStore.get('accessSignatureTag'))*/
          $http.get('../analysis/token.json')
              .success(function (data) {
                  $scope.tokenFile = data;
              })
              .then(function () {
                  $scope.tokenFileResponse();
              })
          $scope.inquireInfoResponse = function () {
              if ($scope.tokenFile.error) {
                  $window.alert($scope.tokenFile.error);
              }
          };

          //Use fake JSON data for testing - Pinji
          /*$http.get('http://4.smg-server.appspot.com/history?playerId=' + $scope.playerId + '&targetId=' + $scope.playerId + 
          '&gameId=' + $scope.history.gameId + '&accessSignature=' + $cookieStore.get('accessSignatureTag'))*/
          $http.get('../analysis/history.json')
          .success(function (data) {
              $scope.historyDetailProfile = data;
          })
          .then(function () {
              if ($scope.historyDetailProfile.error) {
                  $window.alert($scope.historyDetailProfile.error);
                  return null;
              }
              else {
                  $scope.lastmatch = $scope.historyDetailProfile.history[9];
                  return $scope.lastmatch;
              }
          });
      }
  };

  $scope.isHistoryShown = function (history) {
      return $scope.shownHistory === history;
  };
}]);
