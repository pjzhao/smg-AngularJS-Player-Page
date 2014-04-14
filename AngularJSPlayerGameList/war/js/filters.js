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
			return "../img/default_game_icon.jpg";
		} else {
			return input;
		}
	};
});

angular.module('rateFilters', []).filter('ratingFilter', function(){
	return function(input){
		if(input <= "1" && input >= "0"){
			return "../img/star/1.jpg";
		} else if(input <= "2" && input > "1"){
			return "../img/star/2.jpg";
		} else if(input <= "3" && input > "2"){
			return "../img/star/3.jpg";
		} else if(input <= "4" && input > "3"){
			return "../img/star/4.jpg";
		} else {
			return "../img/star/5.jpg";
		}
	};
});
/*
angular.module('sliceFilters', []).filter('sliceFilter', function() {
  return function(arr, start, end) {
    return arr.slice(start, end);
  };
});
*/

