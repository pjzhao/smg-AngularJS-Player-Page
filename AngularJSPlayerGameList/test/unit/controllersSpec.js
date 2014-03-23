'use strict';

/* jasmine specs for controllers go here */
describe('GameList controllers', function() {
	beforeEach(module('playerApp'));
	describe('GameListCtrl', function(){
    var scope, ctrl, $httpBackend;
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('games/games.json').
        respond([{name: 'Chinese Checkers'}, {name: 'Mahjong'}]);
      scope = $rootScope.$new();
      ctrl = $controller('GameListCtrl', {$scope: scope});
    }));
    it('should create "games" model with 2 games fetched from xhr', function() {
      expect(scope.games).toBeUndefined();
      $httpBackend.flush();
      expect(scope.games).toEqual([{name: 'Chinese Checkers'}, {name: 'Mahjong'}]);
    });
    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('developerId');
    });
  });
  describe('GameDetailCtrl', function(){
    var scope, $httpBackend, ctrl;
    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('games/mahjong.json').respond({name:'game mahjong'});
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
      $httpBackend.expectGET('games/chinese-checkers.json').respond({name:'game chinese checkers'});
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
});