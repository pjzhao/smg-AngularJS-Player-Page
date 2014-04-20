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
  "playerDirectives",
  "ionic"
]);

playerApp.config(["$stateProvider", "$urlRouterProvider", "$httpProvider",
  function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/choosegame');
  $stateProvider
  .state('choosegame', {
    title: "Choose Game",
    url: '/choosegame',
    templateUrl: '/partials/game-list.html',
    controller: "GameListCtrl"
  })
  .state('login', {
    title: "Log In",
    url: '/login',
    templateUrl: '/partials/login.html',
    controller: "LoginCtrl"
  })
  .state('signup', {
    title: "Sign Up",
    url: '/signup',
    templateUrl: '/partials/signup.html',
    controller: "SignUpCtrl"        
  })
  .state("profile", {
    title: "My Profile",
    url: "/profile/:userId",
    templateUrl: "/partials/view-profile.html",
    controller: "ProfileCtrl" 
  })
  .state("userprofile", {
    title: "Profile",
    url: "/user/:userId",
    templateUrl: "/partials/view-profile.html",
    controller: "UserCtrl"
  }) 
  .state("opponent", {
    title: "Know About Your Opponent",
    url: "/opponent/:opponentId",
    templateUrl: "/partials/opponent.html",
    controller: "OpponentCtrl"
  })
  .state("historydetail", {
    title: "Play History",
    url: "/history/:gameId",
    templateUrl: "/partials/history-detail.html",
    controller: "HistoryDetailCtrl"
  })
  .state("gamestats", {
    title: "Leaderboard",
    url: "/choosegamestats/:gameId",
    templateUrl: "/partials/game-stats.html",
    controller: "GameStatsCtrl"
  })
  .state("gamedetail", {
    title: "Game Detail",
    url: "/choosegamedetail/:gameId",
    templateUrl: "/partials/game-detail.html",
    controller: "GameDetailCtrl"
  })  
  .state("analysis", {
    title: "My Performance",
    url: "/analysis",
    templateUrl: "/partials/history-analysis.html",
    controller: "AnalysisCtrl"
  })
  .state("help", {
    title: "Help",
    url: "/help",
    templateUrl: "/partials/help.html"  
  });

  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

playerApp.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
  }]);