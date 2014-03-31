'use strict';

/* jasmine specs for controllers go here */
describe('Game List controllers', function() {
  beforeEach(module('playerApp'));
  /* GameListCtrl test */
  describe('GameListCtrl', function(){
    var scope, ctrl, $httpBackend;
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/games/games.json').
        respond([{name: 'Chinese Checkers'}]);
      scope = $rootScope.$new();
      ctrl = $controller('GameListCtrl', {$scope: scope});
    }));
    it('should create "games" model with 1 game fetched from games', function() {
      expect(scope.games).toBeUndefined();
      $httpBackend.flush();
      expect(scope.games).toEqual([{name: 'Chinese Checkers'}]);
    });
    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('name');
    });
  });
  describe('GameListCtrl', function(){
    var scope, ctrl, $httpBackend;
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/games/games.json').
        respond([{name: 'Chinese Checkers'}, {name: 'Mahjong'}]);
      scope = $rootScope.$new();
      ctrl = $controller('GameListCtrl', {$scope: scope});
    }));
    it('should create "games" model with 2 games fetched from games', function() {
      expect(scope.games).toBeUndefined();
      $httpBackend.flush();
      expect(scope.games).toEqual([{name: 'Chinese Checkers'}, {name: 'Mahjong'}]);
    });
    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('name');
    });
  });
  describe('GameListCtrl', function(){
    var scope, ctrl, $httpBackend;
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/games/games.json').
        respond([{name: 'Chinese Checkers'}, {name: 'Mahjong'}, {name: 'Shoqi'}]);
      scope = $rootScope.$new();
      ctrl = $controller('GameListCtrl', {$scope: scope});
    }));
    it('should create "games" model with 3 games fetched from games', function() {
      expect(scope.games).toBeUndefined();
      $httpBackend.flush();
      expect(scope.games).toEqual([{name: 'Chinese Checkers'}, {name: 'Mahjong'}, {name: 'Shoqi'}]);
    });
    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('name');
    });
  });
  /* GameDetailCtrl test */
  describe('GameDetailCtrl', function(){
    var scope, $httpBackend, ctrl;
    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/games/mahjong.json').respond({name:'game mahjong'});
      $routeParams.gameId = 'mahjong';
      scope = $rootScope.$new();
      ctrl = $controller('GameDetailCtrl', {$scope: scope});
    }));
    it('should fetch game detail', function() {
      expect(scope.game).toBeUndefined();
      $httpBackend.flush();
      expect(scope.game).toEqual({name:'game mahjong'});
    });
  });  
  describe('GameDetailCtrl', function(){
    var scope, $httpBackend, ctrl;
    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/games/chinese-checkers.json').respond({name:'game chinese checkers'});
      $routeParams.gameId = 'chinese-checkers';
      scope = $rootScope.$new();
      ctrl = $controller('GameDetailCtrl', {$scope: scope});
    }));
    it('should fetch game detail', function() {
      expect(scope.game).toBeUndefined();
      $httpBackend.flush();
      expect(scope.game).toEqual({name:'game chinese checkers'});
    });
  });
  describe('GameDetailCtrl', function(){
    var scope, $httpBackend, ctrl;
    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/games/mahjong.json').respond({id:'123456'});
      $routeParams.gameId = 'mahjong';
      scope = $rootScope.$new();
      ctrl = $controller('GameDetailCtrl', {$scope: scope});
    }));
    it('should fetch game detail', function() {
      expect(scope.game).toBeUndefined();
      $httpBackend.flush();
      expect(scope.game).toEqual({id:'123456'});
    });
  });
});

describe('Player info controllers', function() {
  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });
  beforeEach(module('playerApp'));
  beforeEach(module('profileServices'));
  /* HistoryListCtrl test */
  describe('HistoryListCtrl', function(){
    var scope, ctrl, $httpBackend;
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/historys/historys.json').respond([{gameName: 'Mahjong'}, {gameName: 'Cheat'}]);
      scope = $rootScope.$new();
      ctrl = $controller('HistoryListCtrl', {$scope: scope});
    }));
    it('should create "historys" model with 2 history fetched from xhr', function() {
      expect(scope.historys).toEqualData([]);
      $httpBackend.flush();
      expect(scope.historys).toEqualData([{gameName: 'Mahjong'}, {gameName: 'Cheat'}]);
    });
  });
  describe('HistoryListCtrl', function(){
    var scope, ctrl, $httpBackend;
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/historys/historys.json').respond([{gameId: '123456'}, {gameId: '234567'}]);
      scope = $rootScope.$new();
      ctrl = $controller('HistoryListCtrl', {$scope: scope});
    }));
    it('should create "historys" model with 2 history fetched from historys', function() {
      expect(scope.historys).toEqualData([]);
      $httpBackend.flush();
      expect(scope.historys).toEqualData([{gameId: '123456'}, {gameId: '234567'}]);
    });
  });
  describe('HistoryListCtrl', function(){
    var scope, ctrl, $httpBackend;
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/historys/historys.json').respond([{winCount: '3'}, {loseCount: '2'}, {tieCount: '0'}]);
      scope = $rootScope.$new();
      ctrl = $controller('HistoryListCtrl', {$scope: scope});
    }));
    it('should create "historys" model with 2 history fetched from historys', function() {
      expect(scope.historys).toEqualData([]);
      $httpBackend.flush();
      expect(scope.historys).toEqualData([{winCount: '3'}, {loseCount: '2'}, {tieCount: '0'}]);
    });
  });
  /* HistoryDetailCtrl test */
  describe('HistoryDetailCtrl', function(){
    var scope, $httpBackend, ctrl,
    G123456 = function() {
      return {
        gameId: '123456',
        gameName: 'Mahjong'
      }
    };
    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/historys/123456.json').respond(G123456());
      $routeParams.gameId = '123456';
      scope = $rootScope.$new();
      ctrl = $controller('HistoryDetailCtrl', {$scope: scope});
    }));
    it('should fetch history detail', function() {
      expect(scope.history).toEqualData({});
      $httpBackend.flush();
      expect(scope.history).toEqualData(G123456());
    });
  });

  describe('HistoryDetailCtrl', function(){
    var scope, $httpBackend, ctrl,
    G234567 = function() {
      return {
        gameId: '234567',
        gameName: 'Cheat'
      }
    };
    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/historys/234567.json').respond(G234567());
      $routeParams.gameId = '234567';
      scope = $rootScope.$new();
      ctrl = $controller('HistoryDetailCtrl', {$scope: scope});
    }));
    it('should fetch history detail', function() {
      expect(scope.history).toEqualData({});
      $httpBackend.flush();
      expect(scope.history).toEqualData(G234567());
    });
  });
});