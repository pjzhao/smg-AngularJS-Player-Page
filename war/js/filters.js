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

angular.module('imageFilter', []).filter('imageUrl', function(){
	return function(input){
		if(input == null){
			return "../img/images.jpg"
		}
	};
});
