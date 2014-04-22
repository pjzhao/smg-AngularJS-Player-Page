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

playerApp.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", '$sceDelegateProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider, $sceDelegateProvider) {
  $urlRouterProvider.otherwise('/choosegame');
  $stateProvider
  .state('choosegame', {
    title: "Choose Game",
    url: '/choosegame',
    templateUrl: '/partials/game-list.html',
    controller: "GameListCtrl"
  })
  .state('historylist', {
      title: "History List",
      url: '/historylist',
      templateUrl: '/partials/history-list.html',
      controller: "HistoryListCtrl"
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
  .state("playgame", {
    title: "Play Game",
    url: "/playgame",
    templateUrl: "/partials/play-game.html",
    controller: "PlayGameCtrl"
  })  ;

  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  
  $sceDelegateProvider.resourceUrlWhitelist([
     // Allow same origin resource loads.
     'self',
     // Allow loading from our assets domain.  Notice the difference between * and **.
     'http://smg-angularjs-container.appspot.com/index.html#/lobby/**']);
}]);

playerApp.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
  }]);