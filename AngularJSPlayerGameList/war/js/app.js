"use strict";

/* App Module */

var playerApp = angular.module("playerApp", [
  "ngResource",
  "ngCookies",
  "ngAnimate",
  "ngRoute",
  "profileFilters",
  "playerControllers",
  "profileServices",
  "playerDirectives"
]);

playerApp.config(["$routeProvider", "$httpProvider",
  function($routeProvider, $httpProvider) {
   //$locationProvider.html5Mode(true);
    
    $routeProvider.
      //Login and Signup are only for test and debug -- Pinji
      when("/login", {
        title: "Log In",
        templateUrl: "/partials/login.html",
        controller: "LoginCtrl"
      }).        
      when("/signup", {
        title: "Sign Up",
        templateUrl: "/partials/signup.html",
        controller: "SignUpCtrl"
      }).       
      when("/profile/:userId", {
        title: "My Profile",
        templateUrl: "/partials/view-profile.html",
        controller: "ProfileCtrl"
      }).    
      when("/user/:userId", {
        title: "Profile",
        templateUrl: "/partials/view-profile.html",
        controller: "UserCtrl"
      }).  
      when("/opponent/:opponentId", {
        title: "Know About Your Opponent",
        templateUrl: "/partials/opponent.html",
        controller: "OpponentCtrl"
     }).
      when("/editprofile", {
        title: "Edit Profile",
        templateUrl: "/partials/edit-profile.html",
        controller: "EditCtrl"
      }).
      when("/history", {
        templateUrl: "/partials/history-list.html",
        controller: "HistoryListCtrl"
      }).
      when("/history/:gameId", {
        title: "Play History",
        templateUrl: "/partials/history-detail.html",
        controller: "HistoryDetailCtrl"
      }).
      when("/choosegame", {
        title: "Choose Your Game",
        templateUrl: "/partials/game-list.html",
        controller: "GameListCtrl"
      }).
      when("/choosegamestats/:gameId", {
        title: "Leaderboard",
        templateUrl: "/partials/game-stats.html",
        controller: "GameStatsCtrl"
      }).
      when("/choosegamedetail/:gameId", {
        title: "Game Detail",
        templateUrl: "/partials/game-detail.html",
        controller: "GameDetailCtrl"
      }).
      when("/analysis", {
        title: "My Performance",
        templateUrl: "/partials/history-analysis.html",
        controller: "AnalysisCtrl"
      }).
      otherwise({
        redirectTo: "/login"
      });
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }]);

playerApp.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
  }]);