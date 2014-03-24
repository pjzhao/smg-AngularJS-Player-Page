'use strict';

/* Services */

var profileServices = angular.module('profileServices', ['ngResource']);

profileServices.factory('History', ['$resource',
  function($resource){
    return $resource('/historys/:gameId.json', {}, {
      'get': {method:'GET'},
      'query': {method:'GET', params:{gameId:'historys'}, isArray:true}
    });
  }]);
  
profileServices.factory('Profile', ['$resource',
  function($resource){
    //return $resource('profiles/profile.json', {}, {
  	return $resource('/players/:playerId.json', null, {
      'get': {method:'GET', params:{password: '@password'}},
  	  'save': {method:'PUT'},
  	  'delete': {method:'DELETE'}
  	});
  }]);
