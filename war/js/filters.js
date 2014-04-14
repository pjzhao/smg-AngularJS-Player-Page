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

angular.module('profileFilters').filter('gameIcon', function() {
	return function(input) {
		if (input == null) {
			return "../img/default_game_icon.jpg"
		} else {
			return input
		}
	};
});

angular.module('profileFilters').filter('badgeImages', function() {
	return function(token) {
		var badgeSource = ["../img/badge/badge01.jpg", "../img/badge/badge02.jpg", "../img/badge/badge03.jpg", "../img/badge/badge04.jpg", 
		"../img/badge/badge05.jpg", "../img/badge/badge06.jpg", "../img/badge/badge07.jpg", "../img/badge/badge08.jpg"];
		var badgeImage = [badgeSource[0]];
		if (token >= 200) {
			badgeImage[1] = badgeSource[1]
		};
		if (token >= 300) {
			badgeImage[2] = badgeSource[2]
		};
		if (token >= 400) {
			badgeImage[3] = badgeSource[3]
		};
		if (token >= 500) {
			badgeImage[4] = badgeSource[4]
		};
		if (token >= 600) {
			badgeImage[5] = badgeSource[5]
		};
		if (token >= 700) {
			badgeImage[6] = badgeSource[6]
		};
		if (token >= 800) {
			badgeImage[7] = badgeSource[7]
		};
		return badgeImage
	};
}); 

angular.module('profileFilters').filter('numberColor', function() {
	return function(input) {
		if(input > 0){
			return "green"
		} else if (input < 0) {
			return "red"
		} else {
			return "blue"
		}
	};
});

angular.module('profileFilters').filter('resultColor', function() {
	return function(input) {
		if (input == "WIN") {
			return "green"
		} else if (input == "LOST") {
			return "red"
		} else {
			return "blue"
		}
  	};
}); 

