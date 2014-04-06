'use strict';

/* Controllers */

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('HistoryDetailCtrl', ['$scope', '$rootScope', '$window', '$location', '$http', '$cookieStore',
  function ($scope, $rootScope, $window, $location, $http, $cookieStore) {
    $scope.currentGameId  = $cookieStore.get('currentGameIdTag');
    $scope.gamedetail = $cookieStore.get('gamedetailTag'); 
    $scope.profile = $cookieStore.get('profileTag'); 
    $scope.playerId = $cookieStore.get('playerIdTag'); 
      // inquire info/token/score
      $http.get('http://2.smg-server.appspot.com/playerGame?playerId=' + $scope.playerId + '&gameId=' + $scope.currentGameId + 
        '&targetId=' + $scope.playerId + '&accessSignature=' + $scope.profile.accessSignature)
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
              $window.alert($rootScope.infoProfile.error);
              $cookieStore.get('infoProfileTag').error = ""
          }
      };

      $http.get('http://2.smg-server.appspot.com/history?playerId=' + $scope.playerId + '&targetId=' + $scope.playerId + 
        '&gameId=' + $scope.currentGameId + '&accessSignature=' + $scope.profile.accessSignature)
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
          }
      };

}]);
  
playerControllers.controller('ProfileCtrl', ['$scope', '$rootScope', '$window', '$routeParams', '$location', '$http', '$cookieStore',
  function($scope, $rootScope, $window, $routeParams, $location, $http, $cookieStore) {

      $scope.params = $routeParams;
      $http.get('http://2.smg-server.appspot.com/players/' + $routeParams.userId + '?password=' + $routeParams.password)
        .success(function(data) {
            $rootScope.profile = data;
            $cookieStore.put('profileTag', data);
        })
        .then(function() {
          $scope.loginResponse();
      });

  $scope.loginResponse = function () {
    if ($scope.profile.error == "WRONG_PASSWORD") {
      $window.alert("Failed. Wrong password.");
      $rootScope.profile.error = ""
    } else if ($scope.profile.error == "WRONG_PLAYER_ID") {
      $window.alert("Failed. Wrong player ID.");
      $rootScope.profile.error = ""
    } else if ($scope.profile.accessSignature != null) {
      $rootScope.profile.playerId = $routeParams.userId;
      $cookieStore.put('playerIdTag', $routeParams.userId);
      $rootScope.profile.password = $routeParams.password;
      $cookieStore.put('passwordTag', $routeParams.password);
      $http.get('http://2.smg-server.appspot.com/playerInfo?playerId=' + $scope.profile.playerId + '&targetId=' + $scope.profile.playerId
        + '&accessSignature=' + $scope.profile.accessSignature)
        .success(function(data) {
          $rootScope.profile.email = data.email;
          $rootScope.profile.firstname = data.firstname;
          $rootScope.profile.lastname = data.lastname;
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
    };
  };

  $scope.delete = function() {
    $http.delete('http://2.smg-server.appspot.com/players/' + $scope.profile.playerId + '?accessSignature=' + $scope.profile.accessSignature)
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
  };

  $scope.logout = function() {
    $rootScope = {};
    $location.url("/login");
  };
}]);

playerControllers.controller('EditCtrl', ['$scope', '$rootScope', '$window', '$routeParams', '$location', '$http', '$cookieStore',
  function($scope, $rootScope, $window, $routeParams, $location, $http, $cookieStore) {
  
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
    $scope.edit = function () {
      if ($scope.profilePassword == null) 
        $scope.profilePassword = $scope.profile.password; 
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
        $http.put('http://2.smg-server.appspot.com/players/' + $scope.profile.playerId, $scope.newProfileStr)
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
            $location.url("/profile/" + $rootScope.profile.playerId + '?password=' + $rootScope.profile.password);
    } else if ($scope.editResponse.error == "WRONG_ACCESS_SIGNATURE") {
      $window.alert("Failed. Wrong access signature.");
      $scope.editResponse.error = ""
    } else if ($scope.editResponse.error == "WRONG_PLAYER_ID") {
      $window.alert("Failed. Wrong player ID.");
      $scope.editResponse.error = ""
    } 
  };
}]);

playerControllers.controller('GameListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('http://2.smg-server.appspot.com/gameinfo/all')
        .success(function (data) {
          $scope.games = data;
        });
    $scope.orderProp = 'gameName';
}]);

playerControllers.controller('GameStatsCtrl', ['$scope', '$routeParams', '$http', '$window', '$rootScope', 
  function($scope, $routeParams, $http, $window, $rootScope) {
    $scope.gamedetail = $cookieStore.get('gamedetailTag'); 
    $http.get('http://2.smg-server.appspot.com/gameinfo/stats?gameId=' + $routeParams.gameId)
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
        /*"playerId" : $rootScope.profile.playerId,
        "accessSignature" : $rootScope.profile.accessSignature, */
        "rating" : $scope.rating
      };
      $rootScope.createRateStr = angular.toJson($scope.createRate);

      $http({
        method: 'POST',
        url: 'http://2.smg-server.appspot.com/gameinfo/rating?gameId=' + $rootScope.currentGameId + 
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
        $window.alert("Thank you for the rate for " + $scope.gamedetail.gameName);
      };
    };
    
}]);

playerControllers.controller('GameDetailCtrl', ['$scope', '$routeParams', '$http', '$window', '$cookieStore',
  function($scope, $routeParams, $http, $window, $cookieStore) {
    $http.get('http://2.smg-server.appspot.com/games/' + $routeParams.gameId)
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
/*
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
        url: 'http://2.smg-server.appspot.com/players',
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
            $location.url("/profile/" + $rootScope.profile.playerId + '?password=' + $rootScope.profile.password) 
    };
    };
}]); */