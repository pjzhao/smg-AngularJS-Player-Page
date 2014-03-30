'use strict';

/* Services */
var server = "http://1.smg-server.appspot.com";
var profileServices = angular.module('profileServices', ['ngResource']);

profileServices.factory('History', ['$resource',
  function($resource){
    return $resource( '/historys/:gameId.json', {}, {
      'get': {method:'GET'},
      'query': {method:'GET', params:{gameId:'historys'}, isArray:true}
    });
  }]);
  
profileServices.factory('Profile', ['$resource',
  function($resource){
  	return $resource(server + '/players/:playerId', null, {
      'create': {method:'POST'},
      'get': {method:'GET', params:{password: '@password'}},
  	  'save': {method:'PUT'},
  	  'delete': {method:'DELETE'}
  	});
  }]);
