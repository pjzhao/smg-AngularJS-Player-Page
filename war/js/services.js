'use strict';

/* Services */

var profileServices = angular.module('profileServices', ['ngResource']);

profileServices.factory('History', ['$resource',
  function($resource){
    return $resource('historys/:gameId.json', {}, {
      query: {method:'GET', params:{gameId:'historys'}, isArray:true}
    });
  }]);
  
profileServices.factory('Profile', ['$resource',
  function($resource){
    return $resource('profiles/profile.json', {}, {});
  }]);
