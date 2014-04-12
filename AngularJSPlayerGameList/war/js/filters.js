'use strict';

/* Filters */

angular.module('profileFilters', []).filter('matchStatus', function() {
  return function(input) {
	if (input == "0") {
    	return "Tie"
	} else if (input == "1") {
		return "Win"
	} else {
		return "Lose"
	}
  };
});

angular.module('profileFilters', []).filter('gameIcon', function(){
	return function(input){
		if(input == null){
			return "../img/default_game_icon.jpg"
		}
	};
});


