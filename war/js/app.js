"use strict";

/* App Module */

var playerApp = angular.module("playerApp", [
  "ngCookies",
  "ngAnimate",
  "ngRoute",
  "profileFilters",
  "playerControllers",
  "profileServices"
]);
//var server = "http://1.smg-server.appspot.com/";

playerApp.config(["$routeProvider", "$httpProvider",
  function($routeProvider, $httpProvider) {
   //$locationProvider.html5Mode(true);
    
    $routeProvider.
      //Login and Signup are only for test and debug -- Pinji
      when("/login", {
        templateUrl: "/partials/login.html",
        controller: "LoginCtrl"
      }).        
      when("/signup", {
        templateUrl: "/partials/signup.html",
        controller: "SignUpCtrl"
      }).       
      when("/profile/:userId", {
        templateUrl: "/partials/view-profile.html",
        controller: "ProfileCtrl"
      }).    
      when("/user/:userId", {
        templateUrl: "/partials/view-profile.html",
        controller: "UserCtrl"
      }).  
      when("/opponent/:opponentId", {
         templateUrl: "/partials/opponent.html",
         controller: "OpponentCtrl"
     }).
      when("/editprofile", {
        templateUrl: "/partials/edit-profile.html",
        controller: "EditCtrl"
      }).
      /*when("/history", {
        templateUrl: "/partials/history-list.html",
        controller: "HistoryListCtrl"
      }).*/
      when("/history/:gameId", {
      //  when("/history:gameId", {
        templateUrl: "/partials/history-detail.html",
        controller: "HistoryDetailCtrl"
      }).
      when("/choosegame", {
        templateUrl: "/partials/game-list.html",
        controller: "GameListCtrl"
      }).
      when("/choosegamestats/:gameId", {
        templateUrl: "/partials/game-stats.html",
        controller: "GameStatsCtrl"
      }).
      when("/choosegamedetail/:gameId", {
        templateUrl: "/partials/game-detail.html",
        controller: "GameDetailCtrl"
      }).
      when("/analysis", {
        templateUrl: "/partials/history-analysis.html",
        controller: "AnalysisCtrl"
      }).
      otherwise({
        redirectTo: "/choosegame"
      });
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }]);