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
  "ionic",
  "pascalprecht.translate"
]);

playerApp.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", '$sceDelegateProvider', '$translateProvider', 
  function($stateProvider, $urlRouterProvider, $httpProvider, $sceDelegateProvider, $translateProvider) {
  $translateProvider.translations('en', {
    'gamelistHome': 'Home',
    'gamelistRECOMMEND': 'RECOMMEND',
    'gamelistNewest': 'Newest',  
    'gamelistHottest': 'Hottest',
    'gamelistDeveloper': 'Developer',
    'gamelistInvite': 'Invite',
    'gamelistPlayNow': 'Play Now',
    'gamelistLastMatch': 'Last Match',
    'gamelistLeaderboard': 'Leaderboard',
    'gamelistSortbyName': 'Sort By Name',
    'gamelistSortbyDeveloper': 'Sort By Developer',
    'gamelistSortbypostDate': 'Sort By Post Date',
    'gamelistSortbyrating': 'Sort By Rate',
    'gamelistSearchbyName': ' Search By Name ...',
    'gamelistAllGame': 'ALL GAME',
    'gamestatLeaderboardTitle': 'LEADERBOARD',
    'gamestatHIGHESTSCORE': 'HIGHEST SCORE',
    'gamestatCURRENTMATCHES': 'CURRENT MATCHES',
    'gamestatFINISHEDMATCHES': 'FINISHED MATCHES',
    'gamestatRATE': 'RATE',
    'gamestatRateyougive': 'Rate you give',
    'gamestatAverageratingofthegame': 'Average rating of the game',
    'gamestatraterate': 'Rate',
    'hislistTitle': 'History',
    'hislistWin': 'Win',
    'hislistLose': 'Lose',
    'hislistDraw': 'Draw',
    'hislistAchievement': 'Achievement',
    'hislistToken': 'Token',
    'hislistRank': 'Rank',
    'hislistScore': 'Score',
    'hislistLastMatch': 'Last Match',
    'hisDetailTitle': 'Last Match',
    'hisDetailDATE': 'DATE',
    'hisDetailTOKEN': 'TOKEN',
    'hisDetailSCORE': 'SCORE',
    'indexHome': 'Home',
    'indexHistory': 'History',
    'indexSetting': 'Setting',
    BUTTON_TEXT_EN: 'English',
    BUTTON_TEXT_ZH: 'Chinese'
  });
 
  $translateProvider.translations('zh', {
    'gamelistHome': '主页',
    'gamelistRECOMMEND': '推荐',
    'gamelistNewest': '最新',  
    'gamelistHottest': '最热', 
    'gamelistDeveloper': '开发者',
    'gamelistInvite': '邀请好友',
    'gamelistPlayNow': '进行游戏',
    'gamelistLastMatch': '最近记录',
    'gamelistLeaderboard': '排行榜',
    'gamelistSortbyName': '按名字',
    'gamelistSortbyDeveloper': '按开发者',
    'gamelistSortbypostDate': '按上传日期',
    'gamelistSortbyrating': '按评分',
    'gamelistSearchbyName': ' 搜索游戏 ...',
    'gamelistAllGame': '游戏列表',
    'gamestatLeaderboardTitle': '排行榜',
    'gamestatHIGHESTSCORE': '最高分',
    'gamestatCURRENTMATCHES': '当前游戏',
    'gamestatFINISHEDMATCHES': '结束游戏',
    'gamestatRATE': '评分',
    'gamestatRateyougive': '你的评分',
    'gamestatAverageratingofthegame': '平均得分',
    'gamestatraterate': '打分',
    'hislistTitle': '历史记录',
    'hislistWin': '胜',
    'hislistLose': '负',
    'hislistDraw': '平',
    'hislistAchievement': '成就',
    'hislistToken': '金币',
    'hislistRank': '排名',
    'hislistScore': '积分',
    'hislistLastMatch': '上局游戏',
    'hisDetailTitle': '上局游戏',
    'hisDetailDATE': '日期',
    'hisDetailTOKEN': '金币',
    'hisDetailSCORE': '积分',
    'indexHome': '主页',
    'indexHistory': '历史',
    'indexSetting': '设置',
    BUTTON_TEXT_EN: '英文',
    BUTTON_TEXT_ZH: '中文'
  }); 
  $translateProvider.preferredLanguage('zh');
  $urlRouterProvider.otherwise('/profile/0');
  $stateProvider
  .state('choosegame', {
    title: "Choose Game",
    url: '/profile/:userId?accessSignature',
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